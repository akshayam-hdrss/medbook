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
  arrayRemove,
} from "firebase/firestore";
import {
  ref,
  deleteObject,
  getStorage,
  getMetadata,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const db = getFirestore(app);
const storage = getStorage(app);

export const addProductProfile = async (photo) => {
  try {
    const photoRef = ref(storage, `productProfiles/${photo.name}`);
    await uploadBytes(photoRef, photo);
    const photoUrl = await getDownloadURL(photoRef);
    console.log("product profile pic uploaded");
    return photoUrl;
  } catch (e) {
    console.log(e);
  }
};

// export const addProductBackground = async (previous, photo) => {
//   try {
//     const photoRef = ref(
//       storage,
//       `products/background/${previous}/${photo.name}`
//     );
//     await uploadBytes(photoRef, photo);
//     const photoUrl = await getDownloadURL(photoRef);
//     console.log("product profile pic uploaded");
//     return photoUrl;
//   } catch (e) {
//     console.log(e);
//   }
// };

export async function uploadProductPhotosAndSaveURLs(previous, files) {
  const uploadPromises = files.map((file) => {
    const storageRef = ref(storage, `productPhotos/${previous}/${file.name}`);
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

export const addProduct = async (
  previous,
  beforeprevious,
  rootprevious,
  data,
  profilepic,
  youtubeLinks,
  photos = null
) => {
  try {
    let productData = data;
    productData.links = youtubeLinks;

    if (profilepic != null) {
      const profileUrl = await addProductProfile(profilepic);
      data.profile = profileUrl;
    } else {
      data.profile = "";
    }

    if (photos != null) {
      const productPhotos = await uploadProductPhotosAndSaveURLs(
        previous,
        photos
      );
      data.photos = productPhotos;
    } else {
      data.photos = "";
    }

    // if (background != null) {
    //   const backgroundurl = await addProductBackground(previous, background);
    //   data.background = backgroundurl;
    // } else {
    //   data.background = null;
    // }
    const sno = Math.floor(Math.random() * 100);
    data.sno = sno;
    await addDoc(
      collection(
        db,
        `products/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`
      ),
      data
    );
  } catch (e) {
    console.log(e);
  }
};

export const editProducts = async (
  previous,
  beforeprevious,
  rootprevious,
  id,
  updatedData,
  profile = null,
  oldProfile,
  photos = null,
  oldPhotos
) => {
  try {
    const docRef = doc(
      db,
      `products/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col/${id}`
    );
    if (profile != null) {
      if (oldProfile !== "") {
        const profileRef = ref(storage, oldProfile);
        await deleteObject(profileRef)
          .then(() => console.log("deleted profile"))
          .catch((e) => console.log(e));
      }

      const profileUrl = await addProductProfile(profile);
      updatedData.profile = profileUrl;
    }
    // if (background != null) {
    //   if (oldBackground != null) {
    //     const backgroundRef = ref(storage, oldBackground);
    //     await deleteObject(backgroundRef)
    //       .then(() => console.log("deleted background"))
    //       .catch((e) => console.log(e));
    //   }

    //   const backgroundUrl = await addProductBackground(previous, background);
    //   updatedData.background = backgroundUrl;
    // }
    if (photos != null) {
      if (oldPhotos !== "") {
        oldPhotos.map(async (oldPhoto) => {
          const photoRef = ref(storage, oldPhoto);
          await deleteObject(photoRef)
            .then(() => console.log("deleted profile"))
            .catch((e) => console.log(e));
        });
      }
      const photosUrl = await uploadProductPhotosAndSaveURLs(previous, photos);
      updatedData.photos = photosUrl;
    }
    await updateDoc(docRef, updatedData);
  } catch (e) {
    console.log(e);
  }
};

export const deleteYtLink = async (
  link,
  rootprevious,
  beforeprevious,
  previous,
  id
) => {
  try {
    const docRef = doc(
      db,
      `products/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col/${id}`
    );
    await updateDoc(docRef, { links: arrayRemove(link) });
    console.log("removed the youtube link");
  } catch (e) {
    console.log(e);
  }
};

// export const applyProductFilters = async (
//   id,
//   minPrice,
//   maxPrice,
//   gender,
//   size
// ) => {
//   try {
//     let q;
//     console.log(size);
//     if (gender.length != 0 && size.length != 0) {
//       q = query(
//         collection(db, `products/${id}/${id}col`),
//         where("price", ">=", minPrice),
//         where("price", "<=", maxPrice),
//         where("gender", "in", gender),
//         where("size", "in", size)
//       );
//     } else if (gender.length != 0) {
//       q = query(
//         collection(db, `products/${id}/${id}col`),
//         where("price", ">=", minPrice),
//         where("price", "<=", maxPrice),
//         where("gender", "in", gender)
//       );
//     } else if (size.length != 0) {
//       q = query(
//         collection(db, `products/${id}/${id}col`),
//         where("price", ">=", minPrice),
//         where("price", "<=", maxPrice),
//         where("size", "in", size)
//       );
//     } else {
//       q = query(
//         collection(db, `products/${id}/${id}col`),
//         where("price", ">=", minPrice),
//         where("price", "<=", maxPrice)
//       );
//     }
//     const querySnapshot = await getDocs(q);
//     const filteredData = [];
//     querySnapshot.forEach((doc) => {
//       filteredData.push({ id: doc.id, ...doc.data() });
//     });

//     console.log("Filtered Data:", filteredData);
//     return filteredData;
//   } catch (e) {
//     console.log(e);
//   }
// };
