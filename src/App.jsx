import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import "./App.scss";
import WarehouseList from "./pages/WarehouseList/WarehouseList";
import WarehouseDetails from "./pages/WarehouseDetails/WarehouseDetails";
import WarehouseEdit from "./pages/WarehouseEdit/WarehouseEdit";
import InventoryList from "./pages/InventoryList/InventoryList";
import InventoryDetail from "./pages/InventoryDetail/InventoryDetail";
import InventoryEdit from "./pages/InventoryEdit/InventoryEdit";
// import warehousesJSON from "./warehous.json";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import axios from "axios";

function App() {
  // const [warehouseDetails, setWarehouseDetails] = useState();
  const [warehouseList, setWarehouseList] = useState([]);
  const [inventoryList, setInventoryList] = useState([]);

  const getInventoryList = async () => {
    const response = await axios.get("http://localhost:8080/inventories");
    setInventoryList(response.data);
  };

  const getWarehouseList = async () => {
    const response = await axios.get("http://localhost:8080/warehouses");
    setWarehouseList(response.data);
    console.log(response.data);
    // console.log("hi:", response.data);
  };
  // console.log("lala", warehouseList);

  useEffect(() => {
    void getInventoryList();
    void getWarehouseList();
  }, []);

  function selectWarehouse(id) {
    const selectedWarehouse = warehouseList.find(
      (warehouse) => warehouse.id === id
    );
    setWarehouseList(selectedWarehouse);
  }

  return (
    <div className="app">
      <div className="app__background" />
      <BrowserRouter>
        <div className="content">
          <Header />
          <main className="content__main">
            <Routes>
              <Route
                path="/"
                element={<WarehouseList warehouseList={warehouseList} />}
              />
              <Route
                path="/details/:id"
                element={<WarehouseDetails warehouseList={warehouseList} />}
              />
              <Route path="/edit" element={<WarehouseEdit />} />
              <Route
                path="/inventory/list"
                element={<InventoryList inventoryList={inventoryList} />}
              />
              <Route
                path="/inventory/detail/:id"
                element={<InventoryDetail inventoryList={inventoryList} />}
              />
              <Route path="/inventory/edit/:id" element={<InventoryEdit />} />
              <Route path="/inventory/edit" element={<InventoryEdit />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
