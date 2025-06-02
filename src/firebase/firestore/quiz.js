import { app } from "../config";
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
  updateDoc,
  getDoc,
  getDocs,
  where,
  query,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(app);
