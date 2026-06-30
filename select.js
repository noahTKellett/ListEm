import { allUsers, otherUsersWishlists, ownerWishlist } from "./db_utils.js";

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

console.log(uniqueNames);

// Load in the items for the name selected
async function load(name) {
  localStorage.setItem("username", name);
  localStorage.setItem("names", JSON.stringify(uniqueNames));
  //localStorage.setItem("userItems", await ownerWishlist(name));
  localStorage.setItem("data", await otherUsersWishlists(name));
  window.location.href = "wishlist_select.html";
}
