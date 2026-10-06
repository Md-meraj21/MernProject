import { useEffect, useContext } from "react";
import { serverUrl } from "../App";
import axios from "axios";
import { AppContext } from "../Context/appContext";

function useGetCurrentUser() {
    const { setUser } = useContext(AppContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/current`, {
                    withCredentials: true,
                });
                console.log(result);
                if (setUser) {
                    setUser(result.data);
                }
            } catch (error) {
                // If not logged in (401 or 400), don't throw an error; keep user null
                if (error.response?.status === 401 || error.response?.status === 400) {
                    if (setUser) setUser(null);
                    return;
                }
                console.error("Error fetching current user:", error);
            }
        };
        fetchUser();
    }, [setUser]);
}

export default useGetCurrentUser;