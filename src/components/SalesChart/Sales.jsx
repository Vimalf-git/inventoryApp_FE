import React, { useEffect, useState } from 'react'
import ApiService from '../../common/ApiService'
import { jwtDecode } from 'jwt-decode';
import './Sales.css'
import useLogout from '../CustomHook/UseLogout';
import { toast } from 'react-toastify';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
function Sales() {
  const [productChart, setProductChart] = useState([]);
  const token = sessionStorage.getItem('token');
  const email = jwtDecode(token).email;
  const logout = useLogout();
  const getSalesData = async () => {
    try {
      const res = await ApiService.get(`/getsalelist/${email}`)
      if (res.status == 200) {
        setProductChart(res.data.resData)
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

  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip, Legend
  )
  const options = {
    responsive: true,
    Plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Total Product Sale'
      }
    }
  }

  let monArr = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
  const productDataSam = productChart.map((e) => {
    let resArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    monArr.filter((v, i) => {
      if (e.saleMon == v)
        resArr[i] = e.quantity
    })
    return {
      label: e.productName,
      data: resArr,
      backgroundColor: 'rgb(255,99,132,.5)'
    }
  })

  const data = {
    labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    datasets: productDataSam
  }
  return (
    <div className='salesChart'>
      <div className='addproTittle'>
        <div className='addproTittleDesign'>
          <div className='addproDesign'></div>
          <span className='addTittleTxt'>Sale Chart</span>
        </div>
      </div>
      <div className='TopChart'>
        <div className='TopproductChart'>
          <h5 style={{ marginLeft: '2rem' }}>
            product Sales
          </h5>
          <Bar options={options} data={data} />
        </div>
      </div>

    </div>
  )
}

export default Sales