"use server";

export async function signUpAction(prevState, rawFormData) {
  const formData = Object.fromEntries(rawFormData);
  const supabase = await createClient();
  const origin = await headers().get("origin");
  if (!formData.email || !formData.password) {
    return { error: "Email and password are required" };
  }
  try {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });
    if (error) throw new Error(error.message);
    return {
      success:
        "Thanks for signing up! Please check your email for a verification link.",
    };
  } catch (e) {
    return { error: e.message };
  }
}
