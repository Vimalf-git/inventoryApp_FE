import React, { useEffect, useLayoutEffect, useState } from "react";
import ApiService from "../../common/ApiService";
import { jwtDecode } from "jwt-decode";

export const  tableProductData =React.createContext();

function TableContext({children}){
const token=sessionStorage.getItem("token")
const email=jwtDecode(token).email;
    const [rows,setRows]=useState([]);
    const[isFilter,setIsfilter]=useState(true);
    // console.log(isFilter);
    // console.log(rows);
const getProduct=async()=>{
 const res=await ApiService.get(`/getproduct/${email}`)
//  console.log('context');
//  console.log(res.data);
 if(res.status==200){
//   console.log(res.data.data);
  setRows(res.data.data);
  setIsfilter(pre=>!pre);
 }
}
useEffect(()=>{
  getProduct()
},[])
useEffect(()=>{
    const sample=[...rows];
    console.log(sample);
    const setData=isFilter?sample.sort((a,b)=>b.price-a.price)
    :sample.sort((a,b)=>a.price-b.price)
    console.log(setData);
    setRows(setData) 
},[isFilter])

useLayoutEffect(()=>{
    console.log(rows);
},[rows])
    // isFilter?setRows(setData):rows;
return(
    <tableProductData.Provider value={{rows,isFilter,setIsfilter}}>
        {children}
    </tableProductData.Provider>
)
}
export default TableContext