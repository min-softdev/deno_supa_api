import { supabase } from "../utils/index.ts";

interface signUpProps {
  req: {
    json: () => Promise<{ email: string; password: string }>;
  };
  json: (data: { msg: string; data?: any; error?: string }) => void;
}
export const signUp = async (c: signUpProps) => {
  try {
    const { email, password } = await c.req.json();
    
    const { error, ...data } = await supabase.auth.signUp({ email, password });

    if (error) throw new Error(error.message);

    return c.json({ msg: "User created successfully", data });
  } catch (error) {
    return c.json({ msg: "Error", error: error.message });
  }
};

interface signInProps {
  req: {
    json: () => Promise<{ email: string; password: string }>;
  };
  json: (data: { msg: string; error?: string; data?: any }) => void;
}
export const signIn = async (c: signInProps) => {
  try {
    const { email, password } = await c.req.json();
    const { error, ...data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    return c.json({ msg: "Signin successfully", data });
  } catch (error) {
    return c.json({ msg: "Error", error: error.message });
  }
};

interface forgotPasswordProps {
  req: {
    json: () => Promise<{ email: string }>;
  };
  json: (data: { msg: string; error?: string; data?: any }) => void;
}
export const forgotPassword = async (c: forgotPasswordProps) => {
  try {
    const { email } = await c.req.json();
    const { error, ...data } = await supabase.auth.resetPasswordForEmail(email);

    if (error) throw new Error(error.message);

    return c.json({ msg: "Reset password email sent", data });
  } catch (error) {
    return c.json({ msg: "Error", error: error.message });
  }
};

interface changePasswordProps {
  req: {
    json: () => Promise<{ email: string; new_password: string }>;
  };
  json: (data: { msg: string; error?: string; data?: any }) => void;
}
export const changePassword = async (c: changePasswordProps) => {
  try {
    const { email, new_password } = await c.req.json();
    const { error, ...data } = await supabase.auth.updateUser({
      email,
      password: new_password,
    });

    if (error) throw new Error(error.message);

    return c.json({ msg: "Password changed successfully", data });
  } catch (error) {
    return c.json({ msg: "Error", error: error.message });
  }
};

interface signOutProps {
  req: {
    json: () => Promise<{ access_token: string }>;
  };
  json: (data: { msg: string; data?: any; error?: string }) => void;
}
export const signOut = async (c: signOutProps) => {
  try {
    const { access_token }: any = await c.req.json();
    const { error, ...data } = await supabase.auth.signOut(access_token);

    if (error) throw new Error(error.message);

    return c.json({ msg: "Signout successfully", data });
  } catch (error) {
    return c.json({ msg: "Error", error: error.message });
  }
};

interface inviteUserProps {
  req: {
    json: () => Promise<{ email: string }>;
  };
  json: (data: { msg: string; data?: any; error?: string }) => void;
}
export const inviteUser = async (c: inviteUserProps) => {
  try {
    const { email } = await c.req.json();

    let { error, ...data } = await supabase.auth.admin.inviteUserByEmail(email);

    if (error) throw new Error(error.message);

    return c.json({ msg: "Invitation sent successfully", data });
  } catch (error) {
    return c.json({ msg: "Error", error: error.message });
  }
};
