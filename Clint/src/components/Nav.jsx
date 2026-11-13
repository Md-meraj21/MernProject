import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { CiBag1 } from "react-icons/ci";
import { BsPersonArmsUp } from "react-icons/bs";
import { LiaHeart } from "react-icons/lia";
function Nav() {
    return (
        <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px]
         fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible ">
            <h1 className="text-3xl font-bold  text-[#ff4d2d] ">FoodFly</h1>
            <div className="w-[60%] md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg flex items-center gap-[20px] ">
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
            <div>
                <LiaHeart size={25} />
            </div>
            {/* cart */}
            <div>
                <CiBag1 size={25} />
            </div>
            {/* profile  */}
            <div>
                <BsPersonArmsUp size={25} />
            </div>
        </div>
    )
}

export default Nav;