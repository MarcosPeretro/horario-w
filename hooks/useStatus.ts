import { db } from "../firebase/firebase-config";
import { Status } from "../components/StatusCard";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";



export const useStatus = (userId: string | undefined) => {
  const [status, setStatus] = useState<Status[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "Status-Warframe"),
      where("userId", "==", userId)
    );

    // Definindo o listener de alterações no DB
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        setStatus(
          querySnapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Status)
          )
        );
        setLoading(false);
      },
      () => {
        setLoading(false);
      }, // Em caso de erro
    );

    // Removendo o listener
    return () => unsubscribe();
  }, []);

  return {status, loading };
};
