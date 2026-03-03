import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");
  const url = searchParams.get("url");
  const status = searchParams.get("status");

  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  if (!url) {
    return new Response("Missing url parameter", { status: 400 });
  }

  const draft = await draftMode();

  if (status === "published") {
    draft.disable();
  } else {
    draft.enable();
  }

  redirect(url);
}
