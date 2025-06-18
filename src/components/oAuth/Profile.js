import React, { useEffect } from "react";
import { logout, init } from "./Script";

const Profile = () => {
  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <h1>Welcome to profile</h1>
      <h2 id="name">Your Full Name is:</h2>
      <img id="image" src="" alt="" />
      <div id="email"></div>
      {/* <div id="accessToken"></div> */}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
