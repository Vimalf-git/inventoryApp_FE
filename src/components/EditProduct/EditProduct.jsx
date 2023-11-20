import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import './AddProduct.css'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
// import ApiService from '../../common/ApiService';
// import TodayIcon from '@mui/icons-material/Today';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import { TextareaAutosize } from '@mui/base/TextareaAutosize';
// import { jwtDecode } from 'jwt-decode';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ApiService from '../../common/ApiService';
function EditProduct() {
    const [initialValues, setInitialValues] = useState(
        {
            productName: '',
            category: '',
            ProductCode: '',
            price: '',
            quantity: ''
        }
    )
    const param = useParams()
    const navigate = useNavigate()
    const getProductData = async (id) => {
        const res = await ApiService.get(`/getproductbyid/${id}`)
        console.log(res.data);
        setInitialValues(res.data.data)
    }
    const saveData = async (values) => {
        const res = await ApiService.put('/updateproduct', {
            id: param.id,
            productCode: values.ProductCode,
            quantity: values.quantity,
            price: values.price

        })
        if (res.status == 200) {
            toast.success('data update success')
            navigate('/dashboard')
        } else {
            toast.error('error')
        }
    }
    useEffect(() => {
        // if (param.id)
        getProductData(param.id)
        // else
        // navigate('/dashboard')
    }, [])
    // const scheme = Yup.object().shape({
    //     ProductName: Yup.string().required('please enter your name'),
    //     price: Yup.string().required("please enter price"),
    //     quantity: Yup.string().required('please enter your quantity'),
    //     category: Yup.string().required('please select any one category').matches("", "please any one category"),
    //     ProductCode: Yup.string().required('please enter your ProductCode')
    // })

    return (
        <div className='addproFormik'>
             <div className='addproTittle'>
                    <div className='addproTittleDesign'>
                        <div className='addproDesign'></div>
                        <span className='addTittleTxt'>Edit Product</span>
                    </div>
                </div>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={(value) => {
                    // console.log(value);
                    saveData(value)
                }}
            // validationSchema={scheme}
            >{({ handleSubmit, handleChange, handleBlur, errors, touched, values }) => (
                <  form onSubmit={handleSubmit} className='addproForm' >
                    {/* {console.log(errors)} */}
                    <div className='addproForm-left'>
                        {/* <div> */}
                        <TextField sx={{ m: 1, width: '80%' }}
                            disabled
                            required id="outlined-basic" label="category" variant="outlined"
                            value={values.category} name='category' onChange={handleChange}
                            onBlur={handleBlur}
                        // error={errors.category && touched.category}
                        // helperText={errors.category && touched.category ? errors.category : ""}
                        />
                        <TextField sx={{ m: 1, width: '80%' }}
                            disabled
                            required id="outlined-basic" label="productName" variant="outlined"
                            value={values.productName} name='productName' onChange={handleChange}
                            onBlur={handleBlur}
                        // error={errors.ProductName && touched.ProductName}
                        // helperText={errors.ProductName && touched.ProductName ? errors.ProductName : ""}
                        />
                        <TextField sx={{ m: 1, width: '80%' }}
                            required id="outlined-basic" label="ProductCode" variant="outlined"
                            value={values.ProductCode} name='ProductCode' onChange={handleChange}
                            onBlur={handleBlur}
                        // error={errors.productCode && touched.productCode}
                        // helperText={errors.ProductCode && touched.ProductCode ? errors.ProductCode : ""}
                        />
                        {/* </div>                          */}
                        {/* <TextareaAutosize /> */}

                    </div>
                    <div className='addproForm-right'>

                        <TextField sx={{ m: 1, width: '80%' }}
                            required id="outlined-basic" label="Price" variant="outlined"
                            value={values.price} name='price' onChange={handleChange}
                            onBlur={handleBlur} 
                            // error={errors.price && touched.price}
                        // helperText={errors.price && touched.price ? errors.price : ""}
                        />

                        <TextField sx={{ m: 1, width: '80%' }}
                            required id="outlined-basic" label="Quantity" variant="outlined"
                            value={values.quantity} name='quantity' onChange={handleChange}
                            onBlur={handleBlur} 
                            // error={errors.quantity && touched.quantity}
                        // helperText={errors.quantity && touched.quantity ? errors.quantity : ""}
                        />
                    </div>

                    <div className='addproForm-left'>
                        <Button sx={{ m: 1, display: 'flex', gap: '1rem', bgcolor: "#2a2185" }}

                            variant='contained' color='primary' type='submit'
                        >
                            <SaveAsIcon />
                            <span >Save</span>
                        </Button>
                    </div>
                </ form>
            )}
            </Formik>
        </div>)
}

export default EditProduct