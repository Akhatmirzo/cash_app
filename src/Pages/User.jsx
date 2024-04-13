import React, { useContext, useState } from "react";
import PrimaryBtn from "../Components/Buttons/PrimaryBtn";
import { ControlContext } from "../App";

export default function User() {
  const { navigate, dispatch } = useContext(ControlContext);
  const [user, setUser] = useState(localStorage.getItem("user"));

  const userDoc = () => {
    if (!user) {
      const name = window.prompt("Enter your name");

      if (name) {
        setUser(name);
        localStorage.setItem("user", JSON.stringify(name));
        navigate("/wallet");
        dispatch({ type: "start" });

        setTimeout(() => {
          dispatch({ type: "stop" });
        }, 3000);
      }
    }else {
      navigate("/wallet");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <PrimaryBtn btnText={"Start"} clickFunc={userDoc} />
    </div>
  );
}
