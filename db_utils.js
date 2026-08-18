import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://hgmpzsuqqxeenxlgbjlp.supabase.co",
  "sb_publishable_JB8n7KRQtk_0C6ImNBA5uQ_Qs6YZV1X",
);

export async function checkPassword(attempt) {
  const { data, error } = await supabase.from("Passwords").select("*");
  if (attempt === data[0].password) return true;
  else return false;
}

// Get all users name from "Users" table to users to select from
export async function allUsers() {
  const { data, error } = await supabase.from("Users").select("*");
  console.log("data:", data);
  console.log("error:", error);
  return JSON.stringify(data);
}

export async function addUser(name) {}

// Image storage bucket get, add, delete
export function getImage(filename) {
  const { data, error } = supabase.storage
    .from("wishlist-images")
    .getPublicUrl(filename);

  if (error) {
    console.error("image retreival failed: ", error);
    return false;
  }

  return data.publicUrl;
}

export async function addImage(filename, file) {
  const { data, error } = await supabase.storage
    .from("wishlist-images")
    .upload(filename, file);

  if (error) {
    console.error("uploading image failed: ", error);
    return null;
  }

  return data.path;
}

export function deleteImage(filename) {
  const { data, error } = supabase.storage
    .from("wishlist-images")
    .remove(filename);

  if (error) {
    console.error("image deletion failed: ", error);
    return false;
  } else {
    console.log(`Image "${filename}" sucessfully deleted: `, data);
  }
}

// Users wants to view all the items in another user's wishlist
export async function ownerWishlist(name) {
  const { data, error } = await supabase
    .from("WishlistItems")
    .select("*")
    .eq("owner_name", name);
  console.log("data:", data);
  console.log("error:", error);
  return JSON.stringify(data);
}

// User wants to add an item to their own wishlist
// User gives image, item name, item description, and item price as inputs
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
    console.error("Insert failed: ", error);
    return false;
  }

  console.log("Added: ", data);
  return true;
}

// I AM CURRENTLY ATTEMPTING TO ADD THE DELETION OF AN IMAGE
// FROM THE STORAGE BUCKET IF THE IMAGE OCNTAINED IN A WISHLIST ITEM
// IS AN IMAGE FROM THAT SAME BUCKET

// User wants to delete one existsing item from their own wishlist
export async function deleteWishlistItem(id, filename) {
  if (!(filename.startsWith("http://") || filename.startsWith("https://"))) {
    deleteImage(filename);
  }

  const { data, error } = await supabase
    .from("WishlistItems")
    .delete()
    .eq("id", Number(id))
    .select();

  console.log("Deleted rows: ", data?.length);

  if (error) {
    console.error("delete failed: ", error);
    return false;
  }

  console.log("Deleted: ", data);
  return true;
}
