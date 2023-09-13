import { useState } from "react";
import { Stats } from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);
  function handleadditems(item) {
    setItems((items) => [...items, item]);
  }
  function handledeleteitems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handlechangeitem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleresetitems() {
    setItems((items) => []);
  }

  return (
    <div className="app">
      <Logo />
      <Form onadditems={handleadditems} />
      <PackingList
        items={items}
        ondeleteitems={handledeleteitems}
        onupdateitems={handlechangeitem}
        onresetitems={handleresetitems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1> TODO LIST</h1>
    </div>
  );
}
function Form({ onadditems }) {
  const [description, setDesc] = useState("");
  const [quantity, setNo] = useState(1);

  function addnew(e) {
    e.preventDefault();
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    if (!description) return;
    onadditems(newItem);

    setDesc((s) => (s = ""));
    setNo((n) => (n = 1));
  }
  return (
    <form className="add-form" onSubmit={addnew}>
      <h3> What do you need for your 😍 day?</h3>
      <select value={quantity} onChange={(e) => setNo(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item....."
        value={description}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      ></input>
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, ondeleteitems, onupdateitems, onresetitems }) {
  const [sortby, setSortby] = useState("input");
  let sortedItems;
  if (sortby === "input") sortedItems = items;
  if (sortby === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  console.log(sortby);
  if (sortby === "quantity")
    sortedItems = items.slice().sort((a, b) => b.quantity - a.quantity);
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            ondeleteitems={ondeleteitems}
            onupdateitems={onupdateitems}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortby} onChange={(e) => setSortby(e.target.value)}>
          <option value="input">sort by input</option>
          <option value="description">sort by description</option>
          <option value="quantity">sort by packed</option>
        </select>
        <button className="add-form" onClick={onresetitems}>
          reset
        </button>
      </div>
    </div>
  );
}

function Item({ item, ondeleteitems, onupdateitems }) {
  // const [check, setCheck] = useState(item.packed);
  // console.log(item);
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onupdateitems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => ondeleteitems(item.id)}>❌</button>
    </li>
  );
}
