import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://hgmpzsuqqxeenxlgbjlp.supabase.co",
  "sb_publishable_JB8n7KRQtk_0C6ImNBA5uQ_Qs6YZV1X",
);

const d = document;

const { data, error } = await supabase
  .from("WishlistItems")
  .select("owner_name");
console.log("Data: ", data);
console.log("Error: ", error);
const uniqueNames = [...new Set(data.map((item) => item.owner_name))];

const userList = d.getElementById("userSelect");

uniqueNames.forEach((name, index) => {
  const btn = d.createElement("button");
  btn.classList.add("button-style");
  btn.id = `optBtn${index}`;
  btn.textContent = name;
  btn.addEventListener("click", () => load(name));
  userList.appendChild(btn);
});

// Load in the items for the name selected
async function load(name) {
  const { data: userData, error: userSelectError } = await supabase
    .from("WishlistItems")
    .select("*")
    .eq("owner_name", name);
  console.log("error:", userSelectError);
  localStorage.setItem("name", name);
  localStorage.setItem("user", JSON.stringify(userData));
  const { data: listsData, error: listsError } = await supabase
    .from("WishlistItems")
    .select("*")
    .neq("owner_name", name);
  localStorage.setItem("data", JSON.stringify(listsData));
  console.log("error:", listsError);
  window.location.href = "wishlist_select.html";
}
