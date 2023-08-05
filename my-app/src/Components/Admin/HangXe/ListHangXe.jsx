import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Layout/Sidebar";
import HangXeService from "../../../Api/HangXeService";


const ListHangXe =()=>{
    const [hangxe,setHangXe]=useState([]);
    useEffect(()=>{
        HangXeService.getAll().then((response)=>{
            setHangXe(response.data);
        }).catch(error =>{
            console.log(error);
        })
    },[])
    const DeleteDV=(e)=>{
        HangXeService.deleteById(e).then((res)=>{
            window.location.href="/hangxe/index";
        }).catch((error)=>{
            console.log(error);
        });
    };
    return(
        <>
          <Sidebar />
          <section id="content">
            {/* MAIN */}
            <main>
              <div className="table-data container">
                <div className="order">
                  <div className="head">
                    <h3>Màu Sắc</h3>
                    <i className="bx bx-search" />
                    <i className="bx bx-filter" />
                    <div>
                      <Link to="/mausac/index" className="btn btn-primary">
                        Add
                      </Link>
                    </div>
                  </div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Id</th>
                        <th>Tên</th>
                        <th>Quốc Gia</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        hangxe.map(
                          (hangxe, index) =>
                            <tr key={hangxe.id}>
                              <th scope="row" key={index}>
                                <td>{index + 1}</td>
                              </th>
                              <td>{hangxe.id}</td>
                              <td>{hangxe.ten}</td>
                              <td>{hangxe.quocGia}</td>
                              <td><button
                                onClick={(e) => DeleteDV(hangxe.id)}
                                className="btn btn-sm btn-danger"
                              >
                                Delete
                              </button>
                                <span className="padd"></span>
                                <Link className="btn btn-success" to={'/hangxe/update/' + hangxe.id}>
                                  Detail
                                </Link>
                              </td>
                            </tr>
                        )
                      }
                    </tbody>
                  </table>
                  <div className="px-5 py-2 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                    <div className="inline-flex mt-2 mt-0">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                      // onClick={prevPage}
                      >
                        Prev
                      </button>
    
                      <button
                        className="btn btn-sm btn-outline-secondary"
                      // onClick={nextPage}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            {/* MAIN */}
          </section>
        </>
    )
}