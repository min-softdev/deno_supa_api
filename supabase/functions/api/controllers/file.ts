import { supabase } from "../utils/index.ts";

interface createFileProps {
  req: {
    formData: () => Promise<any>;
  };
  json: (
    data: { msg?: string; data?: any; error?: string },
  ) => void;
}
const bucketName = "mdemo_dev";
export const createFile = async (c: createFileProps) => {
  try {
    const formData = await c.req.formData();
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      throw new Error("No files found");
    }

    const uploadResults = [];

    for (const file of files) {
      const filePath = `uploads/${file.name}`;
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file.stream());

      if (error) {
        uploadResults.push({
          file: file.name,
          status: "failed",
          error: error.message,
        });
      } else {
        uploadResults.push({
          file: file.name,
          status: "success",
          path: data.path,
        });
      }
    }

    return c.json({ msg: "Files uploaded successfully", data: uploadResults });
  } catch (error) {
    return c.json({ msg: "Error", error: error.message });
  }
};

interface deleteFileProps {
  req: {
    query: (key: string) => string;
  };
  json: (
    data: { msg?: string; data?: any | null; error?: string },
  ) => void;
}
export const deleteFile = async (c: deleteFileProps) => {
  const file_path = c.req.query("file_path");

  if (!file_path) {
    return c.json({ msg: "File path is required" });
  }

  const file_path_arr = file_path.split(",");

  const { error, ...data } = await supabase.storage.from(bucketName).remove(
    file_path_arr,
  );

  if (error) throw new Error(error.message);

  return c.json({ msg: "File deleted successfully", data });
};
