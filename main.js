const password = "Test"; //"AnderDingus2026"
const d = document;

const passwordFld = d.getElementById("passwordFld");

const submitBtn = d.getElementById("submitBtn");

const txtOne = d.getElementById("txtOne");

submitBtn.addEventListener("click", () => {
  if (passwordFld.value == password) {
    window.location.href = "select.html";
  } else txtOne.innerText = "Failed";
});
