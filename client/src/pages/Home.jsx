import { useState,useEffect ,useMemo} from 'react';
import MaterialReactTable from 'material-react-table';
import Header from '../components/Header';
import Footer from '../components/Footer/index';
import MenuLeft from '../components/MenuLeft';
import { Link } from "react-router-dom";

import { useLoaderData } from "react-router-dom";


function Home() {
    const data = useLoaderData();
    console.log("HOme", data);
  return  <body className="sb-nav-fixed">
  <Header/>
  <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
          <MenuLeft/>
      </div>
      <div id="layoutSidenav_content">
          <main>
              <div className="container-fluid px-4">
                  <h1 className="mt-4">Dashboard</h1>
                  <ol className="breadcrumb mb-4">
                      <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                  <div className="row">
                      <div className="col-xl-3 col-md-6">
                          <div className="card bg-primary text-white mb-4">
                              <div className="card-body">Tổng số đơn hàng đã nhập: {data?.data.statistical?.numberInput}</div>
                              <div className="card-footer d-flex align-items-center justify-content-between">
                              <Link className="small text-white stretched-link" to="/order-input">
                              Xem chi tiết
                                </Link>
                               
                                  <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                              </div>
                          </div>
                      </div>
                      <div className="col-xl-3 col-md-6">
                          <div className="card bg-warning text-white mb-4">
                              <div className="card-body">Tổng số đơn hàng đã xuất: {data?.data.statistical?.numberOutput} </div>
                              <div className="card-footer d-flex align-items-center justify-content-between">
                              <Link className="small text-white stretched-link" to="/order-output">
                              Xem chi tiết
                                </Link>
                               
                                  <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                              </div>
                          </div>
                      </div>
                      <div className="col-xl-3 col-md-6">
                          <div className="card bg-success text-white mb-4">
                              <div className="card-body">Tổng số khách hàng: {data?.data.statistical?.totalCustomer} </div>
                              <div className="card-footer d-flex align-items-center justify-content-between">
                              <Link className="small text-white stretched-link" to="/customer">
                     Xem chi tiết
                    </Link>
                                  <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                              </div>
                          </div>
                      </div>
                      <div className="col-xl-3 col-md-6">
                          <div className="card bg-danger text-white mb-4">
                          <div className="card-body">Tổng số nhân viên: {data?.data.statistical?.totalProduct} </div>
                              <div className="card-footer d-flex align-items-center justify-content-between">
                              <Link className="small text-white stretched-link" to="/employee">
                     Xem chi tiết
                    </Link>
                                  <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                              </div>
                          </div>
                      </div>
                  </div>
                  
              </div>
              <div className='container'>
                   
              </div>
              
          </main>
          <Footer/>
      </div>
  </div>
</body>
}

export default Home;
