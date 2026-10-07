import { useEffect, useContext } from "react";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function useGetCurrentUser() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/current`, {
                    withCredentials: true,
                });
                dispatch(setUserData(result.data));
            }
            catch (error) {
                // If not logged in (401 or 400), don't throw an error; keep user null
                if (error.response?.status === 401 || error.response?.status === 400) {
                    if (setUser) setUser(null);
                    return;
                }
                console.error("Error fetching current user:", error);
            }
        };
        fetchUser();
    }, []);
}

export default useGetCurrentUser;