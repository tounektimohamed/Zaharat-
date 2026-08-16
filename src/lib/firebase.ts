import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  Timestamp 
} from "firebase/firestore";
import { Submission, AppNotification, ZahraUser, AssignedTask, LeaderNote, LeaderUser } from "../types";
import { INITIAL_ZAHARAT } from "../data/curriculumData";

// User provided Firebase configuration from prompt
export const firebaseConfig = {
  apiKey: "AIzaSyDoCvuOnQr2CRf-nn3HPPJnzT_ss81oe6I",
  authDomain: "zaharat-c3578.firebaseapp.com",
  projectId: "zaharat-c3578",
  storageBucket: "zaharat-c3578.firebasestorage.app",
  messagingSenderId: "404994404809",
  appId: "1:404994404809:web:fc75f16141fe48fba2b818",
  measurementId: "G-GJ8ZHJX71F"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Helper: Convert File to Base64 String
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Seed LocalStorage cache if empty
const LOCAL_STORAGE_SUBMISSIONS_KEY = 'zaharat_app_submissions';
const LOCAL_STORAGE_NOTIFS_KEY = 'zaharat_app_notifications';
const LOCAL_STORAGE_ZAHARAT_KEY = 'zaharat_app_users';
const LOCAL_STORAGE_TASKS_KEY = 'zaharat_app_tasks';
const LOCAL_STORAGE_LEADERS_KEY = 'zaharat_app_leaders';
const LOCAL_STORAGE_CURRENT_LEADER_KEY = 'zaharat_app_current_leader';

export const getStoredLeaders = (): LeaderUser[] => {
  const cached = localStorage.getItem(LOCAL_STORAGE_LEADERS_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error("Error parsing leaders", e);
    }
  }
  return [];
};

export const saveLeadersData = (leaders: LeaderUser[]) => {
  localStorage.setItem(LOCAL_STORAGE_LEADERS_KEY, JSON.stringify(leaders));
};

export const getStoredCurrentLeader = (): LeaderUser | null => {
  const cached = localStorage.getItem(LOCAL_STORAGE_CURRENT_LEADER_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error("Error parsing current leader", e);
    }
  }
  return null;
};

export const saveCurrentLeader = (leader: LeaderUser | null) => {
  if (leader) {
    localStorage.setItem(LOCAL_STORAGE_CURRENT_LEADER_KEY, JSON.stringify(leader));
  } else {
    localStorage.removeItem(LOCAL_STORAGE_CURRENT_LEADER_KEY);
  }
};

export const getInitialZaharatData = (): ZahraUser[] => {
  const cached = localStorage.getItem(LOCAL_STORAGE_ZAHARAT_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error("Error parsing cached Zaharat users", e);
    }
  }
  localStorage.setItem(LOCAL_STORAGE_ZAHARAT_KEY, JSON.stringify(INITIAL_ZAHARAT));
  return INITIAL_ZAHARAT;
};

export const saveZaharatData = (users: ZahraUser[]) => {
  localStorage.setItem(LOCAL_STORAGE_ZAHARAT_KEY, JSON.stringify(users));
};

export const getInitialSubmissions = (): Submission[] => {
  const cached = localStorage.getItem(LOCAL_STORAGE_SUBMISSIONS_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error("Error parsing cached submissions", e);
    }
  }
  const sample: Submission[] = [];
  localStorage.setItem(LOCAL_STORAGE_SUBMISSIONS_KEY, JSON.stringify(sample));
  return sample;
};

export const getInitialNotifications = (): AppNotification[] => {
  const cached = localStorage.getItem(LOCAL_STORAGE_NOTIFS_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error("Error parsing cached notifications", e);
    }
  }
  const sample: AppNotification[] = [];
  localStorage.setItem(LOCAL_STORAGE_NOTIFS_KEY, JSON.stringify(sample));
  return sample;
};

export const getInitialTasks = (): AssignedTask[] => {
  const cached = localStorage.getItem(LOCAL_STORAGE_TASKS_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error("Error parsing tasks", e);
    }
  }
  const sample: AssignedTask[] = [];
  localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(sample));
  return sample;
};
