import { app } from "./firebase.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

export const db = getFirestore(app);

const COLLECTION = "transactions";

export const createTransaction = async (uid, payload) => {
  if (!uid) throw new Error("Missing user id");
  const doc = {
    ...payload,
    uid,
    createdAt: serverTimestamp(),
  };
  await addDoc(collection(db, COLLECTION), doc);
};

export const fetchTransactions = async (uid, limit = 20) => {
  if (!uid) return [];
  const q = query(
    collection(db, COLLECTION),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  const items = [];
  snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
  return items.slice(0, limit);
};


