import { useState, useEffect, useMemo } from "react";
import MaterialReactTable from "material-react-table";
import { useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer/index";
import MenuLeft from "../components/MenuLeft";


function CreateOder() {

  const data = useLoaderData();
  console.log("HOme", data);
  const [tableData, setTableData] = useState(
    () => data.data.orders
  );
  const [drivers, setDrivers] = useState(
    () => data.drivers.data.drivers
  );
  const [vehicles, setVehicles] = useState(
    () => data.vehicles.data.vehicles
  );
  const [warehouses, setWarehouses] = useState(
    () => data.warehouses.data.data.warehouses
  );
  const [transequipments, setTransequipments] = useState(
    () => data.transequipments.data.transequipments
  );
  const [containers, setContainers] = useState(
    () => data.containers.data.containers
  );
  const [packages, setPackages] = useState(
    () => data.packages.data.packages
  );
  const [fields, setFields] = useState({})
  const [activePackage, setActivePackage] = useState(false)
  const  handleChange = (e) => {
    console.log("e",e.target.value)
    if(e.target.name === "containerId" && e.target.value != ""){
      setActivePackage(true)
    }
    fields[e.target.name] = e.target.value;
    setFields(fields);
    
    console.log("fields",fields)
  }
  
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
                     Loại nhập hàng hóa: <span style={{ color: "red" }}>*</span>
                    </label>
                    <select  class="form-select"  name="unitId" required>
                          <option value="Lưu trữ" selected>Lưu trữ</option>
                          <option value="Không lưu trữ" >Không lưu trữ</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Nhà kho:<span style={{ color: "red" }}>*</span>
                    </label>
                    <select  class="form-select" name="unitId" required>
                        <option value="" selected>Chọn nhà kho</option>
                        {warehouses.map((option) => (
                              <option value={option._id}>{option.name}</option>
                          ))}
                      
                  </select>
                  </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                     Thiết bị vận chuyển: <span style={{ color: "red" }}>*</span>
                    </label>
                    <select  class="form-select" name="unitId" required>
                        <option value="" selected>Chọn thiết bị vận chuyển</option>
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
                    <select  class="form-select" name="unitId" required>
                        <option value="" selected>Chọn phương tiện</option>
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
                      Vận chuyển từ: <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
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
                      className="form-control"
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
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name"
                      
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
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name"
                      
                    />
                  </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Thời gian kết thúc: <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="name"
                      
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                    Chọn tài xế:<span style={{ color: "red" }}>*</span>
                    </label>
                    <select  class="form-select" name="unitId" required>
                        <option value="" selected>Chọn tài xế</option>
                        {drivers.map((option) => (
                              <option value={option._id}>{option.fullName}</option>
                          ))}
                      
                  </select>
                  </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Mô tả: <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea   className="form-control" id="story" name="story"
                                rows="5" cols="33">
                     
                      </textarea>
                  </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                      Chọn thùng container: <span style={{ color: "red" }}>*</span>
                    </label>
                    <select  class="form-select" onChange={(e)=>handleChange(e)}  name="containerId" required>
                        <option value="" selected>Chọn thùng container</option>
                        {containers.map((option) => (
                              <option value={option._id}>{option.name}</option>
                          ))}
                      
                  </select>
                  </div>
                </div>{
                  activePackage ? <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleFormControlInput1">
                    Chọn thùng gỗ:<span style={{ color: "red" }}>*</span>
                    </label>
                    <select  class="form-select" name="unitId" required>
                        <option value="" selected>Chọn thùng gỗ</option>
                        {packages.map((option) => (
                              <option value={option._id}>{option.color}</option>
                          ))}
                      
                  </select>
                  </div>
                </div> :null
                }
               
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
