// routes/download.tsx (or any route)
import { LoaderFunction } from "@remix-run/node";
import fs from "fs/promises";
import path from "path";

export const loader: LoaderFunction = async () => {
  const filePath = path.resolve("public/files/Shakeel Haider Resume New.pdf");
  const file = await fs.readFile(filePath);

  return new Response(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="report.pdf"',
    },
  });
};
