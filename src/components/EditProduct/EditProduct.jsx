import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import SaveAsIcon from '@mui/icons-material/SaveAs';
import useLogout from '../CustomHook/UseLogout';
import ApiService from '../../Utiles/ApiService';
function EditProduct() {
    const logout = useLogout();
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
        try {
            const res = await ApiService.get(`/getproductbyid/${id}`)
            if (res.status == 200) {
                setInitialValues(res.data.data)
            }
        } catch (error) {
            console.log("catch the catch");
            toast.error(error.response.data.message);
            logout()
        }
    }
    const saveData = async (values) => {

        try {
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
        } catch (error) {
            console.log("catch the catch");

        }

    }
    useEffect(() => {
        getProductData(param.id)
    }, [])
    const scheme = Yup.object().shape({
        ProductCode: Yup.string().required("please enter valid productCode"),
        price: Yup.string().required("please enter valid price").test((value) => value >= 0),
        quantity: Yup.string().required("please enter valid quantity").test((value) => value >= 0),
    })

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
                    saveData(value)
                }}
                validationSchema={scheme}
            >{({ handleSubmit, handleChange, handleBlur, errors, touched, values }) => (
                <  form onSubmit={handleSubmit} className='addproForm' >
                    {/* {console.log(errors)} */}
                    <div className='addproForm-left'>
                        <TextField sx={{ m: 1, width: '80%' }}
                            disabled
                            required id="outlined-basic" label="category" variant="outlined"
                            value={values.category} name='category' onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField sx={{ m: 1, width: '80%' }}
                            disabled
                            required id="outlined-basic" label="productName" variant="outlined"
                            value={values.productName} name='productName' onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <TextField sx={{ m: 1, width: '80%' }}
                            required id="outlined-basic" label="ProductCode" variant="outlined"
                            value={values.ProductCode} name='ProductCode' onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.ProductCode && touched.ProductCode}
                            helperText={errors.ProductCode && touched.ProductCode ? errors.ProductCode : ""}
                        />

                    </div>
                    <div className='addproForm-right'>

                        <TextField sx={{ m: 1, width: '80%' }}
                            required id="outlined-basic" label="Price" variant="outlined"
                            value={values.price} name='price' onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.price && touched.price}
                            helperText={errors.price && touched.price ? errors.price : ""}
                        />

                        <TextField sx={{ m: 1, width: '80%' }}
                            required id="outlined-basic" label="Quantity" variant="outlined"
                            value={values.quantity} name='quantity' onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.quantity && touched.quantity}
                            helperText={errors.quantity && touched.quantity ? errors.quantity : ""}
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