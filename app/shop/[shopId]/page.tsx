export default function Page() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "4px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <img
          key={i}
          src={`https://picsum.photos/300?random=${i}`}
          alt=""
          style={{
            width: "100%",
            aspectRatio: "1",
            objectFit: "cover",
          }}
        />
      ))}
    </div>
  );
}