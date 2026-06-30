import { ownerWishlist } from "./db_utils.js";

const d = document;
const person = localStorage.getItem("name");

const title = d.getElementById("title");
title.innerText = `ListEm - ${person}'s Wishlist`;
const heading = d.getElementById("userWishlistTitle");
heading.innerText = `${person}'s Wishlist`;

const wishlist = d.getElementById("itemList");

const items = JSON.parse(await ownerWishlist(person));
console.log(items);
let pOne, pTwo, pThree, pFour, pFive;

// For each of the selected user's wishlisted items
// create a row to show the information
items.forEach((item, index) => {
  const listItem = d.createElement("li");
  listItem.classList.add("item");

  // Item Index (Number for the order the items were added in)
  pOne = d.createElement("p");
  pOne.classList.add("item-info");
  pOne.id = "num";
  pOne.innerText = index + 1;
  listItem.appendChild(pOne);

  // Item Image (URL for a visual representation of the item)
  pTwo = d.createElement("img");
  pTwo.classList.add("item-info");
  pTwo.id = "image";
  // If the image URL is provided, put it in.
  // If not, put a message saying one was not provided
  pTwo.src = item.image_url;
  pTwo.alt = "Error with Image";
  if (pTwo.src.toUpperCase() == "NULL") pTwo.alt = "No Image Provided";
  listItem.appendChild(pTwo);

  // The item's name
  pThree = d.createElement("p");
  pThree.classList.add("item-info");
  pThree.id = "name";
  pThree.innerText = item.item_name;
  listItem.appendChild(pThree);

  // Description of item
  pFour = d.createElement("p");
  pFour.classList.add("item-info");
  pFour.id = "descr";
  pFour.innerText = item.item_descr;
  listItem.appendChild(pFour);

  // Item Price
  pFive = d.createElement("p");
  pFive.classList.add("item-info");
  pFive.id = "price";
  pFive.innerText = "$" + item.price;
  listItem.appendChild(pFive);

  // Add the who,e row to the "table"
  wishlist.appendChild(listItem);
});
