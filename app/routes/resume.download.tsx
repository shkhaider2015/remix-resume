// routes/download.tsx (or any route)
import { LoaderFunction } from "@remix-run/node";
import fs from "fs/promises";
import path from "path";

export const loader: LoaderFunction = async () => {
  const filePath = path.resolve("public/files/shakeel-haider-resume.pdf");
  const file = await fs.readFile(filePath);

  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="shakeel-haider-resume.pdf"',
      // Prevent Google from indexing this endpoint as a web page
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
};
