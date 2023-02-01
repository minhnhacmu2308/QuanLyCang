import { useState, useEffect, useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { useLoaderData, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer/index";
import MenuLeft from "../components/MenuLeft";
import OrderTable from "../components/Order/OrderTable";
import { orderByWarehouse } from "../utils/orderUtils";

function OrderByWarehouse() {
  const { id } = useParams();
  const [data, setData] = useState();
  console.log("id", id);

  useEffect(() => {
    console.log("cghec");
    async function getOrderDetail() {
      console.log("cghec");
      const order = await orderByWarehouse(id);
      console.log("order", order);
      setData(order.data.order);
    }
    getOrderDetail();
  }, []);
  return (
    <body className="sb-nav-fixed">
      <Header />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <MenuLeft />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Đơn hàng</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Đơn hàng</li>
              </ol>
            </div>
            <div className="container">
              <OrderTable props={data} />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </body>
  );
}

export default OrderByWarehouse;
