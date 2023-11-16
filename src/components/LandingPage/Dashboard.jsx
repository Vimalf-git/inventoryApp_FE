import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import ApiService from '../../common/ApiService';
import { jwtDecode } from 'jwt-decode';
import EnhancedTable from '../CustomHook/CustomTable';

function Dashboard() {
  /* orange-FF9F43
blue-00CFE8
dblue-1B2850
green-28C76F */
const[totalProduct,settotalProduct]=useState()
const[allCategory,setallCategory]=useState()
const[outOfStock,setoutOfStock]=useState()
const[storeValue,setstoreValue]=useState()

const getCardList=async()=>{
  const token=sessionStorage.getItem('token')
  const email=jwtDecode(token).email
  const res=await ApiService.get(`/cardlist/${email}`)
  const size=res.data.products;
  const CategoryLen=res.data.allCategories
  const outOfStock=res.data.outOfStock
  setstoreValue(res.data.storevalue)
  setoutOfStock(outOfStock.length)
  setallCategory(CategoryLen.length)
  settotalProduct(size.length);
}
useEffect(()=>{
  getCardList()
},[])
  const statusCard = [
    {
      tittle: "Total Products",
      count: totalProduct,
      icon: <ShoppingCartIcon style={{fontSize:"2.5rem"}}/>,
      color:"#FF9F43"
    },
    {
      tittle: "Store Value",
      count: storeValue,
      icon: <CurrencyRupeeIcon style={{fontSize:"2.5rem"}}/>,
      color:"#00CFE8"
    },
    {
      tittle: "Out Of Stock",
      count: outOfStock,
      icon: <RemoveShoppingCartIcon style={{fontSize:"2.5rem"}}/>,
      color:"#1B2850"
    },
    {
      tittle: "All Categories",
      count: allCategory,
      icon: <CategoryIcon style={{fontSize:"2.5rem"}}/>,
      color:"#28C76F"
    }
  ]
  return (
    <div className='dashBoard'>
      <div className='dashboard-topCon'>
        <h5>Inventory Status</h5>
        <div className='card-con'>
          {statusCard.map((e,i) => {
            return <div className='dashCard' key={i} style={{backgroundColor:e.color,color:"FFFF"}}>
              <div className='dashIcon'>{e.icon}</div>
              <div className='dashCardTittle'>
                <h5 style={{margin:".4rem 0 0 .5rem"}}>{e.tittle}</h5>
                <p style={{margin:"0 0 0 .5rem"}}>{e.count}</p>
              </div>
            </div>
          })}
        </div>

      </div>
      <div className='dashBoardTable'>
        <EnhancedTable/>
      </div>
    </div>
  )
}

export default Dashboard