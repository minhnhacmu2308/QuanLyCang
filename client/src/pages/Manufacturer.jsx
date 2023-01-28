import { useState,useEffect ,useMemo} from 'react';
import MaterialReactTable from 'material-react-table';
import {useLoaderData} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer/index';
import MenuLeft from '../components/MenuLeft';
import ManufacturerTable from '../components/Manufacturer/ManufacturerTable';

function Manufacturer() {
  const data = useLoaderData();
  console.log("HOme",data);
  return  <body className="sb-nav-fixed">
  <Header/>
  <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
          <MenuLeft/>
      </div>
      <div id="layoutSidenav_content">
          <main>
              <div className="container-fluid px-4">
                  <h1 className="mt-4">Nơi sản xuất</h1>
                  <ol className="breadcrumb mb-4">
                      <li className="breadcrumb-item active">Nơi sản xuất</li>
                  </ol>
                </div>
              <div className='container'>
                    <ManufacturerTable props = {data}/>
              </div>
              
          </main>
          <Footer/>
      </div>
  </div>
</body>
}

export default Manufacturer;
