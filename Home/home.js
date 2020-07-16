window.addEventListener("DOMContentLoaded", function () {
  console.log("a");
  var candidateLogin = document.getElementById("candidateLogin");
  candidateLogin.addEventListener("click", onCandidateLogin);
});

var onCandidateLogin = function () {
  location = "../Login/login.html";
};
