import React, { useState, useEffect } from 'react';
import { 
  ZahraUser, 
  LeaderUser,
  Submission, 
  AppNotification, 
  AssignedTask, 
  StageId, 
  DomainId 
} from './types';
import { 
  getInitialZaharatData, 
  getInitialSubmissions, 
  getInitialNotifications, 
  getInitialTasks, 
  saveZaharatData,
  getStoredLeaders,
  saveLeadersData,
  getStoredCurrentLeader,
  saveCurrentLeader
} from './lib/firebase';
import { STAGES, DOMAINS, BADGES_LIST, ACTIVITIES_DATABASE } from './data/curriculumData';

import { Header } from './components/Header';
import { NotificationCenter } from './components/NotificationCenter';
import { LeaderDashboard } from './components/LeaderDashboard';
import { ZahraDashboard } from './components/ZahraDashboard';
import { AuthModal } from './components/AuthModal';
import { SubmissionsReview } from './components/SubmissionsReview';
import { CurriculumCatalog } from './components/CurriculumCatalog';
import { ProgressionMap } from './components/ProgressionMap';
import { ZaharatRoster } from './components/ZaharatRoster';
import { ActivitySubmissionModal } from './components/ActivitySubmissionModal';
import { NewTaskModal } from './components/NewTaskModal';
import { HandbookGuideModal } from './components/HandbookGuideModal';
import { LandingAuthScreen } from './components/LandingAuthScreen';

import { Sparkles, CheckCircle2, AlertCircle, X, Award, Bell } from 'lucide-react';

export default function App() {
  // --- Leader Accounts & Persistent State ---
  const [registeredLeaders, setRegisteredLeaders] = useState<LeaderUser[]>(getStoredLeaders);
  const [currentLeader, setCurrentLeader] = useState<LeaderUser | null>(getStoredCurrentLeader);

  // --- Persistent Scout & Data State ---
  const [zaharat, setZaharat] = useState<ZahraUser[]>(getInitialZaharatData);
  const [submissions, setSubmissions] = useState<Submission[]>(getInitialSubmissions);
  const [notifications, setNotifications] = useState<AppNotification[]>(getInitialNotifications);
  const [tasks, setTasks] = useState<AssignedTask[]>(getInitialTasks);

  // Active User State: null (Logged out / Protected Landing) OR LEADER OR ZAHRA
  const [currentUser, setCurrentUser] = useState<
    null | { type: 'LEADER'; leader?: LeaderUser } | { type: 'ZAHRA'; zahra: ZahraUser }
  >(() => {
    const leader = getStoredCurrentLeader();
    return leader ? { type: 'LEADER', leader } : null;
  });

  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isNotifsOpen, setIsNotifsOpen] = useState<boolean>(false);
  const [isHandbookOpen, setIsHandbookOpen] = useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isAssignTaskModalOpen, setIsAssignTaskModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(() => {
    return getStoredLeaders().length === 0;
  });
  const [inviteCode, setInviteCode] = useState<string | undefined>(undefined);

  // Pre-selected Activity / Badge for submission modal
  const [preSelectedSubmission, setPreSelectedSubmission] = useState<{
    activityId?: string;
    badgeId?: string;
    badgeRequirementIndex?: number;
    stageId?: StageId;
    domainId?: DomainId;
  } | null>(null);

  // Toast Banner State
  const [toastMsg, setToastMsg] = useState<{ type: 'success' | 'info'; text: string } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Sync leaders & current leader to localStorage
  useEffect(() => {
    saveLeadersData(registeredLeaders);
  }, [registeredLeaders]);

  useEffect(() => {
    saveCurrentLeader(currentLeader);
  }, [currentLeader]);

  // Check URL query parameters for invitation code on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const invite = params.get('invite') || params.get('joinCode');
    if (invite) {
      setInviteCode(invite);
      setIsAuthModalOpen(true);
      showToast('مرحباً بكِ! تم فتح رابط دعوة القائدة لتسجيل الزهرة بالباقة 🌸');
    }
  }, []);

  // Sync Zaharat changes to LocalStorage
  useEffect(() => {
    saveZaharatData(zaharat);
  }, [zaharat]);

  // Filter Zaharat by active Leader or current Zahra's leader
  const activeLeaderId = currentUser 
    ? (currentUser.type === 'LEADER' 
        ? (currentUser.leader?.id || currentLeader?.id || registeredLeaders[0]?.id)
        : (currentUser.zahra.leaderId || currentLeader?.id || registeredLeaders[0]?.id))
    : null;

  const filteredZaharat = activeLeaderId 
    ? zaharat.filter(z => z.leaderId === activeLeaderId || (!z.leaderId && registeredLeaders[0]?.id === activeLeaderId))
    : zaharat;

  // Filter submissions by troop
  const filteredSubmissions = activeLeaderId
    ? submissions.filter(s => {
        const z = zaharat.find(item => item.id === s.zahraId);
        return z && (z.leaderId === activeLeaderId || (!z.leaderId && registeredLeaders[0]?.id === activeLeaderId));
      })
    : submissions;

  // Logout Handler
  const handleLogout = () => {
    setCurrentUser(null);
    showToast('تم تسجيل الخروج بنجاح. أنت الآن في صفحة الدخول المحمية 🔒');
  };

  // Handle Switch User (LEADER or Zahra ID within current troop)
  const handleSwitchUser = (userType: 'LEADER' | string) => {
    if (userType === 'LEADER') {
      setCurrentUser({ type: 'LEADER', leader: currentLeader || undefined });
      showToast('تم التبديل إلى حساب قائدة الباقة 👑');
    } else {
      const foundZahra = filteredZaharat.find(z => z.id === userType) || zaharat.find(z => z.id === userType);
      if (foundZahra) {
        setCurrentUser({ type: 'ZAHRA', zahra: foundZahra });
        showToast(`تم التبديل إلى حساب الزهرة: ${foundZahra.name} 🌸`);
      }
    }
  };

  // Auth Handlers
  const handleLeaderRegisterSuccess = (newLeader: LeaderUser) => {
    setRegisteredLeaders(prev => [...prev, newLeader]);
    setCurrentLeader(newLeader);
    setCurrentUser({ type: 'LEADER', leader: newLeader });
    showToast(`مرحباً بكِ القائدة (${newLeader.name})! تم إنشاء حساب فرقة (${newLeader.troopName}) بنجاح 👑`);
  };

  const handleLeaderLoginSuccess = (leader: LeaderUser) => {
    setCurrentLeader(leader);
    setCurrentUser({ type: 'LEADER', leader });
    showToast(`أهلاً بعودتكِ القائدة (${leader.name}) - ${leader.troopName} 👑`);
  };

  const handleZahraRegisterSuccess = (newZahra: ZahraUser) => {
    setZaharat(prev => [newZahra, ...prev]);
    setCurrentUser({ type: 'ZAHRA', zahra: newZahra });
    showToast(`أهلاً وسهلاً بكِ يا زهرة (${newZahra.name})! تم التسجيل المباشر بنجاح 🌺`);
  };

  const handleZahraLoginSuccess = (zahra: ZahraUser) => {
    setCurrentUser({ type: 'ZAHRA', zahra });
    showToast(`مرحباً بعودتكِ يا زهرة: ${zahra.name} 🌸`);
  };

  // --- Actions ---

  // 1. Submit Activity Proof (Zahra Scout or Leader on her behalf)
  const handleCreateSubmission = (subData: {
    activityId?: string;
    badgeId?: string;
    badgeRequirementIndex?: number;
    activityTitle: string;
    stageId: StageId;
    domainId: DomainId;
    description: string;
    proofBase64?: string;
    proofFileName?: string;
  }) => {
    const activeZahra = currentUser.type === 'ZAHRA' ? currentUser.zahra : zaharat[0];

    if (!activeZahra) {
      showToast('يرجى تسجيل زهرة أولاً لإرسال إثبات النشاط', 'info');
      setIsAuthModalOpen(true);
      return;
    }

    const newSub: Submission = {
      id: `sub-${Date.now()}`,
      zahraId: activeZahra.id,
      zahraName: activeZahra.name,
      patrolId: activeZahra.patrolId,
      activityId: subData.activityId,
      badgeId: subData.badgeId,
      badgeRequirementIndex: subData.badgeRequirementIndex,
      activityTitle: subData.activityTitle,
      stageId: subData.stageId,
      domainId: subData.domainId,
      description: subData.description,
      proofBase64: subData.proofBase64,
      proofFileName: subData.proofFileName,
      submittedAt: new Date().toISOString(),
      status: 'PENDING'
    };

    setSubmissions(prev => [newSub, ...prev]);

    // Dispatch Instant Notification to Leader
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      recipientId: 'LEADER',
      title: 'إثبات نشاط جديد بحاجة لتقييمك 🌺',
      message: `قامت الزهرة (${activeZahra.name}) برفع إثبات بالصورة للنشاط: "${subData.activityTitle}"`,
      type: 'SUBMISSION_NEW',
      timestamp: new Date().toISOString(),
      read: false,
      relatedSubmissionId: newSub.id
    };

    setNotifications(prev => [newNotif, ...prev]);
    showToast('تم إرسال إثبات النشاط بنجاح للتقييم، وتم تنبيه القائدة فوراً!');
  };

  // 2. Leader Approves Submission
  const handleApproveSubmission = (
    subId: string,
    points: number,
    badgeId?: string,
    feedback?: string
  ) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === subId) {
        return {
          ...s,
          status: 'APPROVED',
          leaderFeedback: feedback,
          pointsAwarded: points,
          badgeAwarded: badgeId,
          reviewedAt: new Date().toISOString()
        };
      }
      return s;
    }));

    const targetSub = submissions.find(s => s.id === subId);
    if (targetSub) {
      // Find matching activity ID if targetSub.activityId is missing but title matches
      let matchedActivityId = targetSub.activityId;
      if (!matchedActivityId && !targetSub.badgeId) {
        const foundAct = ACTIVITIES_DATABASE.find(
          a => a.title.trim().toLowerCase() === targetSub.activityTitle.trim().toLowerCase()
        );
        if (foundAct) {
          matchedActivityId = foundAct.id;
        } else {
          matchedActivityId = `custom-act-${targetSub.id}`;
        }
      }

      // Check for badge requirement key
      const badgeReqKey = (targetSub.badgeId !== undefined && targetSub.badgeRequirementIndex !== undefined)
        ? `${targetSub.badgeId}_req-${targetSub.badgeRequirementIndex}`
        : null;

      // 1. Award points, completed activity, badge requirements, and badges to the Zahra scout in list
      setZaharat(prev => prev.map(z => {
        if (z.id === targetSub.zahraId) {
          const actIdToAdd = matchedActivityId || targetSub.activityId;
          const updatedCompleted = actIdToAdd && !z.completedActivityIds.includes(actIdToAdd)
            ? [...z.completedActivityIds, actIdToAdd]
            : z.completedActivityIds;

          // Update badge requirements
          const currentReqs = z.completedBadgeRequirements || [];
          const updatedBadgeReqs = (badgeReqKey && !currentReqs.includes(badgeReqKey))
            ? [...currentReqs, badgeReqKey]
            : currentReqs;

          // Auto-award badge if all 4 requirements are fulfilled OR leader explicitly awarded badge
          let updatedBadges = z.badgesEarned;
          if (badgeId && !updatedBadges.includes(badgeId)) {
            updatedBadges = [...updatedBadges, badgeId];
          } else if (targetSub.badgeId && !updatedBadges.includes(targetSub.badgeId)) {
            // Check if all 4 requirements for this badge are completed
            const targetBadgeDef = BADGES_LIST.find(b => b.id === targetSub.badgeId);
            const reqCount = targetBadgeDef?.requirements?.length || 4;
            const completedCount = Array.from({ length: reqCount }).filter((_, idx) =>
              updatedBadgeReqs.includes(`${targetSub.badgeId}_req-${idx}`)
            ).length;
            if (completedCount >= reqCount) {
              updatedBadges = [...updatedBadges, targetSub.badgeId];
            }
          }

          return {
            ...z,
            points: z.points + points,
            completedActivityIds: updatedCompleted,
            completedBadgeRequirements: updatedBadgeReqs,
            badgesEarned: updatedBadges
          };
        }
        return z;
      }));

      // 2. Synchronize currentUser if currently logged in as this Zahra
      setCurrentUser(prevUser => {
        if (prevUser.type === 'ZAHRA' && prevUser.zahra.id === targetSub.zahraId) {
          const actIdToAdd = matchedActivityId || targetSub.activityId;
          const updatedCompleted = actIdToAdd && !prevUser.zahra.completedActivityIds.includes(actIdToAdd)
            ? [...prevUser.zahra.completedActivityIds, actIdToAdd]
            : prevUser.zahra.completedActivityIds;

          const currentReqs = prevUser.zahra.completedBadgeRequirements || [];
          const updatedBadgeReqs = (badgeReqKey && !currentReqs.includes(badgeReqKey))
            ? [...currentReqs, badgeReqKey]
            : currentReqs;

          let updatedBadges = prevUser.zahra.badgesEarned;
          if (badgeId && !updatedBadges.includes(badgeId)) {
            updatedBadges = [...updatedBadges, badgeId];
          } else if (targetSub.badgeId && !updatedBadges.includes(targetSub.badgeId)) {
            const targetBadgeDef = BADGES_LIST.find(b => b.id === targetSub.badgeId);
            const reqCount = targetBadgeDef?.requirements?.length || 4;
            const completedCount = Array.from({ length: reqCount }).filter((_, idx) =>
              updatedBadgeReqs.includes(`${targetSub.badgeId}_req-${idx}`)
            ).length;
            if (completedCount >= reqCount) {
              updatedBadges = [...updatedBadges, targetSub.badgeId];
            }
          }

          return {
            type: 'ZAHRA',
            zahra: {
              ...prevUser.zahra,
              points: prevUser.zahra.points + points,
              completedActivityIds: updatedCompleted,
              completedBadgeRequirements: updatedBadgeReqs,
              badgesEarned: updatedBadges
            }
          };
        }
        return prevUser;
      });

      // Fire Notification to Zahra
      const targetBadge = badgeId ? BADGES_LIST.find(b => b.id === badgeId) : null;
      const notifMsg = `مبروك يا ${targetSub.zahraName}! تم قبول إثبات النشاط: "${targetSub.activityTitle}" وتسجيله كنشاط منجز بنجاح وإسناد +${points} نقطة${
        targetBadge ? ` وشارة [${targetBadge.name}] 🏆` : ''
      }`;

      const notifToZahra: AppNotification = {
        id: `notif-appr-${Date.now()}`,
        recipientId: targetSub.zahraId,
        title: 'تم قبول النشاط وتسجيل إنجازه! ✅',
        message: notifMsg,
        type: 'SUBMISSION_APPROVED',
        timestamp: new Date().toISOString(),
        read: false,
        relatedSubmissionId: targetSub.id
      };

      setNotifications(prev => [notifToZahra, ...prev]);
      showToast(`تم إقرار النشاط وتسجيله كمنجز للزهرة (${targetSub.zahraName}) وإضافة النقاط ✅`);
    }
  };

  // 3. Leader Rejects Submission with feedback
  const handleRejectSubmission = (subId: string, feedback: string) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === subId) {
        return {
          ...s,
          status: 'REJECTED',
          leaderFeedback: feedback,
          reviewedAt: new Date().toISOString()
        };
      }
      return s;
    }));

    const targetSub = submissions.find(s => s.id === subId);
    if (targetSub) {
      const notifToZahra: AppNotification = {
        id: `notif-rej-${Date.now()}`,
        recipientId: targetSub.zahraId,
        title: 'طلب تعديل إثبات النشاط ❌',
        message: `ملاحظة القائدة بشأن "${targetSub.activityTitle}": ${feedback}`,
        type: 'SUBMISSION_REJECTED',
        timestamp: new Date().toISOString(),
        read: false,
        relatedSubmissionId: targetSub.id
      };

      setNotifications(prev => [notifToZahra, ...prev]);
      showToast(`تم حفظ الملاحظات وتنبيه الزهرة (${targetSub.zahraName}) لإعادة التعديل.`);
    }
  };

  // 4. Leader Assigns New Task
  const handleAssignTask = (taskData: {
    title: string;
    description: string;
    assignedToType: 'ALL' | 'PATROL' | 'ZAHRA';
    targetId?: string;
    stageId?: StageId;
    domainId?: DomainId;
    dueDate?: string;
  }) => {
    const newTask: AssignedTask = {
      id: `task-${Date.now()}`,
      title: taskData.title,
      description: taskData.description,
      assignedToType: taskData.assignedToType,
      targetId: taskData.targetId,
      stageId: taskData.stageId,
      domainId: taskData.domainId,
      dueDate: taskData.dueDate,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [newTask, ...prev]);

    // Send notifications to target recipients
    const notifs: AppNotification[] = [];
    if (taskData.assignedToType === 'ALL') {
      zaharat.forEach(z => {
        notifs.push({
          id: `notif-task-${z.id}-${Date.now()}`,
          recipientId: z.id,
          title: 'تكليف جديد للباقة من القائدة 👑',
          message: `المهمة المطلوب إنجازها: "${taskData.title}"`,
          type: 'TASK_ASSIGNED',
          timestamp: new Date().toISOString(),
          read: false
        });
      });
    } else if (taskData.assignedToType === 'ZAHRA' && taskData.targetId) {
      notifs.push({
        id: `notif-task-${taskData.targetId}-${Date.now()}`,
        recipientId: taskData.targetId,
        title: 'تكليف خاص بك من القائدة 👑',
        message: `المهمة المطلوبة: "${taskData.title}"`,
        type: 'TASK_ASSIGNED',
        timestamp: new Date().toISOString(),
        read: false
      });
    }

    setNotifications(prev => [...notifs, ...prev]);
    showToast('تم إرسال المهمة وتنبيه الزهرات فوراً!');
  };

  // Unread Notifications for active user context
  const activeUserId = currentUser ? (currentUser.type === 'LEADER' ? 'LEADER' : currentUser.zahra.id) : '';
  const userNotifications = notifications.filter(n => n.recipientId === activeUserId || n.recipientId === 'ALL');
  const unreadNotifsCount = userNotifications.filter(n => !n.read).length;

  const handleMarkAllNotifsRead = () => {
    setNotifications(prev => prev.map(n => {
      if (n.recipientId === activeUserId || n.recipientId === 'ALL') {
        return { ...n, read: true };
      }
      return n;
    }));
  };

  // If no user is logged in, show protected landing / auth portal
  if (!currentUser) {
    return (
      <>
        {toastMsg && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-blue-950 text-amber-300 font-bold px-5 py-3 rounded-2xl shadow-2xl border-2 border-amber-400 flex items-center space-x-2 space-x-reverse text-xs animate-in slide-in-from-top-4 duration-300">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMsg.text}</span>
          </div>
        )}
        <LandingAuthScreen
          registeredLeaders={registeredLeaders}
          onLeaderLoginSuccess={handleLeaderLoginSuccess}
          onLeaderRegisterSuccess={handleLeaderRegisterSuccess}
          onZahraRegisterSuccess={handleZahraRegisterSuccess}
          onZahraLoginSuccess={handleZahraLoginSuccess}
          allZaharat={zaharat}
          initialInviteCode={inviteCode}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/80 text-gray-900 font-sans antialiased dir-rtl text-right flex flex-col">
      
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-blue-950 text-amber-300 font-bold px-5 py-3 rounded-2xl shadow-2xl border-2 border-amber-400 flex items-center space-x-2 space-x-reverse text-xs animate-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* Main App Header */}
      <Header
        currentUser={currentUser}
        allZaharat={filteredZaharat}
        onSwitchUser={handleSwitchUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        unreadNotifsCount={unreadNotifsCount}
        onOpenNotifs={() => setIsNotifsOpen(true)}
        onOpenHandbook={() => setIsHandbookOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {activeTab === 'dashboard' && (
          currentUser.type === 'LEADER' ? (
            <LeaderDashboard
              currentLeader={currentLeader}
              zaharat={filteredZaharat}
              submissions={filteredSubmissions}
              onOpenAssignTask={() => setIsAssignTaskModalOpen(true)}
              onSelectSubmission={(subId) => {
                setActiveTab('submissions');
              }}
              onNavigateTab={setActiveTab}
              onQuickApprove={(subId) => handleApproveSubmission(subId, 50, undefined, 'عمل رائع وتألق كشفي مبارك!')}
              onQuickReject={(subId) => handleRejectSubmission(subId, 'يرجى وضوح الصورة وتدوين الآية كاملة.')}
            />
          ) : (
            <ZahraDashboard
              zahra={currentUser.zahra}
              submissions={submissions}
              tasks={tasks}
              onOpenSubmitProof={(pre) => {
                if (pre) setPreSelectedSubmission(pre);
                setIsSubmitModalOpen(true);
              }}
              onNavigateTab={setActiveTab}
              onLogout={() => setCurrentUser({ type: 'LEADER', leader: currentLeader || undefined })}
            />
          )
        )}

        {activeTab === 'catalog' && (
          <CurriculumCatalog
            currentUser={currentUser}
            submissions={submissions}
            onOpenSubmitProofWithActivity={(actId, stageId, domId) => {
              setPreSelectedSubmission({ activityId: actId, stageId, domainId: domId });
              setIsSubmitModalOpen(true);
            }}
          />
        )}

        {activeTab === 'submissions' && (
          currentUser.type === 'LEADER' ? (
            <SubmissionsReview
              submissions={filteredSubmissions}
              zaharat={filteredZaharat}
              onApproveSubmission={handleApproveSubmission}
              onRejectSubmission={handleRejectSubmission}
            />
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm text-center space-y-4 max-w-lg mx-auto my-12">
              <div className="w-14 h-14 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center text-2xl mx-auto font-bold">
                🔒
              </div>
              <h3 className="font-bold text-gray-900 text-base">خاص بقائدة الفرقة</h3>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                قسم مراجعة وتقييم إثباتات جميع الزهرات مخصص فقط لقائدة الفرقة. يمكنكِ متابعة إثباتاتكِ وإنجازاتكِ الشخصية من داشبورد الزهرة الخاص بكِ.
              </p>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-6 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                العودة إلى داشبورد الزهرة 🌸
              </button>
            </div>
          )
        )}

        {activeTab === 'map' && (
          <ProgressionMap
            currentUser={currentUser}
            zaharat={filteredZaharat}
            currentZahraId={currentUser.type === 'ZAHRA' ? currentUser.zahra.id : undefined}
            onOpenSubmitBadgeReq={(badgeId, reqIdx) => {
              setPreSelectedSubmission({ badgeId, badgeRequirementIndex: reqIdx });
              setIsSubmitModalOpen(true);
            }}
          />
        )}

        {activeTab === 'roster' && (
          currentUser.type === 'LEADER' ? (
            <ZaharatRoster
              zaharat={filteredZaharat}
              onAddZahra={(newZ) => {
                const activeLead = currentUser.leader || currentLeader || registeredLeaders[0];
                const zahraWithLeader = {
                  ...newZ,
                  leaderId: activeLead?.id,
                  troopName: activeLead?.troopName
                };
                setZaharat(prev => [...prev, zahraWithLeader]);
                showToast(`تم تسجيل الزهرة (${newZ.name}) بالفرقة بنجاح!`);
              }}
              onUpdateZahra={(upd) => {
                setZaharat(prev => prev.map(z => z.id === upd.id ? upd : z));
              }}
            />
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm text-center space-y-4 max-w-lg mx-auto my-12">
              <div className="w-14 h-14 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center text-2xl mx-auto font-bold">
                🔒
              </div>
              <h3 className="font-bold text-gray-900 text-base">خاص بإدارة السداسيات</h3>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                سجل الزهرات وتوزيع السداسيات متاح فقط لقائدة الفرقة. يمكنكِ استعراض سداسيتكِ ودرجتكِ الكشفية من داشبورد الزهرة.
              </p>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-6 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                العودة إلى داشبورد الزهرة 🌸
              </button>
            </div>
          )
        )}

      </main>

      {/* Floating Submit Proof Button for Zahra Scout */}
      {currentUser.type === 'ZAHRA' && (
        <button
          onClick={() => {
            setPreSelectedSubmission(null);
            setIsSubmitModalOpen(true);
          }}
          className="fixed bottom-6 left-6 z-40 bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-5 py-3.5 rounded-full shadow-2xl border-2 border-white flex items-center space-x-2 space-x-reverse text-xs transition-all active:scale-95 animate-bounce cursor-pointer"
        >
          <span className="text-base">📸</span>
          <span>إرسال إثبات نشاط مصور</span>
        </button>
      )}

      {/* Footer */}
      <footer className="bg-blue-950 text-blue-300 py-6 border-t border-blue-900 text-xs">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-1">
          <div className="font-bold text-amber-300">
            تطبيق زهرات الكشافة التونسية • منظومة التدرج الشخصي وإدارة الباقة
          </div>
          <p className="text-[11px] text-blue-400 font-sans">
            قسم الزهرات • الكشافة التونسية.
          </p>
        </div>
      </footer>

      {/* Authentication & Invite Link Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        registeredLeaders={registeredLeaders}
        onLeaderLoginSuccess={handleLeaderLoginSuccess}
        onLeaderRegisterSuccess={handleLeaderRegisterSuccess}
        onZahraRegisterSuccess={handleZahraRegisterSuccess}
        onZahraLoginSuccess={handleZahraLoginSuccess}
        allZaharat={zaharat}
        initialInviteCode={inviteCode}
      />

      {/* Notifications Drawer */}
      <NotificationCenter
        notifications={userNotifications}
        isOpen={isNotifsOpen}
        onClose={() => setIsNotifsOpen(false)}
        onMarkAllAsRead={handleMarkAllNotifsRead}
        onSelectSubmission={(subId) => {
          setActiveTab('submissions');
        }}
      />

      {/* Digital Handbook Guide Modal */}
      <HandbookGuideModal
        isOpen={isHandbookOpen}
        onClose={() => setIsHandbookOpen(false)}
      />

      {/* Submit Activity / Badge Proof Modal */}
      <ActivitySubmissionModal
        isOpen={isSubmitModalOpen}
        onClose={() => {
          setIsSubmitModalOpen(false);
          setPreSelectedSubmission(null);
        }}
        currentUser={currentUser.type === 'ZAHRA' ? currentUser.zahra : (filteredZaharat[0] || zaharat[0])}
        initialBadgeId={preSelectedSubmission?.badgeId}
        initialBadgeReqIndex={preSelectedSubmission?.badgeRequirementIndex}
        initialActivityId={preSelectedSubmission?.activityId}
        onSubmit={handleCreateSubmission}
      />

      {/* Assign Task Modal */}
      <NewTaskModal
        isOpen={isAssignTaskModalOpen}
        onClose={() => setIsAssignTaskModalOpen(false)}
        zaharat={filteredZaharat}
        onAssignTask={handleAssignTask}
      />

    </div>
  );
}

