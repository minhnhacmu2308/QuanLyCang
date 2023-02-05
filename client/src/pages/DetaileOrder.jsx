import { useState, useEffect, useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { useLoaderData, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer/index";
import MenuLeft from "../components/MenuLeft";
import { orderById, orderByIdNew } from "../utils/orderUtils";

function DetailOrder() {
  let { id, type } = useParams();
  const [data, setData] = useState();
  console.log("type", type);
  useEffect(() => {
    async function getOrderDetail() {
      let order;
      if (type == "null") {
        console.log("type rd", type);
        order = await orderByIdNew(id);
        setData(order.data.orderNew);
      } else {
        order = await orderById(id);
        setData(order.data.order);
      }

      console.log("order", order);
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
              <h1 className="mt-4">Chi tiết đơn hàng </h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Chi tiết đơn hàng</li>
              </ol>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      for="exampleFormControlInput1"
                      style={{ fontWeight: "bold" }}
                    >
                      ReceiptNo
                    </label>
                    <p>{data?.receiptNo}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      for="exampleFormControlInput1"
                      style={{ fontWeight: "bold" }}
                    >
                      Loại nhập hàng hóa:{" "}
                    </label>
                    <p>{data?.type}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      for="exampleFormControlInput1"
                      style={{ fontWeight: "bold" }}
                    >
                      Tài xế:
                    </label>
                    <p>{data?.driver.fullName}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      for="exampleFormControlInput1"
                      style={{ fontWeight: "bold" }}
                    >
                      Thiết bị vận chuyển
                    </label>
                    <p>{data?.transequipment.type}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      for="exampleFormControlInput1"
                      style={{ fontWeight: "bold" }}
                    >
                      Phương tiện
                    </label>
                    <p>{data?.vehicle.type}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      for="exampleFormControlInput1"
                      style={{ fontWeight: "bold" }}
                    >
                      Vận chuyển từ
                    </label>
                    <p>{data?.shipFrom}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      for="exampleFormControlInput1"
                      style={{ fontWeight: "bold" }}
                    >
                      Vận chuyển đến
                    </label>
                    <p>{data?.shipTo}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      for="exampleFormControlInput1"
                      style={{ fontWeight: "bold" }}
                    >
                      Ngày nhận
                    </label>
                    <p>{data?.receivingDate}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      for="exampleFormControlInput1"
                      style={{ fontWeight: "bold" }}
                    >
                      Ngày tải
                    </label>
                    <p>{data?.loadingDate}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      for="exampleFormControlInput1"
                      style={{ fontWeight: "bold" }}
                    >
                      Thời gian kết thúc
                    </label>
                    <p>{data?.finishTime}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      for="exampleFormControlInput1"
                      style={{ fontWeight: "bold" }}
                    >
                      Người tạo
                    </label>
                    <p>{data?.createdBy}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label
                      for="exampleFormControlInput1"
                      style={{ fontWeight: "bold" }}
                    >
                      Loại đơn hàng
                    </label>
                    <p>{data?.typeInput}</p>
                  </div>
                </div>
                {data?.type == "Có lưu trữ" ? (
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        for="exampleFormControlInput1"
                        style={{ fontWeight: "bold" }}
                      >
                        Nhà kho
                      </label>
                      <p>{data?.warehouse.name}</p>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label
                      for="exampleFormControlInput1"
                      style={{ fontWeight: "bold" }}
                    >
                      Mô tả
                    </label>
                    <p>{data?.description}</p>
                  </div>
                </div>
              </div>
              <div className="">
                {data?.type !== null ? (
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Thùng container</th>
                        <th scope="col">Thùng gỗ</th>
                        <th scope="col">Sản phẩm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.orderInput?.containers.map((option, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{option.name}</td>
                          <td>
                            {option.packages.map((value) => (
                              <p>
                                - {value.name} -{" "}
                                {value.size == "1"
                                  ? " Nhỏ - 200 sản phẩm"
                                  : value.size == "2"
                                  ? " Vừa - 500 sản phẩm "
                                  : " Lớn - 1000 sản phẩm"}
                              </p>
                            ))}
                          </td>
                          <td>
                            {option.packages.map((value) => {
                              return (
                                <div
                                  style={{
                                    border: "1px solid #DDDDDD",
                                    marginBottom: "10px",
                                    padding: "5px",
                                  }}
                                >
                                  {option.products.map((value1) => {
                                    if (
                                      value1.idContainer ===
                                        option.containerId &&
                                      value1.idPackage === value._id
                                    ) {
                                      return (
                                        <p>
                                          {value.name}- {value1.name}
                                        </p>
                                      );
                                    }
                                  })}
                                </div>
                              );
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Thùng gỗ</th>
                        <th scope="col">Sản phẩm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.orderInput?.packages.map((option, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {option.name} -
                            {option.size == "1"
                              ? " Nhỏ - 200 sản phẩm"
                              : option.size == "2"
                              ? " Vừa - 500 sản phẩm "
                              : " Lớn - 1000 sản phẩm"}
                          </td>
                          <td>{option.product.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </body>
  );
}

export default DetailOrder;
