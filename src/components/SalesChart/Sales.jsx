import React, { useEffect, useState } from 'react'
import ApiService from '../../common/ApiService'
import { jwtDecode } from 'jwt-decode';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import './Sales.css'
import useLogout from '../CustomHook/UseLogout';
import { toast } from 'react-toastify';
function Sales() {

  const chartSetting = {
    yAxis: [
      {
        label: 'Qty',
      },
    ],
    width: 400,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };

  const valueFormatter = (value) => `${value}mm`;
  const [productChart, setProductChart] = useState([]);
  const[cateChart,setCategoryChart]=useState([])
  // const[monSale,setMonSale]=useState([])
  const token = sessionStorage.getItem('token');
  const email = jwtDecode(token).email;
  const logout=useLogout();
  const getSalesData = async () => {
    try {
      const res = await ApiService.get(`/getsalelist/${email}`)
      // console.log(res.data);
      if(res.status==200){
        setCategoryChart(res.data.categotyList)
        setProductChart(res.data.productChart)
        setMonSale(res.data.monDataList)
      }
     
      // console.log(res.data.productChart);
    } catch (error) {
      // console.log(error.response.status);

      if(error.response.status === 400)
      {
        // console.log('jhgf');
        toast.error(error.response.data.message)
        logout()
      }
      else
      {
        toast.error("Error Occoured! Please try after some time")
        logout()
      }
    }
  }
  useEffect(() => {
    getSalesData();
  }, [])
  const dataset = [
    {
      london: 59,
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: 'Jan',
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      seoul: 28,
      month: 'Fev',
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
      seoul: 41,
      month: 'Mar',
    }]

    
  const productData =
    productChart.map((e, i) => {
      return {
        id: i,
        value: parseInt(e.quantity),
        label: e.productName
      }
    })
    const categotyData=cateChart.map((e,i)=>{
      return{
        id:i,
        value:parseInt(e.quantity),
        label:e.category
      }
    })
  //   const monProductSale=monSale.map((e)=>{
  //     return{
  //       quantity:parseInt(e.quantity),
  //       month:e.mon
  //     }
  //   })
  // console.log(monProductSale);
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
          {/* backgroundColor:'red'backgroundColor:'blue',, */}
        </div>
        {/* <div className='yearChart'>
          <h5 style={{ marginLeft: '2rem' }}>
            Month Sales
          </h5>
          <BarChart
            dataset={monProductSale}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              { dataKey: 'quantity', label: 'quantity', valueFormatter },
            ]}
            {...chartSetting}
            sx={{ display: 'flex', alignItems: 'flex-start' }}
          />
        </div> */}
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