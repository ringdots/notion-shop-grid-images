import { notion } from "@/lib/notion";
import { chromium } from "playwright-core";
import chromiumPkg from "@sparticuz/chromium";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const pageId = searchParams.get("pageId");

  if (!pageId) {
    return Response.json(
      { error: "pageId required" },
      { status: 400 }
    );
  }

  const item: any =
    await notion.pages.retrieve({
      page_id: pageId,
    });

  const instagram =
    item.properties.instagram?.url;

  if (!instagram) {
    return Response.json(
      { error: "instagram not found" },
      { status: 400 }
    );
  }

  const browser = await chromium.launch({
    args: chromiumPkg.args,
    executablePath:
      await chromiumPkg.executablePath(),
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.goto(instagram, {
      waitUntil: "networkidle",
    });

    const thumbnails =
      await page.$$eval(
        'a[href*="/p/"] img',
        (imgs) =>
          imgs
            .slice(0, 9)
            .map(
              (img) =>
                (
                  img as HTMLImageElement
                ).src
            )
      );

    await notion.pages.update({
      page_id: pageId,

      properties: {
        thumbnail_1: {
          url: thumbnails[0] ?? null,
        },
        thumbnail_2: {
          url: thumbnails[1] ?? null,
        },
        thumbnail_3: {
          url: thumbnails[2] ?? null,
        },
        thumbnail_4: {
          url: thumbnails[3] ?? null,
        },
        thumbnail_5: {
          url: thumbnails[4] ?? null,
        },
        thumbnail_6: {
          url: thumbnails[5] ?? null,
        },
        thumbnail_7: {
          url: thumbnails[6] ?? null,
        },
        thumbnail_8: {
          url: thumbnails[7] ?? null,
        },
        thumbnail_9: {
          url: thumbnails[8] ?? null,
        },
      },
    });

    return Response.json({
      success: true,
      count: thumbnails.length,
    });
  } finally {
    await browser.close();
  }
}



// export async function GET() {
//   const result = await notion.dataSources.query({
//     data_source_id: process.env.NOTION_DATABASE_ID!,
//   });

//     const browser = await chromium.launch({
//     args: chromiumPkg.args,
//     executablePath: await chromiumPkg.executablePath(),
//     headless: true,
//     });

//   for (const item of result.results as any[]) {
//     const instagram =
//       item.properties.instagram?.url;

//     if (!instagram) continue;

//     const page = await browser.newPage();

//     await page.goto(instagram, {
//       waitUntil: "networkidle",
//     });

//     const thumbnails = await page.$$eval(
//       "img",
//       (imgs) =>
//         imgs
//           .slice(0, 9)
//           .map(
//             (img) =>
//               (img as HTMLImageElement).src
//           )
//     );

//     await page.close();

//     await notion.pages.update({
//       page_id: item.id,

//         properties: {
//             thumbnail_1: { url: thumbnails[0] ?? null },
//             thumbnail_2: { url: thumbnails[1] ?? null },
//             thumbnail_3: { url: thumbnails[2] ?? null },
//             thumbnail_4: { url: thumbnails[3] ?? null },
//             thumbnail_5: { url: thumbnails[4] ?? null },
//             thumbnail_6: { url: thumbnails[5] ?? null },
//             thumbnail_7: { url: thumbnails[6] ?? null },
//             thumbnail_8: { url: thumbnails[7] ?? null },
//             thumbnail_9: { url: thumbnails[8] ?? null }
//         }
//     });
//   }

//   await browser.close();

//   return Response.json({
//     success: true,
//   });
// }