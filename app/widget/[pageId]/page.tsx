import { notion } from "@/lib/notion";

export default async function WidgetPage({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;

  const page: any = await notion.pages.retrieve({
    page_id: pageId,
  });

  const instagram =
    page.properties.instagram?.url;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/instagram?instagram=${encodeURIComponent(
      instagram
    )}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3,1fr)",
          gap: 2,
        }}
      >
        {data.thumbnails?.map(
          (thumb: any, i: number) => (
            <img
            key={i}
            src={`/api/image?url=${encodeURIComponent(
            thumb.src
            )}`}
            alt={thumb.alt}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            loading="lazy"
            style={{
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "cover",
            }}
            />
          )
        )}
      </div>
    </div>
  );
}