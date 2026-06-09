const d = document;

let name = localStorage.getItem("name");
let userItems = JSON.parse(localStorage.getItem("user"));
console.log("User: ", userItems);
const btnOne = d.getElementById("optBtnOne");
btnOne.innerText = userItems[0].item_name;

let data = JSON.parse(localStorage.getItem("data"));
console.log("Data: ", data);

let otherNames = [];

for (let x = 0; x < data.length; x++) otherNames.push(data[x].owner_name);

const uniqueNames = [...new Set(otherNames)];
console.log("Unique Names: ", uniqueNames);

const userList = d.getElementById("wishlistSelect");

uniqueNames.forEach((name, index) => {
  const btn = d.createElement("button");
  btn.classList.add("button-style");
  btn.id = `optBtn${index}`;
  btn.textContent = name;
  btn.addEventListener("click", () => {
    window.location.href = "wishlist_view.html";
  });
  userList.appendChild(btn);
});
