export default function DescriptionBox({ description, isChanged }) {
  return (
    <div className={`description-box ${isChanged ? "changed" : ""}`}>
      <p>{description}</p>
    </div>
  );
}
