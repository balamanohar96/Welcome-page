import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((store) => store.user);

  const signoutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { displayName, email } = user;
        dispatch(addUser({ displayName, email }));
        navigate("/welcome");
      } else {
        // User is signed out
        navigate("/");
      }
    });
  }, [navigate, dispatch]);

  return (
    <div>
      <h1>Welcome, {userDetails?.displayName}</h1>
      <button onClick={() => signoutHandler()}>logout</button>
    </div>
  );
};

export default Welcome;
