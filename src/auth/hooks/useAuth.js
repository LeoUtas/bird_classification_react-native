import { useEffect, useState } from "react";
import { auth } from "../../../Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            // console.log("got user: ", user);

            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return unSubscribe;
    }, [user]);

    return { user };
}
