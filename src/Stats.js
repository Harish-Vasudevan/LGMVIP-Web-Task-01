export function Stats({ items }) {
  if (items.length === 0)
    return (
      <footer className="stats">
        <em>Start a day 🚀</em>
      </footer>
    );

  const total = items.length;
  const completed = items.filter((item) => item.packed).length;
  const percentage = Math.round((completed / total) * 100);
  return (
    <footer className="stats">
      <em>
        🎒 you have {total} items on your list, and you already packed
        {completed}({percentage})
      </em>
    </footer>
  );
}
