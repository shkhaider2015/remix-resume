import { ActionFunction, redirect } from "@remix-run/node";
import { createThemeCookie } from "~/utils/theme.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const theme = formData.get("theme");

  if (theme !== "light" && theme !== "dark") {
    return redirect("/");
  }
  const headers = new Headers({ "Set-Cookie": createThemeCookie(theme) });
  const referer = request.headers.get("Referer") || "/";
  return redirect(referer, { headers });
  // return redirect("/", {
  //   headers: {
  //     "Set-Cookie": createThemeCookie(theme),
  //   },
  // });
};
