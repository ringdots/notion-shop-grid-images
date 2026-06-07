import { notion } from "@/lib/notion";

type Props = {
  params: Promise<{
    pageId: string;
  }>;
};

export default async function WidgetPage({
  params,
}: Props) {
  const { pageId } = await params;

  const page: any = await notion.pages.retrieve({
    page_id: pageId,
  });

  const instagram =
    page.properties.instagram?.url;

  return (
    <div
      style={{
        padding: 12,
        fontSize: 14,
      }}
    >
      <h3>Instagram Grid</h3>

      <p>{instagram}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: 4,
        }}
      >
        {Array.from({ length: 9 }).map(
          (_, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "1 / 1",
                background: "#eee",
              }}
            />
          )
        )}
      </div>
    </div>
  );
}