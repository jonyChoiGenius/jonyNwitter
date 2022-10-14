import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
  faGit,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";

function Auth() {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtns">
          Continue with Google{" "}
          <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
        </button>
        <button onClick={onSocialClick} name="github" className="authBtns">
          Continue with Github{" "}
          <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}

export default Auth;
