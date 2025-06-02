import { app } from "../config";
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  collection,
  onSnapshot,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  deleteObject,
  getStorage,
  getMetadata,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getServiceAndProductDocs } from "./servicesProducts";

const db = getFirestore(app);
const storage = getStorage(app);

export const addCharity = async (
  name,
  upiId,
  upiName,
  description,
  video,
  profile,
  backgroundPhoto
) => {
  try {
    const profileUrl = await addCharityPhoto(profile, name);
    const backgroundUrl = await addCharityBackground(backgroundPhoto, name);
    const charityRef = collection(db, "charities");
    await addDoc(charityRef, {
      name: name,
      upiId: upiId,
      upiName: upiName,
      description: description,
      video: video,
      profile: profileUrl,
      background: backgroundUrl,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addCharityPhoto = async (profile, name) => {
  try {
    const profileRef = ref(storage, `charities/${name}`);
    await uploadBytes(profileRef, profile);
    const downloadURL = await getDownloadURL(profileRef);
    return downloadURL;
  } catch (e) {
    console.log(e);
  }
};

export const addCharityBackground = async (backgroundPhoto, name) => {
  try {
    const backgroundRef = ref(storage, `charities/backgrounds/${name}`);
    await uploadBytes(backgroundRef, backgroundPhoto);
    const downloadURL = await getDownloadURL(backgroundRef);
    return downloadURL;
  } catch (e) {
    console.log(e);
  }
};

export const getCharities = async () => {
  try {
    let charities = [];
    const snapshot = await getDocs(collection(db, "charities"));
    snapshot.docs.map((doc) => {
      charities.push({ id: doc.id, data: doc.data() });
    });
    return charities;
  } catch (e) {
    console.log(e);
  }
};

export const getCharity = async (id) => {
  try {
    const snapshot = await getDoc(doc(db, `charities/${id}`));

    return snapshot.data();
  } catch (e) {
    console.log(e);
  }
};

export const editCharity = async (
  name,
  upiId,
  upiName,
  description,
  video,
  profile = null,
  backgroundPhoto = null,
  id
) => {
  try {
    const charityRef = doc(db, `charities/${id}`);
    let data = {
      name: name,
      description: description,
      video: video,
      upiId: upiId,
      upiName: upiName,
    };
    if (profile) {
      const profileUrl = await addCharityPhoto(profile, name);
      data.profile = profileUrl;
    }
    if (backgroundPhoto) {
      const backgroundUrl = await addCharityBackground(backgroundPhoto, name);
      data.background = backgroundUrl;
    }
    await updateDoc(charityRef, data);
    console.log("edited charity");
  } catch (e) {
    console.log(e);
  }
};

export const deleteCharity = async (id, name) => {
  try {
    const charityRef = doc(db, `charities/${id}`);
    await deleteDoc(charityRef);
    const profileRef = ref(storage, `charities/${name}`);
    const bgRef = ref(storage, `charities/backgrounds/${name}`);
    await deleteObject(profileRef).then(() => console.log("deleted profile"));
    await deleteObject(bgRef).then(() => console.log("deleted background"));
  } catch (e) {
    console.log(e);
  }
};
