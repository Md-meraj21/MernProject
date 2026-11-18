import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { CiBag1 } from "react-icons/ci";
import { LiaHeart } from "react-icons/lia";
import { useSelector } from "react-redux";
function Nav() {
    const { userData } = useSelector(state => state.user);
    return (
        <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px]
         fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible ">
            <h1 className="text-3xl font-bold  text-[#ff4d2d] ">FoodFly</h1>
            <div className="w-[60%] md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg md:flex hidden items-center gap-[20px] ">
                <div className="flex items-center gap-2 text-gray-700 w-[100%]">
                    <IoLocationSharp className="text-[#ff4d2d] text-xl" />
                    <div className="truncate">
                        Bihar
                    </div>
                    <div className="flex items-center gap-[10px]">
                        <IoSearchSharp size={20} className="text-[#ff4d2d] text-xl" />
                        <input type="text" placeholder="Search" className="w-[50%] text-gray-700 outline-0" />
                    </div>
                </div>
            </div>
            {/* wishlist */}
            <div className="relative cursor-pointer">
                <LiaHeart size={25} className="text-[#ff4d2d]" />
                <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">0</span>
            </div>
            {/* cart */}
            <div className="relative cursor-pointer">
                <CiBag1 size={25} className="text-[#ff4d2d]" />
                <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">0</span>
            </div>
            {/* button */}
            <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium cursor-pointer">
                my order
            </button>
            {/* prfile */}
            <div className="w-9 h-9 min-w-[36px] rounded-full bg-[#ff4d2d] text-white 
            flex items-center justify-center font-bold text-base shadow cursor-pointer">
                {(userData?.fullname || userData?.email)?.slice(0, 1).toUpperCase()}
            </div>
        </div>
    )
}

export default Nav;