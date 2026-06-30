import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://hgmpzsuqqxeenxlgbjlp.supabase.co",
  "sb_publishable_JB8n7KRQtk_0C6ImNBA5uQ_Qs6YZV1X",
);

export async function allUsers() {
  const { data, error } = await supabase.from("Users").select("*");
  console.log("data:", data);
  console.log("error:", error);
  return JSON.stringify(data);
}

export async function addUser(name) {}

export async function allData() {
  const { data, error } = await supabase.from("WishlistItems").select("*");
  console.log("data:", data);
  console.log("error:", error);
  return JSON.stringify(data);
}

export async function ownerWishlist(name) {
  const { data, error } = await supabase
    .from("WishlistItems")
    .select("*")
    .eq("owner_name", name);
  console.log("data:", data);
  console.log("error:", error);
  return JSON.stringify(data);
}

export async function otherUsersWishlists(name) {
  const { data, error } = await supabase
    .from("WishlistItems")
    .select("*")
    .neq("owner_name", name);
  console.log("error:", error);
  console.log("data:", data);
  return JSON.stringify(data);
}

export async function addWishlistItem(name, imgURL, itemName, descr, price) {
  const { data, error } = await supabase
    .from("WishlistItems")
    .insert([
      {
        owner_name: name,
        image_url: imgURL,
        item_name: itemName,
        item_descr: descr,
        price: price,
      },
    ])
    .select();

  if (error) {
    console.error("Insert failed", error);
    return false;
  }

  console.log("Added: ", data);
  return true;
}

export async function deleteWishlistItem(id) {
  const { data, error } = await supabase
    .from("WishlistItems")
    .delete()
    .eq("id", Number(id))
    .select();

  console.log("Deleted rows: ", data?.length);

  if (error) {
    console.log("delete failed", error);
    return false;
  }

  console.log("Deleted: ", data);
  return true;
}
