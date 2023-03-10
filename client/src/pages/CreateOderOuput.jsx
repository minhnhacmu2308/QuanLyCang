import { useState, useEffect, useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer/index";
import MenuLeft from "../components/MenuLeft";
import { addOrderNew } from "../utils/orderUtils";
import Toast from "../components/Toast";
import { generateId } from "../utils/utils.js";
import { useNavigate } from "react-router-dom";

let valuePackage = [];
function CreateOrderOutput() {
  const data = useLoaderData();
  console.log("HOme", data);
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(() => data.data.orders);
  const [drivers, setDrivers] = useState(() => data.drivers.data.drivers);
  const [vehicles, setVehicles] = useState(() => data.vehicles.data.vehicles);
  const [warehouses, setWarehouses] = useState(
    () => data.warehouses.data.data.warehouses
  );
  const [transequipments, setTransequipments] = useState(
    () => data.transequipments.data.transequipments
  );
  const [containers, setContainers] = useState(
    () => data.containers.data.containers
  );
  const [products, setProducts] = useState(
    () => data.products.data.data.Products
  );
  const [customers, setCustomers] = useState(
    () => data.customers?.data?.customers
  );
  const [packages, setPackages] = useState(() => data.packages.data.packages);
  const [fields, setFields] = useState({});
  const [orderInput, setOrderInput] = useState([]);
  const [containerValues, setContainerValues] = useState([]);
  const [packageValues, setPackageValues] = useState([]);
  const [productValues, setProductValues] = useState([]);
  const [activeContainer, setActiveContainer] = useState(true);
  const [activePackage, setActivePackage] = useState(true);
  const [activeWarehouse, setActiveWarehouse] = useState(false);
  const [toastData, setToastData] = useState({
    color: "",
    title: "",
    type: "",
  });
  const [alertState, setAlertState] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertState(false);
  };

  const handleOpen = (params) => {
    const data = {
      color: params.color,
      title: params.title,
      type: params.type,
    };
    setToastData(data);
    setAlertState(true);
  };
  const handleChange = (e) => {
    console.log("e", e.target.options);
    // if (e.target.name === "containerId" && e.target.value != "") {
    //   setActivePackage(true);
    // }
    fields[e.target.name] = e.target.value;
    setFields(fields);
    if (fields["type"] == "C?? l??u tr???") {
      setActiveWarehouse(true);
    } else {
      setActiveWarehouse(false);
    }
    console.log("fields", fields);
  };
  const handleChangePackage = (e) => {
    var options = e.target.options;
    console.log("options", options);
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        for (let j = 0; j < packages.length; j++) {
          if (options[i].value === packages[j]._id) {
            value.push({
              _id: products[j]._id,
              name: packages[j].name,
              size: packages[j].size,
            });
          }
        }
      }
    }
    console.log("value", value);
    setOrderInput(value);
    setPackageValues(value);
    console.log("value", orderInput);
  };
  const handleChangeProduct = (e, packageId, packageName, packageSize) => {
    console.log("e", e.target.value);
    console.log("packageId", packageId);
    console.log("packageName", packageName);
    console.log("packageSize", packageSize);
    for (let j = 0; j < packageValues.length; j++) {
      if (packageValues[j]._id == packageId) {
        for (let k = 0; k < products.length; k++) {
          if (e.target.value === products[k]._id) {
            packageValues[j]["product"] = {
              _id: products[k]._id,
              name: products[k].name,
            };
          }
        }
      }
    }
    setPackageValues(packageValues);
    console.log("packageValues", packageValues);
  };
  const onChangeNext1 = () => {
    if (packageValues.length == 0) {
      handleOpen({
        color: "red",
        title: `C???n ch???n th??ng g???`,
        type: "error",
      });
    } else {
      setActiveContainer(false);
    }
  };
  const onChangeNext2 = () => {
    if (packageValues.length == 0) {
      handleOpen({
        color: "red",
        title: `C???n ch???n th??ng g???`,
        type: "error",
      });
    } else {
      setActivePackage(false);
    }
  };
  const onChangeNext3 = () => {
    fields["orderInput"] = { packages: packageValues };
  };
  const onSubmit = async () => {
    console.log("fields", fields);
    fields["orderInput"] = packageValues;
    if (
      fields["shipFrom"] == null ||
      fields["shipTo"] == null ||
      fields["orderInput"].length == 0 ||
      fields["vehicleId"] == null ||
      fields["customerId"] == null ||
      fields["driverId"] == null ||
      fields["transequipmentId"] == null ||
      fields["receivingDate"] == null ||
      fields["loadingDate"] == null ||
      fields["finishTime"] == null ||
      fields["description"] == null
    ) {
      handleOpen({
        color: "red",
        title: `C???n ??i???n ?????y ????? th??ng tin`,
        type: "error",
      });
    } else {
      const code = generateId(20);
      fields["typeInput"] = "Xu???t h??ng";
      fields["receiptNo"] = code;
      setFields(fields);
      console.log("fineal", fields);
      let data = await addOrderNew(fields);
      console.log("data", data);
      handleOpen({
        color: "#009933",
        title: `Th??m th??nh c??ng`,
        type: "success",
      });
      navigate("/order-output");
    }
  };

  return (
    <body className="sb-nav-fixed">
      <Header />
      <Toast
        toastData={toastData}
        open={alertState}
        handleClose={() => handleClose()}
      />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <MenuLeft />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Xu???t h??ng</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Xu???t h??ng</li>
              </ol>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Ch???n kh??ch h??ng:<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      class="form-select"
                      name="customerId"
                      onChange={(e) => handleChange(e)}
                      required
                    >
                      <option value="" selected>
                        Ch???n kh??ch h??ng
                      </option>
                      {customers.map((option) => (
                        <option value={option._id}>{option.fullName}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Ch???n t??i x???:<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      class="form-select"
                      name="driverId"
                      onChange={(e) => handleChange(e)}
                      required
                    >
                      <option value="" selected>
                        Ch???n t??i x???
                      </option>
                      {drivers.map((option) => (
                        <option value={option._id}>{option.fullName}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Thi???t b??? v???n chuy???n:{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      class="form-select"
                      name="transequipmentId"
                      onChange={(e) => handleChange(e)}
                      required
                    >
                      <option value="" selected>
                        Ch???n thi???t b??? v???n chuy???n
                      </option>
                      {transequipments.map((option) => (
                        <option value={option._id}>{option.type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Ph????ng ti???n:<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      class="form-select"
                      name="vehicleId"
                      onChange={(e) => handleChange(e)}
                      required
                    >
                      <option value="" selected>
                        Ch???n ph????ng ti???n
                      </option>
                      {vehicles.map((option) => (
                        <option value={option._id}>{option.type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      V???n chuy???n t???:
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="shipFrom"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      id="exampleFormControlInput1"
                      placeholder="V???n chuy???n t???"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      V???n chuy???n ?????n:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="shipTo"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      id="exampleFormControlInput1"
                      placeholder="V???n chuy???n ?????n"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Ng??y nh???n: <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="date"
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name"
                      name="receivingDate"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Ng??y t???i:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="date"
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name"
                      name="loadingDate"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Th???i gian k???t th??c:{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="date"
                      onChange={(e) => handleChange(e)}
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name"
                      name="finishTime"
                    />
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginBottom: "10px" }}>
                <div className="col-md-12">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      M?? t???: <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="story"
                      onChange={(e) => handleChange(e)}
                      name="description"
                      rows="5"
                      cols="33"
                    ></textarea>
                  </div>
                </div>
              </div>
              <span style={{ fontWeight: "bold" }}>NH???P CHI TI???T : </span>
              <span style={{ color: "red" }}>*</span>
              {activeContainer ? (
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label for="exampleFormControlInput1">
                        Ch???n th??ng g???: <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        class="form-select"
                        onChange={(e) => handleChangePackage(e)}
                        multiple
                        name="packageId"
                        required
                      >
                        <option value="" selected>
                          Ch???n th??ng g???
                        </option>
                        {packages.map((option) => (
                          <option value={option._id}>
                            {option.name} -{" "}
                            {option.size == "1"
                              ? "Nh??? - 200 s???n ph???m"
                              : option.size == "2"
                              ? "V???a - 500 s???n ph???m "
                              : "L???n - 1000 s???n ph???m"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4" style={{ margin: "auto" }}>
                    <div className="form-group">
                      <button
                        className="btn btn-primary"
                        onClick={() => onChangeNext1()}
                      >
                        Ti???p
                      </button>
                    </div>
                  </div>
                </div>
              ) : activePackage ? (
                <div className="row">
                  <div className="col-md-10">
                    {packageValues.map((value, index) => {
                      return (
                        <div
                          className="row"
                          style={{
                            border: "1px solid #DDDDDD",
                            marginBottom: "10px",
                            padding: "5px",
                          }}
                        >
                          <div className="col-md-6">
                            <div className="form-group">
                              <p
                                style={{
                                  fontWeight: "bold",
                                  marginTop: "50px",
                                }}
                              >
                                {index + 1} : {value.name} -{" "}
                                {value.size == "1"
                                  ? "Nh??? - 200 s???n ph???m"
                                  : value.size == "2"
                                  ? "V???a - 500 s???n ph???m "
                                  : "L???n - 1000 s???n ph???m"}
                              </p>
                            </div>
                          </div>
                          <div
                            className="col-md-6"
                            style={{
                              borderLeft: "1px solid #DDDDDD",
                            }}
                          >
                            <div className="form-group">
                              <label for="exampleFormControlInput1">
                                Ch???n s???n ph???m:{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                class="form-select"
                                onChange={(e) =>
                                  handleChangeProduct(
                                    e,
                                    value._id,
                                    value.name,
                                    value.size
                                  )
                                }
                                name="productId"
                                required
                              >
                                <option value="" selected>
                                  Ch???n s???n ph???m
                                </option>
                                {products.map((option) => (
                                  <option value={option._id}>
                                    {option.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {/* <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      S???n ph???m:<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      class="form-select"
                      name="vehicleId"
                      multiple
                      onChange={(e) => handleChangeProduct(e)}
                      required
                    >
                      <option value="" selected>
                        Ch???n s???n ph???m
                      </option>
                      {products.map((option) => (
                        <option value={option._id}>{option.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="col-md-1" style={{ margin: "20px" }}>
              <div className="form-group">
                <button className="btn btn-primary" onClick={() => onSubmit()}>
                  Xu???t
                </button>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </body>
  );
}

export default CreateOrderOutput;
