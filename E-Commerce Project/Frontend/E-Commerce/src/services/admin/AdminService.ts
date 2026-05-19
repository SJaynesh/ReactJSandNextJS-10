import axios from "axios";

const BASE_URL = "http://localhost:8000/api/admin";


export const fetchAllAdmin = async () => {
    try {

        const token = localStorage.getItem('authAdminToken');
        const res = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Response : ", res.data);

        return res.data;
    } catch (error) {
        console.log("Fetch All Admin Failed");
        console.log("Error : ", error);
    }
}