import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './AddProduct.css'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import TodayIcon from '@mui/icons-material/Today';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { jwtDecode } from 'jwt-decode';
import useLogout from '../CustomHook/UseLogout';
import ApiService from '../../Utiles/ApiService';
function Addproduct() {
    const [categories, setCategories] = useState([])
    const logout = useLogout()
    const getCategory = async () => {
        try {
            const res = await ApiService.get("/category/view")
            console.log(res.data.category);
            setCategories(res.data.category);
        } catch (error) {
            if (error.response.status === 400) {
                toast.error(error.response.data.message)
                logout()
            }
            else {
                toast.error("Error Occoured! Please try after some time")
            }
        }
    }
    useEffect(() => {
        getCategory()
    }, [])

    const navigate = useNavigate();
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let today = new Date();
    let day = today.getDate();
    let mon = monthNames[today.getMonth()]
    let year = today.getFullYear();
    console.log(today.getDate);
    const submitData = async (value) => {
        const token = sessionStorage.getItem('token');
        const email = jwtDecode(token).email
        try {
            const res = await ApiService.post('/productadd',
                {
                    email,
                    productName: value.ProductName,
                    category: value.category,
                    price: value.price,
                    ProductCode: value.ProductCode,
                    quantity: value.quantity
                });
            if (res.status === 200) {
                toast.success(res.data.message)
                navigate('/dashboard')
            }
        } catch (error) {
            toast.error(error.response.data.message);
            logout()

        }
    }
    const scheme = Yup.object().shape({
        ProductName: Yup.string().required('please enter your name'),
        price: Yup.string().required("please enter price"),
        quantity: Yup.string().required('please enter your quantity'),
        category: Yup.string().required('please select any one category').matches("", "please any one category"),
        ProductCode: Yup.string().required('please enter your ProductCode')
    })
    return (
        <>
            <div className='addProduct'>
                <div className='addproTittle'>
                    <div className='addproTittleDesign'>
                        <div className='addproDesign'></div>
                        <span className='addTittleTxt'>Add Product</span>
                    </div>
                    <Button className='addtittleBtn' style={{
                    }}>
                        {<TodayIcon />} <div>{`${mon} ${day} ${year}`}</div>
                    </Button>
                </div>
                <div className='addproFormik'>
                    <Formik
                        initialValues={{
                            ProductName: '',
                            price: '',
                            quantity: '',
                            category: '',
                            ProductCode: ''
                        }}
                        onSubmit={(value) => {
                            console.log(value);
                            submitData(value)
                        }}
                        validationSchema={scheme}
                    >{({ handleSubmit, handleChange, handleBlur, errors, touched, values }) => (
                        <  form onSubmit={handleSubmit} className='addproForm' >
                            {console.log(errors)}
                            <div className='addproForm-left'>

                                <FormControl required sx={{ m: 1, width: '80%' }}
                                    error={errors.category && touched.category}>
                                    <InputLabel id="demo-simple-select-required-label"
                                        error={errors.category && touched.category}

                                    >Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={values.category}
                                        name='category'
                                        label="Category"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={errors.category && touched.category}>
                                        <MenuItem value="">
                                            none
                                        </MenuItem>
                                        {
                                            categories.map((e) => {
                                                return <MenuItem value={e}>
                                                    {e}
                                                </MenuItem>
                                            })
                                        }
                                    </Select>
                                    {errors.category && touched.category ?
                                        <FormHelperText>{errors.category}</FormHelperText>
                                        : ""}
                                </FormControl>
                                <TextField sx={{ m: 1, width: '80%' }}
                                    required id="outlined-basic" label="ProductName" variant="outlined"
                                    value={values.ProductName} name='ProductName' onChange={handleChange}
                                    onBlur={handleBlur} error={errors.ProductName && touched.ProductName}
                                    helperText={errors.ProductName && touched.ProductName ? errors.ProductName : ""}
                                />
                                <TextField sx={{ m: 1, width: '80%' }}
                                    required id="outlined-basic" label="ProductCode" variant="outlined"
                                    value={values.ProductCode} name='ProductCode' onChange={handleChange}
                                    onBlur={handleBlur} error={errors.ProductCode && touched.ProductCode}
                                    helperText={errors.ProductCode && touched.ProductCode ? errors.ProductCode : ""}
                                />
                            </div>
                            <div className='addproForm-right'>

                                <TextField sx={{ m: 1, width: '80%' }}
                                    required id="outlined-basic" label="Price" variant="outlined"
                                    value={values.price} name='price' onChange={handleChange}
                                    onBlur={handleBlur} error={errors.price && touched.price}
                                    helperText={errors.price && touched.price ? errors.price : ""}
                                />

                                <TextField sx={{ m: 1, width: '80%' }}
                                    required id="outlined-basic" label="Quantity" variant="outlined"
                                    value={values.quantity} name='quantity' onChange={handleChange}
                                    onBlur={handleBlur} error={errors.quantity && touched.quantity}
                                    helperText={errors.quantity && touched.quantity ? errors.quantity : ""}
                                />
                            </div>

                            <div className='addproForm-left'>
                                <Button sx={{ m: 1, display: 'flex', gap: '1rem', bgcolor: "#2a2185" }}

                                    variant='contained' color='primary' type='submit'  >
                                    <AddShoppingCartIcon />
                                    <span >Add Product</span>
                                </Button>
                            </div>
                        </ form>
                    )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default Addproduct