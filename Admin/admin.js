window.addEventListener("DOMContentLoaded", function () {
  // Render Table
  renderTable();
});

var renderTable = function () {
  var adminTable = document.getElementById("adminTable");
  var data = loadData();

  adminTable.innerHTML = "";

  //   Header Row
  var headerRow = createRow({
    username: "Username",
    loginTime: "Login Time",
  });

  headerRow.setAttribute("class", "bg-dark text-light");

  adminTable.append(headerRow);
  for (var i = 0; i < data.length; i++) {
    var currentRow = createRow(data[i]);

    adminTable.append(currentRow);
  }
};

var createRow = function (item) {
  var row = document.createElement("tr");

  var usernameColumn = document.createElement("td");
  usernameColumn.textContent = item.username;

  var loginTimeColumn = document.createElement("td");
  loginTimeColumn.textContent = item.loginTime;

  row.append(usernameColumn, loginTimeColumn);

  return row;
};
// Load Data from Local Storage
var loadData = function () {
  return JSON.parse(localStorage.getItem("candidates"));
};
