import { supabase } from "../utils/index.ts";

interface ConfigPayload {
  name: string;
  key: string;
  value: any;
  type: string;
  description: string;
  sub_config: any;
}
interface createConfigProps {
  req: {
    json: () => Promise<ConfigPayload>;
  };
  json: (
    data: { msg: string; data?: ConfigPayload | null; error?: string },
  ) => void;
}
export const createConfig = async (c: createConfigProps) => {
  const payload = await c.req.json();

  const { data, error } = await supabase
    .from("configs")
    .insert([payload]);

  if (error) throw new Error(error.message);

  return c.json({ msg: "Config created successfully", data });
};

interface ConfigData {
  name: string;
  key: string;
  value: any;
  type: string;
  description: string;
  uid: string;
}
interface getConfigsProps {
  req: {
    query: (key: string) => string;
  };
  json: (
    data: {
      data?: ConfigData[] | null;
      total?: number | null;
      error?: string;
    },
  ) => void;
}
export const getConfigs = async (c: getConfigsProps) => {
  try {
    const id = c.req.query("id");
    const limit = parseInt(c.req.query("limit") || "10", 10);
    const offset = parseInt(c.req.query("offset") || "0", 10);

    if (id) {
      const { data, error } = await supabase
        .from("configs")
        .select("*")
        .eq("uid", id)
        .single();
      if (error) throw new Error(error.message);
      return c.json({ data });
    }

    const { count, error: countError } = await supabase
      .from("configs")
      .select("*", { count: "exact", head: true });
    if (countError) throw new Error(countError.message);

    const { data, error } = await supabase
      .from("configs")
      .select("*")
      .range(
        offset,
        offset + limit - 1,
      );
    if (error) throw new Error(error.message);
    return c.json({ total: count, data });
  } catch (error) {
    return c.json({ error: error.message });
  }
};

interface getConfigProps {
  req: {
    query: (key: string) => string;
  };
  json: (
    data: { data?: ConfigData | null; error?: string },
  ) => void;
}
export const getConfig = async (c: getConfigProps) => {
  const id = c.req.query("id");
  const { data, error } = await supabase
    .from("configs")
    .select("*")
    .eq("uid", id)
    .single();
  console.log("id :>> ", id);
  if (error) throw new Error(error.message);
  return c.json({ data });
};

interface updateConfigProps {
  req: {
    json: () => Promise<{
      name?: string;
      description?: string;
      quantity?: number;
    }>;
    query: (key: string) => string;
  };
  json: (
    data: { msg?: string; data?: ConfigData[] | null; error?: string },
  ) => void;
}
export const updateConfig = async (c: updateConfigProps) => {
  try {
    const id = c.req.query("id");
    const payload = await c.req.json();

    const { data, error } = await supabase
      .from("configs")
      .update(payload)
      .eq("uid", id);

    if (error) throw new Error(error.message);

    return c.json({ msg: "Config updated successfully", data });
  } catch (error) {
    return c.json({ error: error.message });
  }
};

interface deleteConfigProps {
  req: {
    query: (key: string) => string;
  };
  json: (
    data: { msg?: string; data?: ConfigData | null; error?: string },
  ) => void;
}
export const deleteConfig = async (c: deleteConfigProps) => {
  const id = c.req.query("id");

  const { data, error } = await supabase
    .from("configs")
    .delete()
    .eq("uid", id);

  if (error) throw new Error(error.message);

  return c.json({ msg: "Config deleted successfully", data });
};
