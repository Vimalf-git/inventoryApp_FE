import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ApiService from "../../Utiles/ApiService";

export const tableProductData = React.createContext();

function TableContext({ children }) {
    const token = sessionStorage.getItem("token")
    const email = jwtDecode(token).email;
    const [rows, setRows] = useState([]);
    const getProduct = async () => {
        const res = await ApiService.get(`/getproduct/${email}`)
        if (res.status == 200) {
            setRows(res.data.data);
        }
    }
    useEffect(() => {
        getProduct()
    }, [])

    return (
        <tableProductData.Provider value={{ rows, setRows, getProduct }}>
            {children}
        </tableProductData.Provider>
    )
}
export default TableContext