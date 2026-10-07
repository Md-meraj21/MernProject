import { useSelector } from "react-redux"
import UserDashboard from "../components/UserDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryDadhboard from "../components/DeliveryDashboard";

function home() {
    const {userData} = useSelector(state=>state.user);
    return (
        <div className="w-[100px] min-h-[100vh] pt-[100px] flex flex-col item-center bg-[#fff9f6]">
            {userData.role=="user" && < UserDashboard />}
            {userData.role == "owner" && < OwnerDashboard />}
            {userData.role == "Delivery" && < DeliveryDadhboard />}
        </div>
    )
}