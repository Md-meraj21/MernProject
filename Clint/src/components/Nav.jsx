import React from "react";
import { IoLocationSharp } from "react-icons/io5";
function Nav() {
    return (
        <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px]
         fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible ">
            <h1 className="text-3xl font-bold  text-[#ff4d2d] ">FoodFly</h1>
            <div className="w-[60%] md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg flex items-center gap-[20px] ">
                <div className="flex items-center gap-2 text-gray-700">
                    <IoLocationSharp className="text-[#ff4d2d] text-xl" />
                    <div>
                        Bihar
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Nav;