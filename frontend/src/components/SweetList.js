function SweetList({ sweets, onDelete }) {
  return (
    <ul>
      {sweets.map((sweet) => (
        <li key={sweet.id} style={{ marginBottom: "0.5rem" }}>
          <strong>{sweet.name}</strong> - {sweet.flavor}
          <button
            onClick={() => onDelete(sweet.id)}
            style={{ marginLeft: "1rem" }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SweetList;
