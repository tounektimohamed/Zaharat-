export type Role = 'LEADER' | 'ZAHRA';

export type StageId = 'yafe' | 'nadhar' | 'atar' | 'muthmir';

export interface StageInfo {
  id: StageId;
  name: string;
  minAge: number;
  maxAge: number;
  color: string;
  badgeBg: string;
  duration: string;
  requirementsCount: number;
  badgesRequired: number;
  description: string;
}

export type DomainId = 'spiritual' | 'mental' | 'social' | 'emotional' | 'physical' | 'scout';

export interface DomainInfo {
  id: DomainId;
  name: string;
  symbolicPlace: string;
  animalCompanion: string;
  animalNameArabic: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconName: string;
  description: string;
}

export interface ActivityItem {
  id: string;
  stageId: StageId;
  domainId: DomainId;
  number: number;
  title: string;
  description?: string;
  companion: string;
}

export interface BadgeItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  requirements: string[];
}

export type PatrolColor = 
  | 'red' 
  | 'yellow' 
  | 'blue' 
  | 'white' 
  | 'pink' 
  | 'brown' 
  | 'orange' 
  | 'green' 
  | 'purple';

export interface Patrol {
  id: string;
  name: string;
  colorHex: string;
  bgHex: string;
  flagBorderColor: string;
  flagLandColor: string;
  leaderZahraId?: string;
  assistantZahraId?: string;
  membersCount: number;
  motto?: string;
}

export interface LeaderUser {
  id: string;
  name: string;
  troopName: string;
  email: string;
  password?: string;
  inviteCode: string;
  createdAt: string;
}

export interface ZahraUser {
  id: string;
  leaderId?: string;
  troopName?: string;
  name: string;
  role: Role;
  patrolId: string; // e.g. "red-patrol"
  patrolRole?: 'عريفة' | 'مساعدة عريفة' | 'منشطة' | 'إعلامية' | 'ماهرة' | 'متصرفة' | 'زهرة';
  stageId: StageId;
  joinedDate: string;
  avatarUrl?: string;
  points: number;
  badgesEarned: string[]; // Badge IDs
  completedActivityIds: string[]; // Activity IDs
  completedBadgeRequirements?: string[]; // e.g. "badge-1_req-0", "badge-1_req-1"
  birthDate?: string;
  parentPhone?: string;
  pin?: string; // Secret login PIN
}

export type SubmissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Submission {
  id: string;
  zahraId: string;
  zahraName: string;
  patrolId: string;
  activityId?: string;
  badgeId?: string;
  badgeRequirementIndex?: number;
  activityTitle: string;
  stageId: StageId;
  domainId: DomainId;
  description: string;
  proofBase64?: string; // Image or document proof in Base64
  proofFileName?: string;
  proofFileType?: string;
  submittedAt: string;
  status: SubmissionStatus;
  leaderFeedback?: string;
  reviewedAt?: string;
  badgeAwarded?: string;
  pointsAwarded?: number;
}

export interface AppNotification {
  id: string;
  recipientId: string; // 'LEADER' or specific Zahra ID
  title: string;
  message: string;
  type: 'SUBMISSION_NEW' | 'SUBMISSION_APPROVED' | 'SUBMISSION_REJECTED' | 'TASK_ASSIGNED' | 'SYSTEM';
  timestamp: string;
  read: boolean;
  relatedSubmissionId?: string;
}

export interface AssignedTask {
  id: string;
  title: string;
  description: string;
  assignedToType: 'ALL' | 'PATROL' | 'ZAHRA';
  targetId?: string; // Patrol ID or Zahra ID
  stageId?: StageId;
  domainId?: DomainId;
  dueDate?: string;
  createdAt: string;
}

export interface LeaderNote {
  id: string;
  zahraId: string;
  date: string;
  note: string;
  type: 'praise' | 'improvement' | 'general';
}
