export async function POST(req: Request) {
  console.log(req.body);

  return Response.json({ message: "Hello, world!" });
}
