import React from "react";
import "./login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import { UseStateValue } from "../../stateProvider";
import { actionTypes } from "../../redux";

export default function () {
  const [{}, dispatch] = UseStateValue();
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user
        });
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to whatsapp</h1>
        </div>

        <Button type="submit" onClick={signIn}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
