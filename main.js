/*import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://hgmpzsuqqxeenxlgbjlp.supabase.co",
  "sb_publishable_JB8n7KRQtk_0C6ImNBA5uQ_Qs6YZV1X",
);*/

let userItems;

const password = "Test"; //"AnderDingus2026"
const d = document;

const panel = d.getElementById("panel");

const passwordFld = d.getElementById("passwordFld");

const submitBtn = d.getElementById("submitBtn");

const txtOne = d.getElementById("txtOne");

submitBtn.addEventListener("click", () => {
  if (passwordFld.value == password) {
    window.location.href = "select.html";
  } else txtOne.innerText = "Failed";
});
