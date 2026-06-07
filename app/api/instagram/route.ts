import { chromium } from "playwright";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const instagram =
    searchParams.get("instagram");

  if (!instagram) {
    return Response.json(
      { error: "instagram required" },
      { status: 400 }
    );
  }

  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.goto(instagram, {
    waitUntil: "networkidle",
  });

  const thumbnails = await page.$$eval(
    'a[href*="/p/"] img',
    (imgs) =>
      imgs.slice(0, 9).map((img) => ({
        src: (img as HTMLImageElement).src,
        alt: (img as HTMLImageElement).alt,
      }))
  );

  await browser.close();

  return Response.json({
    thumbnails,
  });
}