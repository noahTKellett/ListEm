import { checkPassword } from "./db_utils.js";

const d = document;
const passwordFld = d.getElementById("passwordFld");
const submitBtn = d.getElementById("submitBtn");
const txtOne = d.getElementById("txtOne");

d.documentElement.setAttribute("data-theme", "dark");
localStorage.setItem("authenticated", false);

submitBtn.addEventListener("click", async () => {
  if (await checkPassword(passwordFld.value)) {
    localStorage.setItem("authenticated", true);
    window.location.href = "select.html";
  } else txtOne.innerText = "Failed";
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
  localStorage.setItem("theme", theme);
});
