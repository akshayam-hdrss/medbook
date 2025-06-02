import {
  collection,
  doc,
  onSnapshot,
  getFirestore,
  getDocs,
  getDoc,
  updateDoc,
  addDoc,
  query,
  setDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { app } from "../config";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";

const db = getFirestore(app);
const storage = getStorage(app);
async function uploadFilesAndSaveURLs(files) {
  const uploadPromises = files.map((file) => {
    const storageRef = ref(storage, `events/gallery/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  });
  const downloadURLs = await Promise.all(uploadPromises);
  return downloadURLs;
}

//Function to upload level 1 icons
async function uploadIcons(file, id) {
  try {
    const storageRef = ref(storage, `events/${id}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (e) {
    console.log(e);
  }
}
export const getEvents = async () => {
  try {
    let data = [];
    const snap = await getDocs(collection(db, "events"));
    snap.forEach((doc) => data.push({ id: doc.id, data: doc.data() }));
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const addEvent = async (data, pfp, images) => {
  try {
    const id = uuidv4();
    const pfpurl = await uploadIcons(pfp, id);
    data.pfp = pfpurl;
    const imagesurl = await uploadFilesAndSaveURLs(images);
    data.images = imagesurl;
    await setDoc(doc(db, "events", id), data);
    console.log("event added");
  } catch (e) {
    console.log(e);
  }
};

export const editEvent = async (id, data, pfp = null, images = null) => {
  try {
    if (pfp) {
      const pfpurl = await uploadIcons(pfp, id);
      data.pfp = pfpurl;
    }
    if (images) {
      const imagesurl = await uploadFilesAndSaveURLs(images);
      data.images = imagesurl;
    }

    await updateDoc(doc(db, "events", id), data);
    console.log("event updated");
  } catch (e) {
    console.log(e);
  }
};

export const deleteEvent = async (id, pfp, images) => {
  try {
    await deleteDoc(doc(db, "events", id));
    console.log("event deleted");
  } catch (e) {
    console.log(e);
  }
};

export const getEventData = async (id) => {
  try {
    const snap = await getDoc(doc(db, `events/${id}`));
    return snap.data();
  } catch (e) {
    console.log(e);
  }
};
