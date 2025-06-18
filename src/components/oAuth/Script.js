// script.js

// const clientId = "170194165705-arq564hpk0v19a01c1ad1n95mbfe4coh.apps.googleusercontent.com";
const clientId =
  "170194165705-vpd745kc28ifgnvmcg1btnfogn9olrev.apps.googleusercontent.com";
var info;
function signIn() {
  let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  let form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("action", oauth2Endpoint);

  let params = {
    client_id: clientId,
    redirect_uri: "http://localhost:3000/profile",
    response_type: "token",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    include_granted_scopes: "true",
    state: "pass-through-value",
  };

  for (var p in params) {
    let input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}

let params = {};

function parseLocationParams() {
  let regex = /([^&=]+)=([^&]*)/g;
  let m;

  while ((m = regex.exec(window.location.href))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  if (Object.keys(params).length > 0) {
    localStorage.setItem("authInfo", JSON.stringify(params));
  }
}

// // // hide the access token

// // window.history.pushState({}, document.title, "/" + "profile.html")
function init() {
  parseLocationParams();

  info = JSON.parse(localStorage.getItem("authInfo"));

  // Store the access token in a variable
  const accessToken = info["access_token"];
  //  console.log(info['access_token'])
  console.log(accessToken);
  // console.log(info)
  // console.log(info['access_token'])
  // console.log(info['expires_in'])
  // console.log(info['email'])

  fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${info["access_token"]}`,
    },
  })
    .then((data) => data.json())
    .then((userInfo) => {
      console.log(userInfo);
      // console.log(info['access_token'])
      // console.log(info['expires_in'])
      // console.log(info['email'])
      document.getElementById("name").innerHTML += userInfo.name;
      document.getElementById("image").setAttribute("src", userInfo.picture);
      document.getElementById("email").innerHTML += userInfo.email;

      //  document.getElementById('accessToken').innerHTML += accessToken;
    });
}

function clearSessionData() {
  localStorage.removeItem("authInfo"); // Remove stored authentication info
  info = null; // Clear the 'info' variable
}

function logout() {
  fetch(
    "https://oauth2.googleapis.com/revoke?token=" + params["access_token"],
    {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    }
  ).then((data) => {
    clearSessionData();
    window.location.href = "http://localhost:3000";
  });
}

export { signIn, init, logout };
