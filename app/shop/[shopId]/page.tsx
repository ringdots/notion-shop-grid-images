import { notion } from "@/lib/notion";

export default async function Page() {
  const result = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DATABASE_ID!,
  });

  return (
    <div>
      {result.results.map((item: any) => (
        <div key={item.id}>
          <h2>
            {item.properties["이름"].title[0]?.plain_text}
          </h2>

          <a
            href={item.properties.instagram.url}
            target="_blank"
          >
            Instagram
          </a>
        </div>
      ))}
    </div>
  );
}