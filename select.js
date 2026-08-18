import { allUsers, ownerWishlist } from "./db_utils.js";

const d = document;
const uniqueNames = JSON.parse(await allUsers());
const userList = d.getElementById("userSelect");
uniqueNames.forEach((user, index) => {
  const btn = d.createElement("button");
  btn.classList.add("button-style");
  btn.id = `optBtn${index}`;
  btn.textContent = user.user;
  btn.addEventListener("click", () => load(user.user));
  userList.appendChild(btn);
});

d.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));
if (localStorage.getItem("authenticated") !== "true") {
  window.location.href = "unauthorized.html";
}

const toggle = d.getElementById("mode");
if (localStorage.getItem("theme") === "dark") toggle.checked = true;
else toggle.checked = false;
toggle.addEventListener("change", () => {
  console.log("Toggle Chcked = ", toggle.checked);

  let theme = "";
  if (toggle.checked === true) theme = "dark";
  else theme = "light";
  d.documentElement.setAttribute("data-theme", theme);

  console.log("Theme = ", theme);

  localStorage.setItem("theme", theme);
});

// Load in the items for the name selected
async function load(name) {
  localStorage.setItem("username", name);
  localStorage.setItem("names", JSON.stringify(uniqueNames));
  window.location.href = "wishlist_select.html";
}
