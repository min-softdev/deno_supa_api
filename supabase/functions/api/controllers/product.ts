import { supabase } from "../utils/index.ts";

interface ProductPayload {
  name: string;
  description: string;
  quantity: number;
}
interface createProductProps {
  req: {
    json: () => Promise<ProductPayload>;
  };
  json: (
    data: { msg: string; data?: ProductPayload | null; error?: string },
  ) => void;
}
export const createProduct = async (c: createProductProps) => {
  const payload = await c.req.json();

  const { data, error } = await supabase
    .from("products")
    .insert([payload]);

  if (error) throw new Error(error.message);

  return c.json({ msg: "Product created successfully", data });
};

interface ProductData {
  name: string;
  description: string;
  quantity: number;
  uid: string;
}
interface getProductsProps {
  req: {
    query: (key: string) => string;
  };
  json: (
    data: {
      data?: ProductData[] | null;
      total?: number | null;
      error?: string;
    },
  ) => void;
}
export const getProducts = async (c: getProductsProps) => {
  try {
    const id = c.req.query("id");
    const limit = parseInt(c.req.query("limit") || "10", 10);
    const offset = parseInt(c.req.query("offset") || "0", 10);

    if (id) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("uid", id)
        .single();
      if (error) throw new Error(error.message);
      return c.json({ data });
    }

    const { count, error: countError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });
    if (countError) throw new Error(countError.message);

    const { data, error } = await supabase
      .from("products")
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

interface getProductProps {
  req: {
    query: (key: string) => string;
  };
  json: (
    data: { data?: ProductData | null; error?: string },
  ) => void;
}
export const getProduct = async (c: getProductProps) => {
  const id = c.req.query("id");
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("uid", id)
    .single();
  console.log("id :>> ", id);
  if (error) throw new Error(error.message);
  return c.json({ data });
};

interface updateProductProps {
  req: {
    json: () => Promise<{
      name?: string;
      description?: string;
      quantity?: number;
    }>;
    query: (key: string) => string;
  };
  json: (
    data: { msg?: string; data?: ProductData[] | null; error?: string },
  ) => void;
}
export const updateProduct = async (c: updateProductProps) => {
  try {
    const id = c.req.query("id");
    const payload = await c.req.json();

    const { data, error } = await supabase
      .from("products")
      .update(payload)
      .eq("uid", id);

    if (error) throw new Error(error.message);

    return c.json({ msg: "Product updated successfully", data });
  } catch (error) {
    return c.json({ error: error.message });
  }
};

interface deleteProductProps {
  req: {
    query: (key: string) => string;
  };
  json: (
    data: { msg?: string; data?: ProductData | null; error?: string },
  ) => void;
}
export const deleteProduct = async (c: deleteProductProps) => {
  const id = c.req.query("id");

  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("uid", id);

  if (error) throw new Error(error.message);

  return c.json({ msg: "Product deleted successfully", data });
};
