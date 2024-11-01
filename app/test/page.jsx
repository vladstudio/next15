"use client";

import { useState } from "react";

const EditableTable = ({ data, onChange }) => {
  if (!data || data.length === 0) return null;

  // Maintain stable key order in state
  const [keyOrder, setKeyOrder] = useState(Object.keys(data[0]));

  const handleKeyChange = (oldKey, newKey) => {
    // Check if the change would create a duplicate key
    const wouldCreateDuplicate = keyOrder.some((k, idx) => 
      k !== oldKey && k === newKey
    );
    
    // If it would create a duplicate, don't proceed with the change
    if (wouldCreateDuplicate) {
      return;
    }

    const newData = data.map(item => {
      const newItem = {};
      keyOrder.forEach(k => {
        const currentKey = k === oldKey ? newKey : k;
        newItem[currentKey] = item[k === oldKey ? oldKey : k];
      });
      return newItem;
    });
    
    // Update key order while maintaining the same positions
    const newKeyOrder = keyOrder.map(k => k === oldKey ? newKey : k);
    setKeyOrder(newKeyOrder);
    onChange(newData);
  };

  const handleValueChange = (rowIndex, key, value) => {
    const newData = [...data];
    newData[rowIndex] = { ...newData[rowIndex], [key]: value };
    onChange(newData);
  };

  const handleDeleteColumn = (keyToDelete) => {
    const newKeyOrder = keyOrder.filter(k => k !== keyToDelete);
    const newData = data.map(item => {
      const newItem = {};
      newKeyOrder.forEach(k => {
        newItem[k] = item[k];
      });
      return newItem;
    });
    setKeyOrder(newKeyOrder);
    onChange(newData);
  };

  const handleAddColumn = () => {
    // Generate a unique key name
    let newKey = "new_column";
    let counter = 1;
    while (keyOrder.includes(newKey)) {
      newKey = `new_column_${counter}`;
      counter++;
    }

    // Add the new key to keyOrder
    const newKeyOrder = [...keyOrder, newKey];
    
    // Add the new property to all data objects
    const newData = data.map(item => ({
      ...item,
      [newKey]: ""
    }));

    setKeyOrder(newKeyOrder);
    onChange(newData);
  };

  const handleDeleteRow = (rowIndex) => {
    const newData = data.filter((_, index) => index !== rowIndex);
    onChange(newData);
  };

  const handleAddRow = () => {
    // Create a new row with empty values for all current columns
    const newRow = {};
    keyOrder.forEach(key => {
      newRow[key] = "";
    });
    
    const newData = [...data, newRow];
    onChange(newData);
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            {keyOrder.map((key, index) => (
              <td key={index}>
                <button 
                  onClick={() => handleDeleteColumn(key)}
                  disabled={keyOrder.length === 1}
                  style={{ 
                    width: '100%', 
                    marginBottom: '5px',
                    opacity: keyOrder.length === 1 ? 0.5 : 1,
                    cursor: keyOrder.length === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Delete
                </button>
              </td>
            ))}
            <td>
              <button 
                onClick={handleAddColumn}
                style={{ width: '100%', marginBottom: '5px' }}
              >
                Add Column
              </button>
            </td>
          </tr>
          <tr>
            {keyOrder.map((key, index) => (
              <td key={index}>
                <input
                  value={key}
                  onChange={(e) => handleKeyChange(key, e.target.value)}
                />
              </td>
            ))}
            <td></td>
          </tr>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {keyOrder.map((key, colIndex) => (
                <td key={colIndex}>
                  <input
                    value={row[key]}
                    onChange={(e) =>
                      handleValueChange(rowIndex, key, e.target.value)
                    }
                  />
                </td>
              ))}
              <td>
                <button 
                  onClick={() => handleDeleteRow(rowIndex)}
                  disabled={data.length === 1}
                  style={{ 
                    marginLeft: '5px',
                    opacity: data.length === 1 ? 0.5 : 1,
                    cursor: data.length === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Delete Row
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        onClick={handleAddRow}
        style={{ marginTop: '10px' }}
      >
        Add Row
      </button>
    </div>
  );
};

export default function TestPage() {
  const [jsonData, setJsonData] = useState([
    { one: "aaa", two: "bbb" },
    { one: "ccc", two: "ddd" },
    { one: "eee", two: "fff" },
  ]);

  return (
    <div>
      <EditableTable data={jsonData} onChange={setJsonData} />
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
}
