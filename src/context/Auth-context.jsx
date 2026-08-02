import React, { createContext, useContext, useState, useEffect } from "react";
// import { auth, googleProvider } from "../firebase";
// import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 
  // UNCOMMENT THIS BLOCK ONCE YOU HAVE YOUR FIREBASE CONFIG SETUP IN firebase.js
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  */

  // --- MOCK AUTH FOR NOW UNTIL FIREBASE CONFIG IS PROVIDED ---
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const loginWithGoogle = async () => {
    setUser({
      displayName: "Guest User",
      email: "guest@example.com",
      photoURL: "https://ui-avatars.com/api/?name=Guest+User&background=6366f1&color=fff",
    });
  };

  const logout = async () => {
    setUser(null);
  };
  // -------------------------------------------------------------

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
