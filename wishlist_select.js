import { allUsers } from "./db_utils.js";

const d = document;
d.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));
if (localStorage.getItem("authenticated") !== "true")
  window.location.href = "unauthorized.html";

let username = localStorage.getItem("username");
let names = JSON.parse(localStorage.getItem("names"));

const userList = d.getElementById("wishlistSelect");
names.forEach((name, index) => {
  if (name.user != username) {
    const btn = d.createElement("button");
    btn.classList.add("button-style");
    btn.id = `optBtn${index}`;
    btn.textContent = name.user;
    btn.addEventListener("click", () => {
      localStorage.setItem("name", name.user);
      window.location.href = "wishlist_view.html";
    });
    userList.appendChild(btn);
  }
});

const myListBtn = d.getElementById("myWishlistBtn");
myListBtn.addEventListener("click", () => {
  window.location.href = "my_wishlist.html";
});
myListBtn.style.width = userList.offsetWidth + "px";

const backBtn = d.getElementById("backBtn");
backBtn.addEventListener("click", () => {
  window.location.href = "select.html";
});

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
