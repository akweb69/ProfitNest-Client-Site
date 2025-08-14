import React, { createContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import auth from "../Firebase/firebase.config"

export const AppContext = createContext();

const googleProvider = new GoogleAuthProvider();

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("user from context api---->", currentUser)
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    };

    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    };

    const logout = () => {
        return signOut(auth)
    };

    const contextValue = {
        user,
        loading,
        setUser,
        signUp,
        login,
        googleLogin,
        logout,
        setLoading,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default ContextProvider;
