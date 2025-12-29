export const loader = async () => {
  const data = {
    // Your JSON configuration here
    "name": "DevTools JSON Configuration",
    "application": "Chrome DevTools",
    "version": "1.0",
    "target": "devtools"
  };

  return Response.json(data, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
