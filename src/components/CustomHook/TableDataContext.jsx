import React, { useEffect, useState } from "react";
import ApiService from "../../common/ApiService";

export const  tableProductData =React.createContext();

function TableContext({children}){
    const [rows,setRows]=useState([])
const getProduct=async()=>{
 const res=await ApiService.get('/getproduct')
 if(res.status==200){
  console.log(res.data.data);
  setRows(res.data.data);
 }
}
useEffect(()=>{
  getProduct()
},[])
return(
    <tableProductData.Provider value={{rows}}>
        {children}
    </tableProductData.Provider>
)
}
export default TableContext