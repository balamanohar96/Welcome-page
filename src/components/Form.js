import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [isNewUser, setIsNewUser] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (isNewUser) {
      if (name.trim() === "") {
        setError("Please enter name");
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name,
            email: email,
          }).then(() => {
            // Profile updated!
            const { displayName, email } = user;
            dispatch(addUser({ displayName, email }));
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setError("Email already registered");
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const { displayName, email } = user;
          dispatch(addUser({ displayName, email }));
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setError("email or password is invalid");
        });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { displayName, email, uid } = user;
        dispatch(addUser({ displayName, email, uid }));
        navigate("/welcome");
      } else {
        // User is signed out
        navigate("/");
      }
    });
  }, [navigate, dispatch]);

  return (
    <div>
      <form onSubmit={(e) => submitHandler(e)}>
        <h1>{isNewUser ? "Sign Up" : "Login"}</h1>
        {isNewUser && (
          <>
            <label>Name : </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
            ></input>
          </>
        )}
        <br></br>
        <label>Email : </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
        ></input>
        <br></br>
        <label>Password : </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        ></input>
        <br></br>
        <button>{isNewUser ? "Sign up" : "Login"}</button>
        <p onClick={() => setIsNewUser(!isNewUser)}>
          {isNewUser
            ? "Already have an account? Login"
            : "Dont have an account? Create a new account"}
        </p>
        <h2>{error && error}</h2>
      </form>
    </div>
  );
};

export default Form;
