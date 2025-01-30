import { BASE_URL } from "~/assets/constants";

export const loader = () => {
  const base_url = BASE_URL;
  // handle "GET" request
  // set up our text content that will be returned in the response
  const robotText = `User-agent: Googlebot
Disallow: /nogooglebot/
User-agent: *
Allow: /
Sitemap: ${base_url}/sitemap.xml
`;
  // return the text content, a status 200 success response, and set the content type to text/plain
  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
