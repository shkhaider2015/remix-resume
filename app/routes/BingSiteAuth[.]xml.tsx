
export const loader = () => {

  const content = `
        <users>
	        <user>07B20D201CA84FDD3652BA3812A08DDF</user>
        </users>
      `;
  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
