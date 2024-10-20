"use server";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function forgotPasswordAction(prevState, rawFormData) {
  const formData = Object.fromEntries(rawFormData);
  const supabase = await createClient();
  const origin = await headers().get("origin");
  try {
    if (!formData.email) throw new Error("Email is required");

    const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
      redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
    });

    if (error) throw new Error(error.message);

    return { success: "Check your email for a link to reset your password." };
  } catch (e) {
    return { error: e.message };
  }
}
