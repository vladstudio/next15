"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function resetPasswordAction(prevState, rawFormData) {
  const formData = Object.fromEntries(rawFormData);
  const supabase = await createClient();

  try {
    if (!formData.password || !formData.confirmPassword) {
      throw new Error("Password and confirm password are required.");
    }
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Passwords do not match.");
    }
    const { error } = await supabase.auth.updateUser({
      password: formData.password,
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    return { error: e.message };
  }
  return redirect("/auth/sign-in");
}
