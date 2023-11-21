import React, { useEffect, useState } from 'react'
import ApiService from '../../common/ApiService'
import { jwtDecode } from 'jwt-decode';
import { PieChart } from '@mui/x-charts/PieChart';
import './Sales.css'
import useLogout from '../CustomHook/UseLogout';
import { toast } from 'react-toastify';
function Sales() {
  const [productChart, setProductChart] = useState([]);
  const [cateChart, setCategoryChart] = useState([])
  const token = sessionStorage.getItem('token');
  const email = jwtDecode(token).email;
  const logout = useLogout();
  const getSalesData = async () => {
    try {
      const res = await ApiService.get(`/getsalelist/${email}`)
      if (res.status == 200) {
        setCategoryChart(res.data.categotyList)
        setProductChart(res.data.productChart)
        setMonSale(res.data.monDataList)
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
    getSalesData();
  }, [])

  const productData =
    productChart.map((e, i) => {
      return {
        id: i,
        value: parseInt(e.quantity),
        label: e.productName
      }
    })
  const categotyData = cateChart.map((e, i) => {
    return {
      id: i,
      value: parseInt(e.quantity),
      label: e.category
    }
  })
  return (
    <div className='salesChart'>
      <div className='addproTittle'>
        <div className='addproTittleDesign'>
          <div className='addproDesign'></div>
          <span className='addTittleTxt'>Sale Chart</span>
        </div>
      </div>
      <div className='TopChart'>
        <div className='productChart'>
          <h5 style={{ marginLeft: '2rem' }}>
            product Sales
          </h5>
          <PieChart
            series={[
              {
                data: productData
              },
            ]}
            width={500}
            height={200}
            sx={{ display: 'flex', justifyContent: 'center', marginLeft: '-6rem' }}
          />
        </div>
      </div>
      <div className='bottomChart'>
        <div className='productChart'>
          <h5 style={{ marginLeft: '2rem' }}>
            Category Sales
          </h5>
          <PieChart
            series={[
              {
                data: categotyData
              },
            ]}
            width={500}
            height={200}
            sx={{ display: 'flex', justifyContent: 'center', marginLeft: '-6rem' }}
          />
        </div>
      </div>
    </div>
  )
}

export default Sales