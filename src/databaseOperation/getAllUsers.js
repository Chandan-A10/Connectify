import { onSnapshot, query } from "firebase/firestore";
import { UserCollection } from "../firebase/firebase";

export const getAllUser = (onSnapshotCallback) => {
  const qry = query(UserCollection);
  const userDetails = [];

  const unsubscribeSnapshots = onSnapshot(qry, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const docData = change.doc.data();
      const index = userDetails.findIndex((user) => user.userID === docData.userID);

      if (change.type === "added" && index === -1) {
        userDetails.push(docData);
      } else if (change.type === "modified" && index !== -1) {
        userDetails[index] = docData;
      } else if (change.type === "removed" && index !== -1) {
        userDetails.splice(index, 1);
      }
    });

    onSnapshotCallback([...userDetails]);
  });

  return unsubscribeSnapshots;
};

