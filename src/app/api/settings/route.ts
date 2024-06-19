import { handleGetRequest } from "./get";
import { handlePostRequest } from "./post";

// Main handler function
async function handler(
  req: Request,
) {
  if (req.method === "POST") {
    const dat = await handlePostRequest(req);
    return dat;
  } else if (req.method === "GET") {
    const dat = await handleGetRequest();
    return dat;
  } else {
    return Response.json({ message: `Method ${req.method} not allowed` }, {status: 405});
  }
}

export { handler as GET, handler as POST };
