import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../config";
import { uploadFilesAndSaveURLs } from "./common";
const db = getFirestore(app);
const storage = getStorage(app);

const uploadOfferPhoto = async (photo) => {
  try {
    const photoRef = ref(storage, `offers/${photo.name}`);
    await uploadBytes(photoRef, photo);
    const photoUrl = await getDownloadURL(photoRef);
    console.log("offer pic uploaded");
    return photoUrl;
  } catch (e) {
    console.log(e);
  }
};

export const addOffer = async (offerPhoto) => {
  try {
    const photoUrl = await uploadOfferPhoto(offerPhoto);
    await addDoc(collection(db, "offers"), {
      photo:photoUrl
    });
    console.log("added offer");
  } catch (e) {
    console.log(e);
  }
};

export const editOffer = async (id, newData, photo = null) => {
  try {
    if (photo != null) {
      const oldData = await getOneOffer(id);
      const oldPhotoRef = ref(storage, oldData.photo);
      await deleteObject(oldPhotoRef)
        .then(() => console.log("deleted old offer photo"))
        .catch((e) => console.log(e));
      const photoUrl = await uploadOfferPhoto(photo);
      newData.photo = photoUrl;
    }
    await updateDoc(doc(db, `offers/${id}`), newData);
    console.log("edited offer");
  } catch (e) {
    console.log(e);
  }
};

export const deleteOffer = async (id) => {
  try {
    const docRef = doc(db, "offers", id);
    await deleteDoc(docRef);
    console.log("offer deleted");
  } catch (e) {
    console.log(e);
  }
};

export const getOneOffer = async (id) => {
  try {
    const docRef = doc(db, `offers/${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (e) {
    console.log(e);
  }
};

export const getOffers = async () => {
  try {
    const offers = [];
    const result = await getDocs(collection(db, "offers"));
    result.forEach((doc) => {
      offers.push({ id: doc.id, ...doc.data() });
    });
    return offers;
  } catch (e) {
    console.log(e);
  }
};
