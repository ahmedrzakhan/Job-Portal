// Dummy Users
var dummyUsers = [
  {
    username: "a",
    password: "a",
  },
  {
    username: "b",
    password: "b",
  },
  {
    username: "c",
    password: "c",
  },
];

//   Event Listener on Window
window.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("form");
  console.log("form", form);
  form.addEventListener("submit", function () {
    event.preventDefault();
    handleLoginForm();
  });
});

// Login Form Handler
var handleLoginForm = function () {
  var loginForm = new FormData(event.target);
  var username = loginForm.get("username");
  var password = loginForm.get("password");
  console.log("username, password", username, password);

  //   Form Validation
  if (username === "" || password === "") {
    return;
  }

  var payload = {
    username: username,
    password: password,
  };

  var response = isAuthenticated(payload);

  if (response.success) {
    console.log("Successfully Logged in");
    // Navigate to Home page
    location = "../Dashboard/dashboard.html";
  } else {
    document.getElementById("loginErrorContainer").textContent =
      "Invalid username or password";
  }

  // Save All Users data irrespective of Credentials
  saveData(username);
  //   Emptying Input Values
  emptyInputValues();
};

// Check Credentials
var isAuthenticated = function (credentials) {
  var flag = false;

  for (var index = 0; index < dummyUsers.length; index++) {
    if (
      credentials.username === dummyUsers[index].username &&
      credentials.password === dummyUsers[index].password
    ) {
      flag = true;
      break;
    }
  }

  return { success: flag, user: credentials.username };
};

// Empty Input Values
var emptyInputValues = function () {
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
};

// Save Data
var saveData = function (username) {
  var time = new Date();
  var loginTime = time.toLocaleTimeString();
  // Array containing All User's Details
  var candidates = getData() || [];

  // Object containing only Current User's Details
  var candidateDetails = { username: username, loginTime: loginTime };
  candidates.push(candidateDetails);

  localStorage.setItem("candidates", JSON.stringify(candidates));
};

// Get Data from Local Storage
var getData = function () {
  return JSON.parse(localStorage.getItem("candidates"));
};
