import {
  ownerWishlist,
  addWishlistItem,
  deleteWishlistItem,
  addImage,
  getImage,
} from "./db_utils.js";

const d = document;
d.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));
if (localStorage.getItem("authenticated") !== "true")
  window.location.href = "unauthorized.html";

const wishlist = d.getElementById("myList");
const deletePopup = d.getElementById("deletePopup");
const deleteConfirm = d.getElementById("yesOption");

const addPopup = d.getElementById("addPopup");
const imgFld = d.getElementById("imgFld");
const nameFld = d.getElementById("nameFld");
const descrFld = d.getElementById("descrFld");
const priceFld = d.getElementById("priceFld");
const addBtn = d.getElementById("addBtn");
const imgLbl = d.getElementById("imgLbl");
const imgPreview = d.getElementById("imgPreview");

const addItemBtn = d.getElementById("addItemBtn");
addItemBtn.addEventListener("click", () => {
  imgLbl.innerText = "Image";
  imgPreview.src = "img/add.png";
  imgFld.value = "";
  nameFld.value = "";
  descrFld.value = "";
  priceFld.value = "";
  addPopup.showModal();
});
addPopup.addEventListener("click", (event) => {
  if (event.target === addPopup) addPopup.close();
});

// Using the image selection from local storage
// (via clicking the "add"/"+" image)
const imgUpload = d.getElementById("imgUpload");
imgUpload.addEventListener("change", () => {
  const file = imgUpload.files[0];
  if (!file) return;
  imgPreview.src = URL.createObjectURL(file);
  imgLbl.innerText = "Image (Format: Local Storage)";
});
imgPreview.addEventListener("click", () => {
  imgUpload.click();
});
imgPreview.onload = () => {
  URL.revokeObjectURL(imgPreview.src);
};

imgFld.addEventListener("blur", (event) => {
  if (imgFld.value === "") {
    console.log("Field is empty");
  } else if (imgFld.value !== "") {
    imgPreview.src = imgFld.value;
    if (imgPreview.naturalWidth === 0) imgPreview.src = "img/add.png";
    else imgLbl.innerText = "Image (Format: URL)";
  }
  console.log("Clicked off field");
});

let username = localStorage.getItem("username");
let items = JSON.parse(await ownerWishlist(username));

addBtn.addEventListener("click", async () => {
  // https://png.pngtree.com/png-clipart/20250103/original/pngtree-straw-hat-cartoon-illustration-png-image_8954284.png
  let imgSource = "";
  if (imgUpload.files.length > 0) {
    const file = imgUpload.files[0];
    const filename = `${username}/${Date.now()}_${file.name}`;

    imgSource = await addImage(filename, file);
  } else imgSource = imgFld.value;
  const success = await addWishlistItem(
    username,
    imgSource,
    nameFld.value,
    descrFld.value,
    priceFld.value,
  );

  if (success) window.location.reload();
});

let globalId = 0,
  imgSrc = "";
deletePopup.addEventListener("click", (event) => {
  if (event.target === deletePopup) deletePopup.close();
});
deleteConfirm.addEventListener("click", async () => {
  const success = await deleteWishlistItem(globalId, imgSrc);
  if (success) window.location.reload();
});

let pOne;

if (items.length > 0) {
  let pTwo, pThree, pFour, pFive, pDelBtn;
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
    const isUrl =
      item.image_url.startsWith("http://") ||
      item.image_url.startsWith("https://");
    if (isUrl) pTwo.src = item.image_url;
    else pTwo.src = getImage(item.image_url);

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
    pFive.innerText = "$" + item.price.toFixed(2);
    listItem.appendChild(pFive);

    pDelBtn = d.createElement("button");
    pDelBtn.classList.add("interaction");
    pDelBtn.id = "deleteBtn";
    pDelBtn.style.backgroundColor = "var(--btn-delete)";
    pDelBtn.innerText = "X";
    pDelBtn.addEventListener("click", () => {
      globalId = item.id;
      imgSrc = item.image_url;
      d.getElementById("deleteHeadItemName").innerText = `"${item.item_name}"?`;
      deletePopup.showModal();
    });
    listItem.appendChild(pDelBtn);

    // Add the whole row to the "table"
    wishlist.appendChild(listItem);
  });
} else {
  pOne = d.createElement("p");
  pOne.style.width = "95%";
  pOne.id = "empty-message";
  pOne.innerText = `You have no items in your wishlist`;
  wishlist.appendChild(pOne);
}

const backBtn = d.getElementById("backBtn");
backBtn.addEventListener("click", () => {
  window.location.href = "wishlist_select.html";
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
