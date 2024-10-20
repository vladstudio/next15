"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInAction(prevState, rawFormData) {
  const formData = Object.fromEntries(rawFormData);
  const supabase = await createClient();
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (!!error) throw new Error(error.message);
    revalidatePath("/");
  } catch (e) {
    return { error: e.message };
  }
  return redirect("/");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  return redirect("/auth/sign-in");
}
