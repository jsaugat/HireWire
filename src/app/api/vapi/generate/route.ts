export async function GET() {
  return Response.json({ success: true, data: "Hello, World!" }, { status: 200 });
}