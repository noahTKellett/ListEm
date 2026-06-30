import {
  ownerWishlist,
  addWishlistItem,
  deleteWishlistItem,
} from "./db_utils.js";

const d = document;
const wishlist = d.getElementById("myList");
const deletePopup = d.getElementById("deletePopup");
const deleteConfirm = d.getElementById("yesOption");

const addPopup = d.getElementById("addPopup");
const imgFld = d.getElementById("imgFld");
const nameFld = d.getElementById("nameFld");
const descrFld = d.getElementById("descrFld");
const priceFld = d.getElementById("priceFld");
const addBtn = d.getElementById("addBtn");

const addItemBtn = d.getElementById("addItemBtn");
addItemBtn.addEventListener("click", () => {
  imgFld.value = "";
  nameFld.value = "";
  descrFld.value = "";
  priceFld.value = "";
  addPopup.showModal();
});
addPopup.addEventListener("click", (event) => {
  if (event.target === addPopup) addPopup.close();
});

let username = localStorage.getItem("username");
let items = JSON.parse(await ownerWishlist(username));
console.log(items);

addBtn.addEventListener("click", async () => {
  // https://png.pngtree.com/png-clipart/20250103/original/pngtree-straw-hat-cartoon-illustration-png-image_8954284.png
  const success = await addWishlistItem(
    username,
    imgFld.value,
    nameFld.value,
    descrFld.value,
    priceFld.value,
  );

  if (success) window.location.reload();
});

let id = 0;
deletePopup.addEventListener("click", (event) => {
  if (event.target === deletePopup) deletePopup.close();
});
deleteConfirm.addEventListener("click", async () => {
  const success = await deleteWishlistItem(id);

  if (success) window.location.reload();
});

let pOne, pTwo, pThree, pFour, pFive, pDelBtn;

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

  pDelBtn = d.createElement("button");
  pDelBtn.classList.add("interaction");
  pDelBtn.id = "deleteBtn";
  pDelBtn.innerText = "X";
  pDelBtn.addEventListener("click", () => {
    id = item.id;
    d.getElementById("deleteHeading").innerText =
      `Do you wish to delete '${item.item_name}'?`;
    deletePopup.showModal();
  });
  listItem.appendChild(pDelBtn);

  // Add the whole row to the "table"
  wishlist.appendChild(listItem);
});
