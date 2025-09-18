import React, { useState, useMemo } from "react";
// You have been given a list of items you shopped from the grocery store
// You need to calculate the total amount of money you spent

export const Assignment3 = () => {
  const [items, setItems] = useState([
    { name: "Chocolates", value: 10 },
    { name: "Chips", value: 20 },
    { name: "Onion", value: 30 },
    { name: "Tomato", value: 30 },
    // Add more items as needed
  ]);

  const [itemName, setItemName] = useState("");
  const [itemValue, setItemValue] = useState("");

  // Your code starts here
  const totalValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [items]);
  // Your code ends here

  function AddItem(){
    const newItem = {
      name: itemName,
      value: Number(itemValue),
    };
    setItems([...items,newItem]);
    setItemName("");
    setItemValue("");
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Add Items"
        onChange={function (e) {
          setItemName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Add Item Value"
        onChange={function (e) {
          setItemValue(e.target.value);
        }}
      />
      <button onClick={AddItem}>Add Items</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - Price: ${item.value}
          </li>
        ))}
      </ul>
      <p>Total Value: {totalValue}</p>
    </div>
  );
};
