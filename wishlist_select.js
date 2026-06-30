import { allUsers } from "./db_utils.js";

const d = document;

let username = localStorage.getItem("username");
console.log("Name: ", username);
let names = JSON.parse(localStorage.getItem("names"));
console.log("Names: ", names);
let data = JSON.parse(localStorage.getItem("data"));
console.log("Data: ", data);

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
