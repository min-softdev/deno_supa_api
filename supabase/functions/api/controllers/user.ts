import { supabase } from "../utils/index.ts";

interface UserPayload {
  name: string;
  description: string;
  quantity: number;
}
interface createUserProps {
  req: {
    json: () => Promise<UserPayload>;
  };
  json: (
    data: { msg: string; data?: UserPayload | null; error?: string },
  ) => void;
}
export const createUser = async (c: createUserProps) => {
  const payload = await c.req.json();

  const { data, error } = await supabase
    .from("users")
    .insert([payload]);

  if (error) throw new Error(error.message);

  return c.json({ msg: "User created successfully", data });
};

interface UserData {
  name: string;
  description: string;
  quantity: number;
  uid: string;
}
interface getUsersProps {
  req: {
    query: (key: string) => string;
  };
  json: (
    data: { data?: UserData[] | null; error?: string },
  ) => void;
}
export const getUsers = async (c: getUsersProps) => {
  try {
    const id = c.req.query("id");
    if (id) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("uid", id)
        .single();
      if (error) throw new Error(error.message);
      return c.json({ data });
    }

    const { data, error } = await supabase.from("users").select("*");
    if (error) throw new Error(error.message);
    return c.json({ data });
  } catch (error) {
    return c.json({ error: error.message });
  }
};

interface getUserProps {
  req: {
    query: (key: string) => string;
  };
  json: (
    data: { data?: UserData | null; error?: string },
  ) => void;
}
export const getUser = async (c: getUserProps) => {
  const id = c.req.query("id");
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uid", id)
    .single();
  console.log("id :>> ", id);
  if (error) throw new Error(error.message);
  return c.json({ data });
};

interface updateUserProps {
  req: {
    json: () => Promise<{
      name?: string;
      description?: string;
      quantity?: number;
    }>;
    query: (key: string) => string;
  };
  json: (
    data: { msg?: string; data?: UserData[] | null; error?: string },
  ) => void;
}
export const updateUser = async (c: updateUserProps) => {
  try {
    const id = c.req.query("id");
    const payload = await c.req.json();

    const { data, error } = await supabase
      .from("users")
      .update(payload)
      .eq("uid", id);

    if (error) throw new Error(error.message);

    return c.json({ msg: "User updated successfully", data });
  } catch (error) {
    return c.json({ error: error.message });
  }
};

interface deleteUserProps {
  req: {
    query: (key: string) => string;
  };
  json: (
    data: { msg?: string; data?: UserData | null; error?: string },
  ) => void;
}
export const deleteUser = async (c: deleteUserProps) => {
  const id = c.req.query("id");

  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("uid", id);

  if (error) throw new Error(error.message);

  return c.json({ msg: "User deleted successfully", data });
};
