import { useState, useEffect, useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer/index";
import MenuLeft from "../components/MenuLeft";
import { addOrder } from "../utils/orderUtils";
import Toast from "../components/Toast";
import { generateId } from "../utils/utils.js";
import { useNavigate } from "react-router-dom";

let valuePackage = [];
function CreateOder() {
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
    if (fields["type"] == "Lưu trữ") {
      setActiveWarehouse(true);
    } else {
      setActiveWarehouse(false);
    }
    console.log("fields", fields);
  };
  const handleChangeContainer = (e) => {
    var options = e.target.options;
    console.log("options", options);
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        for (let j = 0; j < containers.length; j++) {
          if (options[i].value === containers[j]._id) {
            value.push(containers[j]);
          }
        }
      }
    }
    console.log("value", value);
    setContainerValues(value);
  };

  const handleChangePackage = (e, idContainer, nameContainer) => {
    var options = e.target.options;
    console.log("idContainer", idContainer);
    var arrContainerId = [];
    let data = {
      containerId: idContainer,
      name: nameContainer,
      packages: [],
    };
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        for (let j = 0; j < packages.length; j++) {
          if (options[i].value === packages[j]._id) {
            console.log("check");
            data.packages.push(packages[j]);
          }
        }
      }
    }
    console.log("data", data);

    if (valuePackage.length == 0 || !arrContainerId.includes(idContainer)) {
      for (var k = 0; k < valuePackage.length; k++) {
        arrContainerId.push(valuePackage[k].containerId);
        if (valuePackage[k].containerId === idContainer) {
          valuePackage[k].packages = data.packages;
          setOrderInput(valuePackage);

          console.log("orderInput", orderInput);
          setPackageValues(valuePackage);
          return;
        }
      }
      valuePackage.push(data);
    }

    console.log("packages", valuePackage);

    // if (valuePackage.length == 0 || !arrContainerId.includes(idContainer)) {
    //   valuePackage.push(data);
    // }
    setOrderInput(valuePackage);

    console.log("orderInput", orderInput);
    setPackageValues(valuePackage);
  };

  const onChangeProduct = (
    e,
    idContainer,
    nameContainer,
    idPackage,
    namePackage
  ) => {
    var options = e.target.options;
    console.log("options", options);
    console.log("idContainer", idContainer);
    console.log("nameContainer", nameContainer);
    console.log("idPackage", idPackage);
    console.log("namePackage", namePackage);
    console.log("orderInput", orderInput);
    var productList = [];
    let packageList = [];
    valuePackage = orderInput;
    for (let i = 0; i < orderInput.length; i++) {
      if (orderInput[i].containerId === idContainer) {
        console.log("orderInput[i]", orderInput[i]);
        let sizePackage = orderInput[i].packages.length;
        for (let j = 0; j < sizePackage; j++) {
          console.log(
            "orderInput[i].packages[j].containerId",
            orderInput[i].packages[j].containerId
          );
          if (orderInput[i].packages[j]._id === idPackage) {
            console.log(
              "valuePackage[i].packages[j]._id",
              orderInput[i].packages[j]._id
            );
            // let data = {

            // }
            console.log("valuePackage[i]", orderInput[i]);
            for (let k = 0; k < options.length; k++) {
              if (options[k].selected) {
                // productList.push({ _id: options[k].value });
                for (let h = 0; h < products.length; h++) {
                  if (options[k].value === products[h]._id) {
                    productList.push({
                      _id: products[h]._id,
                      name: products[h].name,
                    });
                  }
                }
              }
            }
            let abc = orderInput[i].packages[j];
            console.log("abc", abc);
            abc.products = productList;
            break;
          }
        }
      }
    }
    console.log("orderInput222", valuePackage);
    setOrderInput(orderInput);
  };
  const onChangeNext1 = () => {
    if (valuePackage.length == 0 && containerValues.length == 0) {
      handleOpen({
        color: "red",
        title: `Cần chọn thùng container`,
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
        title: `Cần chọn thùng gỗ`,
        type: "error",
      });
    } else {
      setActivePackage(false);
    }
  };
  const onChangeNext3 = () => {
    fields["orderInput"] = orderInput;
  };
  const onSubmit = async () => {
    console.log("fields", fields);
    fields["orderInput"] = orderInput;
    console.log("1aa", fields["orderInput"]["containers"]);
    if (fields["type"] == "Không lưu trữ") {
      fields["warehouseId"] = "null";
    }
    if (
      fields["shipFrom"] == null ||
      fields["shipTo"] == null ||
      fields["type"] == null ||
      fields["orderInput"].length == 0 ||
      fields["warehouseId"] == null ||
      fields["vehicleId"] == null ||
      fields["driverId"] == null ||
      fields["transequipmentId"] == null ||
      fields["receivingDate"] == null ||
      fields["loadingDate"] == null ||
      fields["finishTime"] == null ||
      fields["description"] == null
    ) {
      handleOpen({
        color: "red",
        title: `Cần điền đầy đủ thông tin`,
        type: "error",
      });
    } else {
      const code = generateId(20);
      fields["typeInput"] = "Nhập hàng";
      fields["receiptNo"] = code;
      setFields(fields);
      let data = await addOrder(fields);
      console.log("data", data);
      handleOpen({
        color: "#009933",
        title: `Thêm thành công`,
        type: "success",
      });
      navigate("/order-input");
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
              <h1 className="mt-4">Tạo đơn hàng</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Tạo đơn hàng</li>
              </ol>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Loại nhập hàng hóa:{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      class="form-select"
                      name="type"
                      onChange={(e) => handleChange(e)}
                      required
                    >
                      <option value="">Chọn loại</option>
                      <option value="Lưu trữ">Lưu trữ</option>
                      <option value="Không lưu trữ">Không lưu trữ</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Chọn tài xế:<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      class="form-select"
                      name="driverId"
                      onChange={(e) => handleChange(e)}
                      required
                    >
                      <option value="" selected>
                        Chọn tài xế
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
                      Thiết bị vận chuyển:{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      class="form-select"
                      name="transequipmentId"
                      onChange={(e) => handleChange(e)}
                      required
                    >
                      <option value="" selected>
                        Chọn thiết bị vận chuyển
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
                      Phương tiện:<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      class="form-select"
                      name="vehicleId"
                      onChange={(e) => handleChange(e)}
                      required
                    >
                      <option value="" selected>
                        Chọn phương tiện
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
                      Vận chuyển từ:
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="shipFrom"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      id="exampleFormControlInput1"
                      placeholder="Vận chuyển từ"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Vận chuyển đến:<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="shipTo"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      id="exampleFormControlInput1"
                      placeholder="Vận chuyển đến"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Ngày nhận: <span style={{ color: "red" }}>*</span>
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
                      Ngày tải:<span style={{ color: "red" }}>*</span>
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
                      Thời gian kết thúc:{" "}
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
                {activeWarehouse ? (
                  <div className="col-md-6">
                    <div className="form-group">
                      <label for="exampleFormControlInput1">
                        Nhà kho:<span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        class="form-select"
                        name="warehouseId"
                        onChange={(e) => handleChange(e)}
                        required
                      >
                        <option value="" selected>
                          Chọn nhà kho
                        </option>
                        {warehouses.map((option) => (
                          <option value={option._id}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="row" style={{ marginBottom: "10px" }}>
                <div className="col-md-12">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Mô tả: <span style={{ color: "red" }}>*</span>
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
              <span style={{ fontWeight: "bold" }}>NHẬP CHI TIẾT : </span>
              <span style={{ color: "red" }}>*</span>
              {activeContainer ? (
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label for="exampleFormControlInput1">
                        Chọn thùng container:{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        class="form-select"
                        onChange={(e) => handleChangeContainer(e)}
                        multiple
                        name="containerId"
                        required
                      >
                        <option value="" selected>
                          Chọn thùng container
                        </option>
                        {containers.map((option) => (
                          <option value={option._id}>{option.name}</option>
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
                        Tiếp
                      </button>
                    </div>
                  </div>
                </div>
              ) : activePackage ? (
                <div className="row">
                  <div className="col-md-10">
                    {containerValues.map((value, index) => {
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
                                {index + 1} - {value.name}
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
                                Chọn thùng gỗ:{" "}
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                class="form-select"
                                onChange={(e) =>
                                  handleChangePackage(e, value._id, value.name)
                                }
                                multiple
                                name="containerId"
                                required
                              >
                                <option value="" selected>
                                  Chọn thùng gỗ
                                </option>
                                {packages.map((option) => (
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
                  <div className="col-md-2" style={{ margin: "auto" }}>
                    <div className="form-group">
                      <button
                        className="btn btn-primary"
                        onClick={() => onChangeNext2()}
                      >
                        Tiếp
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="row"
                  style={{
                    border: "1px solid #DDDDDD",
                    marginBottom: "10px",
                    padding: "5px",
                  }}
                >
                  <div className="col-md-11">
                    {packageValues.map((value2, index) => {
                      return (
                        <div
                          className="row"
                          style={{
                            borderBottom: "1px solid #DDDDDD",
                            marginBottom: "10px",
                            padding: "5px",
                          }}
                        >
                          <div
                            className="col-md-4"
                            style={{
                              borderRight: "1px solid #DDDDDD",
                              marginBottom: "10px",
                              padding: "5px",
                              margin: "auto",
                            }}
                          >
                            <div className="form-group">
                              <p
                                style={{
                                  fontWeight: "bold",
                                  marginTop: "50px",
                                }}
                              >
                                {index + 1} - {value2.name}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4" style={{ margin: "auto" }}>
                            <div className="form-group">
                              {value2.packages.map((value1, index1) => {
                                return (
                                  <p
                                    style={{
                                      borderBottom: "1px solid #DDDDDD",
                                      marginBottom: "10px",
                                      padding: "5px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {index + 1}.{index1 + 1} - {value1.name}
                                  </p>
                                );
                              })}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              {value2.packages.map((value1, index1) => {
                                return (
                                  <div>
                                    <p style={{ fontWeight: "bold" }}>
                                      {index + 1}.{index1 + 1} - {value1.name}
                                    </p>
                                    <div className="row">
                                      <div>
                                        <select
                                          class="form-select"
                                          style={{ marginBottom: "5px" }}
                                          onChange={(e) =>
                                            onChangeProduct(
                                              e,
                                              value2.containerId,
                                              value2.name,
                                              value1._id,
                                              value1.name
                                            )
                                          }
                                          multiple
                                          name={`${value1._id}product`}
                                          required
                                        >
                                          <option value="" selected>
                                            Chọn sản phẩm
                                          </option>
                                          {products.map((option) => (
                                            <option value={option._id}>
                                              {option.name}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                      {/* <div>
                                        <label for="exampleFormControlInput1">
                                          Số lượng:
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleFormControlInput1"
                                          placeholder="Số lượng"
                                        />
                                      </div> */}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-1" style={{ margin: "20px" }}>
              <div className="form-group">
                <button className="btn btn-primary" onClick={() => onSubmit()}>
                  Thêm
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

export default CreateOder;
