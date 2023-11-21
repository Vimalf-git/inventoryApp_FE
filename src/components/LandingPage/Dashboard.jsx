import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import ApiService from '../../common/ApiService';
import { jwtDecode } from 'jwt-decode';
import EnhancedTable from '../CustomHook/CustomTable';
import useLogout from '../CustomHook/UseLogout';
import { toast } from 'react-toastify';

function Dashboard() {
  const [totalProduct, settotalProduct] = useState(0)
  const [allCategory, setallCategory] = useState(0)
  const [outOfStock, setoutOfStock] = useState(0)
  const [storeValue, setstoreValue] = useState(0)
  const logout = useLogout()

  const getCardList = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const email = jwtDecode(token).email
      const res = await ApiService.get(`/cardlist/${email}`)
      console.log(res);
      if (res.status == 200) {
        const size = res.data.products;
        const CategoryLen = res.data.allCategories
        const outOfStock = res.data.outOfStock
        setstoreValue(res.data.storevalue)
        setoutOfStock(outOfStock.length)
        setallCategory(CategoryLen.length)
        settotalProduct(size.length);
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message)
        logout()
      }
      else {
        toast.error("Error Occoured! Please try after some time")
        logout()
      }
    }

  }
  useEffect(() => {
    getCardList()
  }, [])

  const statusCard = [
    {
      tittle: "Total Products",
      count: totalProduct,
      icon: <ShoppingCartIcon style={{ fontSize: "2.5rem" }} />,
      color: "#FF9F43"
    },
    {
      tittle: "Store Value",
      count: storeValue,
      icon: <CurrencyRupeeIcon style={{ fontSize: "2.5rem" }} />,
      color: "#00CFE8"
    },
    {
      tittle: "Out Of Stock",
      count: outOfStock,
      icon: <RemoveShoppingCartIcon style={{ fontSize: "2.5rem" }} />,
      color: "#1B2850"
    },
    {
      tittle: "All Categories",
      count: allCategory,
      icon: <CategoryIcon style={{ fontSize: "2.5rem" }} />,
      color: "#28C76F"
    }
  ]
  return (
    <div className='dashBoard'>
      <div className='dashboard-topCon'>
        <h5>Inventory Status</h5>
        <div className='card-con'>
          {statusCard.map((e, i) => {
            return <div className='dashCard' key={i} style={{ backgroundColor: e.color, color: "FFFF" }}>
              <div className='dashIcon'>{e.icon}</div>
              <div className='dashCardTittle'>
                <h5 style={{ margin: ".4rem 0 0 .5rem" }}>{e.tittle}</h5>
                <p style={{ margin: "0 0 0 .5rem" }}>{e.count}</p>
              </div>
            </div>
          })}
        </div>

      </div>
      <div className='dashBoardTable'>
        <EnhancedTable />
      </div>
    </div>
  )
}

export default Dashboard