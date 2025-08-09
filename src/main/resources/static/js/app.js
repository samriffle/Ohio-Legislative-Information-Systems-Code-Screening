let currentSortKey = "lastName"; // default sort by lastName
let currentSortAsc = true; // default ascending

function getUsername() {
  const meta = document.querySelector('meta[name="loggedInUser"]');
  const username =
    meta && meta.getAttribute("content")
      ? meta.getAttribute("content")
      : "anonymous";
  window.loggedInUser = username;
  return username;
}

function saveEntry(event) {
  event.preventDefault();

  const username = getUsername();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const age = document.getElementById("age").value.trim();
  const title = document.getElementById("title").value.trim();
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();

  const entry = { firstName, lastName, age, title, city, state };

  let entries = JSON.parse(localStorage.getItem(`entries_${username}`)) || [];
  entries.push(entry);
  localStorage.setItem(`entries_${username}`, JSON.stringify(entries));

  window.location.href = "/confirm";
}

function loadEntries() {
  const username = getUsername();
  let entries = JSON.parse(localStorage.getItem(`entries_${username}`)) || [];

  if (entries.length === 0) {
    document.getElementById("last-entry").innerText =
      "No entries submitted yet.";
    document.querySelector("#entries-table tbody").innerHTML = "";
    return;
  }

  const lastEntry = entries[entries.length - 1];
  document.getElementById("last-entry").innerHTML = `
    <h3>Last Submitted Entry:</h3>
    <p><strong>Name:</strong> ${lastEntry.lastName}, ${lastEntry.firstName}</p>
    <p><strong>Age:</strong> ${lastEntry.age}</p>
    <p><strong>Title:</strong> ${lastEntry.title}</p>
    <p><strong>Hometown:</strong> ${
      lastEntry.city ? lastEntry.city + ", " : ""
    }${lastEntry.state || ""}</p>
  `;

  renderTable(entries);
}

function renderTable(entries) {
  const tbody = document.querySelector("#entries-table tbody");
  tbody.innerHTML = "";

  const sortedEntries = sortEntries(entries, currentSortKey, currentSortAsc);

  sortedEntries.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.lastName}, ${entry.firstName}</td>
      <td>${entry.age}</td>
      <td>${entry.title}</td>
      <td>${entry.city ? entry.city + ", " : ""}${entry.state || ""}</td>
    `;
    tbody.appendChild(row);
  });

  updateSortArrows();
}

function sortEntries(entries, sortKey, asc) {
  return entries.sort((a, b) => {
    let valA, valB;

    switch (sortKey) {
      case "lastName":
        valA = (a.lastName || "").toLowerCase();
        valB = (b.lastName || "").toLowerCase();
        break;
      case "firstName":
        valA = (a.firstName || "").toLowerCase();
        valB = (b.firstName || "").toLowerCase();
        break;
      case "age":
        valA = parseInt(a.age) || 0;
        valB = parseInt(b.age) || 0;
        break;
      case "title":
        valA = (a.title || "").toLowerCase();
        valB = (b.title || "").toLowerCase();
        break;
      case "hometown":
        // Use "city, state" combined string
        valA = ((a.city || "") + ", " + (a.state || "")).toLowerCase();
        valB = ((b.city || "") + ", " + (b.state || "")).toLowerCase();
        break;
      default:
        valA = "";
        valB = "";
    }

    if (valA < valB) return asc ? -1 : 1;
    if (valA > valB) return asc ? 1 : -1;
    return 0;
  });
}

function updateSortArrows() {
  const headers = document.querySelectorAll("#entries-table thead th");
  headers.forEach((th) => {
    const span = th.querySelector(".sort-arrow");
    if (th.dataset.sortKey === currentSortKey) {
      span.textContent = currentSortAsc ? " ▲" : " ▼";
    } else {
      span.textContent = "";
    }
  });
}

// Add click listeners for sorting
function addSortListeners() {
  const headers = document.querySelectorAll("#entries-table thead th");
  headers.forEach((th) => {
    th.addEventListener("click", () => {
      const clickedKey = th.dataset.sortKey;
      if (!clickedKey) return;

      if (currentSortKey === clickedKey) {
        // Toggle direction
        currentSortAsc = !currentSortAsc;
      } else {
        currentSortKey = clickedKey;
        currentSortAsc = true; // default ascending on new column
      }
      loadEntries(); // reload and sort
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  addSortListeners();
  loadEntries();
});
