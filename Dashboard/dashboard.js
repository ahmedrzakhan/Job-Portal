window.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("form");
  form.addEventListener("submit", function () {
    event.preventDefault();
    handleSearch();
  });
});

// Search Handler
var handleSearch = function () {
  var searchForm = new FormData(event.target);
  var description = searchForm.get("description");
  var location = searchForm.get("location");
  console.log("description, location", description, location);

  var details = {
    description: description,
    location: location,
  };

  searchRequest(details);
};

// Search Request
var searchRequest = function (payload) {
  var xhr = new XMLHttpRequest();
  var method = "GET";
  var url =
    "https://jobs.github.com/positions.json?description=" +
    payload.description +
    "&location=" +
    payload.location;
  // console.log("url", url);
  xhr.open(method, url);

  xhr.onload = function () {
    console.log("this.response", JSON.parse(this.response));
    if (this.status === 200) {
      handleResponse(JSON.parse(this.response));
    } else {
      handleResponse(JSON.parse(this.response));
    }
  };

  xhr.send();
};

// Response Handler
var handleResponse = function (response) {
  if (response.error) {
    errorHandler(response);
  } else {
    addToResultContainer(response);
  }
};

var addToResultContainer = function (response) {
  var searchResultsContainer = document.getElementById(
    "searchResultsContainer"
  );
  searchResultsContainer.innerHTML = "";
  for (var index = 0; index < response.length; index++) {
    var row = document.createElement("div");
    row.setAttribute("class", "row");

    var column = document.createElement("div");
    column.setAttribute("class", "col-sm-12 col-md-10 col-lg-10");

    var card = document.createElement("div");
    card.setAttribute("class", "card mt-3");

    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    var titleLocationContainer = document.createElement("div");
    // firstDiv.setAttribute("class", "d-flex")
    titleLocationContainer.setAttribute(
      "class",
      "d-flex justify-content-between"
    );

    var title = document.createElement("p");
    title.setAttribute("class", "text-primary font-weight-bold");
    title.textContent = response[index].title;

    var location = document.createElement("p");
    location.textContent = response[index].location;
    titleLocationContainer.append(title, location);

    var div = document.createElement("div");
    div.setAttribute("class", "d-flex justify-content-between");

    var companyTypeContainer = document.createElement("div");
    // companyTypeContainer.setAttribute("class", "float-left");
    var company = document.createElement("p");
    company.setAttribute("class", "float-left text-secondary");
    company.textContent = response[index].company + " " + "-";

    var type = document.createElement("p");
    type.textContent = response[index].type;
    type.setAttribute("class", "float-left text-success");
    companyTypeContainer.append(company, type);

    var createdDate = document.createElement("div");
    createdDate.textContent = response[index].created_at;

    div.append(companyTypeContainer, createdDate);

    cardBody.append(titleLocationContainer, div);
    card.append(cardBody);
    column.append(card);
    row.append(column);
    searchResultsContainer.append(row);
  }
};
