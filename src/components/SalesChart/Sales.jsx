import React, { useEffect, useState } from 'react'
import ApiService from '../../common/ApiService'
import { jwtDecode } from 'jwt-decode';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import './Sales.css'
function Sales() {

  const chartSetting = {
    yAxis: [
      {
        label: 'rainfall (mm)',
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };

  const valueFormatter = (value) => `${value}mm`;
  const [productChart, setProductChart] = useState([]);

  const token = sessionStorage.getItem('token');
  const email = jwtDecode(token).email;
  const getSalesData = async () => {
    try {
      const res = await ApiService.get(`/getsalelist/${email}`)
      // const resDataFilter=res.data.data.electrical.map((e)=>{
      //   const salesData =salesData+ e.salesData;
      //   console.log(salesData);
      // })
      setProductChart(res.data.productChart)
      console.log(res.data.data);
    } catch (error) {

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
  console.log(productData);
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
        <div className='yearChart'>
          <h5 style={{ marginLeft: '2rem' }}>
            product Sales
          </h5>
          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
              { dataKey: 'london', label: 'London', valueFormatter },
              { dataKey: 'paris', label: 'Paris', valueFormatter },
              { dataKey: 'newYork', label: 'New York', valueFormatter },
              { dataKey: 'seoul', label: 'Seoul', valueFormatter },
            ]}
            {...chartSetting}
            sx={{ display: 'flex', alignItems: 'flex-start' }}
          />
        </div>
      </div>
      <div className='bottomChart'>
        <div className='productChart'>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: 'series A' },
                { id: 1, value: 15, label: 'series B' },
                { id: 2, value: 20, label: 'series C' },
              ],
            },
          ]}
          width={400}
          height={200}
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
        </div>
      </div>
    </div>
  )
}

export default Sales