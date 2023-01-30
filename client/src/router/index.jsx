import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home.jsx";
import Category from "../pages/Category";
import Unit from "../pages/Unit";
import { categoryLoader } from "../utils/categoryUtils";
import { warehouseLoader } from "../utils/warehouseUtils";
import { unitLoader } from "../utils/unitUtils";
import { packageLoader } from "../utils/packageUtils";
import { containerLoader } from "../utils/containerUtils";
import { vehicleLoader } from "../utils/vehicleUtil";
import { orderLoader } from "../utils/orderUtils";
import { driverLoader, customerLoader, userLoader } from "../utils/userUtils";
import { manufacturerLoader } from "../utils/manufacturerUtils";
import { productLoader } from "../utils/productUtils";
import { transequipmentLoader } from "../utils/transequipmentUtills";
import Manufacturer from "../pages/manufacturer";
import Vehicle from "../pages/Vehicle";
import Transequipment from "../pages/Transequipment";
import Product from "../pages/Product";
import Warehouse from "../pages/Warehouse";
import Package from "../pages/Package";
import Container from "../pages/Container";
import Order from "../pages/Order";
import Driver from "../pages/Driver";
import Customer from "../pages/Customer";
import User from "../pages/User";
import ChangePassword from "../pages/ChangePassword";
import Profile from "../pages/Profile";
import CreateOder from "../pages/CreateOder";
import AuthProvider from "../context/AuthProvider";
import path from "path";

const AuthLayout = () => {
  return (
    <AuthProvider>
      {" "}
      <Outlet />
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <Category />,
        path: "/category",
        loader: categoryLoader,
      },
      {
        element: <Unit />,
        path: "/unit",
        loader: unitLoader,
      },
      {
        element: <ChangePassword />,
        path: "/change-password",
      },
      {
        element: <Manufacturer />,
        path: "/manufacturer",
        loader: manufacturerLoader,
      },
      {
        element: <Vehicle />,
        path: "/vehicle",
        loader: vehicleLoader,
      },
      {
        element: <Transequipment />,
        path: "/Transequipment",
        loader: transequipmentLoader,
      },
      {
        element: <Warehouse />,
        path: "/warehouse",
        loader: warehouseLoader,
      },
      {
        element: <Package />,
        path: "/package",
        loader: packageLoader,
      },
      {
        element: <Container />,
        path: "/container",
        loader: containerLoader,
      },
      {
        element: <Driver />,
        path: "/driver",
        loader: driverLoader,
      },
      {
        element: <Customer />,
        path: "/customer",
        loader: customerLoader,
      },
      {
        element: <User />,
        path: "/employee",
        loader: userLoader,
      },
      {
        element: <Profile />,
        path: "/profile",
      },
      {
        element: <Product />,
        path: "/product",
        loader: productLoader,
      },
      {
        element: <Order />,
        path: "/order-input",
        loader: orderLoader,
      },
      {
        element: <CreateOder />,
        path: "/create-order",
        loader: orderLoader,
      },
    ],
  },
]);
