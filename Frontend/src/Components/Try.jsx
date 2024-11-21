import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import busstop from './Routes.json';

function App() {


   




  const productList = [
    "blue pant",
    "black pant",
    "blue shirt",
    "black shoes",
    "brown shoes",
    "white pant",
    "white shoes",
    "red shirt",
    "gray pant",
    "white shirt",
    "golden shoes",
    "dark pant",
    "pink shirt",
    "yellow pant"
  ];

  const [searched, setSearched] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [isSearching, setIsSearching] = useState(true);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchVal(value);

    if (value.trim() === "") {
      setSearched([]); // Clear suggestions if input is empty
      return;
    }

    if (isSearching) {
      const filteredProducts = productList.filter((product) =>
        product.toLowerCase().includes(value.toLowerCase())
      );
      setSearched(filteredProducts);
    }
  };

  const handleSelect = (item) => {
    setSearchVal(item); // Set the selected value to the input
    setSearched([]); // Clear suggestions
    setIsSearching(false); // Stop further searching
  };
  const busStops = {
    "Medchal Bus Stop": [
      "Dabilpur",
      "Medchal Checkpost",
      "CMR college",
      "Gundlapochampally"
    ],
    "Dabilpur": [
      "Medchal Bus Stop",
      "Medchal Checkpost",
      "CMR college",
      "Gundlapochampally"
    ]
  };
  
  // Function to add prices to each route
  function addPrices(data) {
    const updatedData = {};
  
    for (const [stop, destinations] of Object.entries(data)) {
      updatedData[stop] = destinations.map((destination, index) => {
        return {
          destination: destination,
          price: (index + 1) * 5 // Example price logic: Increment by 10 for each destination
        };
      });
    }
  
    return updatedData;
  }
  
  const updatedBusStops = addPrices(busstop);
  console.log(updatedBusStops);
  








  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="text"
          value={searchVal}
          onChange={handleInputChange}
          placeholder="Search products..."
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        <BsSearch />
      </div>
      {searched.length > 0 && isSearching && (
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            marginTop: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "200px",
            overflowY: "auto"
          }}
        >
          {searched.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              style={{
                padding: "10px",
                cursor: "pointer",
                background: "#f9f9f9",
                borderBottom: "1px solid #eee"
              }}
              onMouseOver={(e) => (e.target.style.background = "#e0e0e0")}
              onMouseOut={(e) => (e.target.style.background = "#f9f9f9")}
            >
              {item}
            </li>
          ))}
        </ul>
      )}








    </div>
  );
}

export default App;
