import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://hgmpzsuqqxeenxlgbjlp.supabase.co",
  "sb_publishable_JB8n7KRQtk_0C6ImNBA5uQ_Qs6YZV1X",
);

const d = document;

const optBtnOne = d.getElementById("optBtnOne");
const optBtnTwo = d.getElementById("optBtnTwo");
const optBtnThree = d.getElementById("optBtnThree");
const optBtnFour = d.getElementById("optBtnFour");

optBtnOne.addEventListener("click", () => load(optBtnOne.innerText));
optBtnTwo.addEventListener("click", () => load(optBtnTwo.innerText));
optBtnThree.addEventListener("click", () => load(optBtnThree.innerText));
optBtnFour.addEventListener("click", () => load(optBtnFour.innerText));

// Load in the items for the name selected
async function load(name) {
  const { data, error } = await supabase
    .from("WishlistItems")
    .select("*")
    .eq("owner_name", name);
  console.log("error:", error);
  list.removeAttribute("hidden");
  item.innerText = data[0].item_name;
  userItems = data;
  console.log("Current User's Items: ", userItems);
}
