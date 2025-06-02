import { app } from "../config";
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  getDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  deleteObject,
} from "firebase/storage";

const db = getFirestore(app);
const storage = getStorage(app);

async function uploadProfile(file, id) {
  try {
    const storageRef = ref(storage, `members/${id}`);
    const meta = {
      contentType: "image/jpeg",
    };
    await uploadBytes(storageRef, file, meta);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (e) {
    console.log(e);
  }
}

export async function addStateLeader(id, data, file) {
  try {
    let docData;
    let result;
    console.log("before");
    const membersRef = collection(db, "members/state/statecol");
    if (file != null) {
      const picUrl = await uploadProfile(file, id);
      docData = { ...data, profile: picUrl };
    } else {
      docData = { ...data };
    }
    const docRef = doc(membersRef, id);
    result = await setDoc(docRef, docData);
    console.log("state member added");
  } catch (e) {
    console.log(e);
  }
}

export async function addDistrictLeader(id, districtid, district, data, file) {
  try {
    let docData;
    let result;
    const districtUrl = `members/district/districtcol`;
    await setDoc(doc(db, districtUrl, districtid), {
      name: district,
    });
    const docUrl = `members/district/districtcol/${districtid}/${districtid}col`;

    if (file != null) {
      const picUrl = await uploadProfile(file, id);
      docData = { ...data, profile: picUrl };
    } else {
      docData = { ...data };
    }
    result = await setDoc(doc(db, docUrl, id), docData);
    console.log("district member added");
  } catch (e) {
    console.log(e);
  }
}

export async function getStateLeaders() {
  try {
    let members = [];
    const ref = collection(db, "members/state/statecol");
    const orderedQuery = query(ref, orderBy("sno"));
    const result = await getDocs(orderedQuery);
    result.forEach((doc) => {
      members.push({ id: doc.id, data: doc.data() });
    });
    return members;
  } catch (e) {
    console.log(e);
  }
}

export async function getDistrictLeaders(district) {
  try {
    let members = [];
    const ref = collection(
      db,
      `members/district/districtcol/${district}/${district}col`
    );
    const orderedQuery = query(ref, orderBy("sno"));
    const result = await getDocs(orderedQuery);
    result.forEach((doc) => {
      members.push({ id: doc.id, data: doc.data() });
    });
    return members;
  } catch (e) {
    console.log(e);
  }
}

export async function getLeadersDistrict() {
  try {
    const districtRef = collection(db, "members/district/districtcol");
    const districtResult = await getDocs(districtRef);
    let districts = [];
    districtResult.forEach((doc) => {
      districts.push({ id: doc.id, data: doc.data() });
    });
    return districts;
  } catch (e) {
    console.log(e);
  }
}

export async function editDistrictLeaders(district, id, data, file = null) {
  try {
    console.log(file);
    const docUrl = `members/district/districtcol/${district}/${district}col`;
    let updateData;
    const existingdata = await (
      await getDistrictLeaders(district)
    ).find((doc) => doc.id === id);
    const existingprofile = existingdata.data.profile;
    if (file) {
      if (existingprofile) {
        const profileRef = ref(storage, existingprofile);
        deleteObject(profileRef)
          .then(() => console.log("exisiting profile pic deleted"))
          .catch((e) => console.log(e));
      }

      const profileurl = await uploadProfile(file, id);
      updateData = { ...data, profile: profileurl };
    } else {
      updateData = { ...data };
    }
    await updateDoc(doc(db, docUrl, id), updateData);
    console.log("edited district leader");
  } catch (e) {
    console.log(e);
  }
}

export async function editStateLeaders(id, data, file = null) {
  try {
    console.log(file);
    const docUrl = `members/state/statecol`;
    let updateData;
    const existingdata = await (
      await getStateLeaders()
    ).find((doc) => doc.id === id);
    const existingprofile = existingdata?.data.profile;
    if (file) {
      if (existingprofile) {
        const profileRef = ref(storage, existingprofile);
        deleteObject(profileRef)
          .then(() => console.log("exisiting profile pic deleted"))
          .catch((e) => console.log(e));
      }

      const profileurl = await uploadProfile(file, id);
      updateData = { ...data, profile: profileurl };
    } else {
      updateData = { ...data };
    }
    await updateDoc(doc(db, docUrl, id), updateData);
    console.log("edited state leader");
  } catch (e) {
    console.log(e);
  }
}

export async function deleteDistrictLeaders(district, id) {
  try {
    const docUrl = `members/district/districtcol/${district}/${district}col`;
    const existingdata = await (
      await getDistrictLeaders(district)
    ).find((doc) => doc.id === id);
    const existingprofile = existingdata.data.profile;
    if (existingprofile) {
      const profileRef = ref(storage, existingprofile);
      deleteObject(profileRef)
        .then(() => console.log("exisiting profile pic deleted"))
        .catch((e) => console.log(e));
    }

    await deleteDoc(doc(db, docUrl, id));
    console.log("deleted district leader");
  } catch (e) {
    console.log(e);
  }
}

export async function deleteStateLeaders(id) {
  try {
    const docUrl = `members/state/statecol`;
    const existingdata = await (
      await getStateLeaders()
    ).find((doc) => doc.id === id);
    const existingprofile = existingdata.data.profile;

    if (existingprofile) {
      const profileRef = ref(storage, existingprofile);
      deleteObject(profileRef)
        .then(() => console.log("exisiting profile pic deleted"))
        .catch((e) => console.log(e));
    }

    await deleteDoc(doc(db, docUrl, id));
    console.log("deleted state leader");
  } catch (e) {
    console.log(e);
  }
}

export async function getMaxSno() {
  try {
    const docUrl = collection(db, "members/state/statecol"); // Correctly reference the collection
    const orderedQuery = query(docUrl, orderBy("sno", "desc"), limit(1));
    const result = await getDocs(orderedQuery);
    let maxSNo = 0;
    result.forEach((doc) => {
      maxSNo = doc.data().sno;
    });
    return maxSNo + 1;
  } catch (e) {
    console.log(e);
  }
}
export async function getMaxSnoDistrict(district) {
  try {
    const docUrl = collection(
      db,
      `members/district/districtcol/${district}/${district}col`
    ); // Correctly reference the collection
    const orderedQuery = query(docUrl, orderBy("sno", "desc"), limit(1));
    const result = await getDocs(orderedQuery);
    let maxSNo = 0;
    result.forEach((doc) => {
      maxSNo = doc.data().sno;
    });
    return maxSNo + 1;
  } catch (e) {
    console.log(e);
  }
}
export async function getExistingSNos() {
  const result = await getStateLeaders();
  const sNoValues = [];
  result.map((doc) => {
    sNoValues.push(doc.data.sno);
  });
  return sNoValues;
}

export async function addLeadersDistrict(district) {
  try {
    const districtUrl = `members/district/districtcol`;
    const id = district.toLowerCase();
    const result = setDoc(doc(db, districtUrl, id), { name: district });
    console.log("district added");
  } catch (e) {
    console.log(e);
  }
}

export async function getDistrictsOfLeaders() {
  try {
    let data = [];
    const result = await getDocs(
      collection(db, "members/district/districtcol")
    );
    result.forEach((district) => {
      data.push({ name: district.data().name, id: district.id });
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteDistrict(id) {
  try {
    await deleteDoc(doc(db, `members/district/districtcol/${id}`));
  } catch (e) {
    console.log(e);
  }
}

export async function getOneDistrict(id) {
  try {
    const result = await getDoc(doc(db, `members/district/districtcol/${id}`));
    return result.data().name;
  } catch (e) {
    console.log(e);
  }
}

export async function editDistrictofLeaders(id, name) {
  try {
    await updateDoc(doc(db, `members/district/districtcol/${id}`), {
      name: name,
    });
  } catch (e) {
    console.log(e);
  }
}
