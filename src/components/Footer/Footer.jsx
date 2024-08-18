import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot, FaSquareFacebook } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#003049]">
      <div className="container text-white">
        <div className="grid grid-cols-4 gap-3 lg:gap-12 py-20">
          <div>
            <Link to="/" className="text-md lg:text-xl font-bold text-gray-200">
              <span className="text-[#DB2777]">OnLine</span> Academy
            </Link>
            <p className="mt-6 text">
              Unleash Your Potential: Learn, Grow, Thrive.
            </p>
            <div className="mt-2 flex items-center gap-x-4 text-lg">
              <Link to="/" target="_blank">
                <FaSquareFacebook className="text-xl" />
              </Link>
              <Link to="/" target="_blank">
                <IoLogoYoutube className="text-[22px]" />
              </Link>
              <Link to="/" target="_blank">
                <TbWorld className="text-[22px]" />
              </Link>
            </div>
          </div>
          <div className="ml-6">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm">
              <p className="mt-6 ">Free courses</p>
              <p>Live workshops</p>
              <p>blogs</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">About us</h3>
            <div className="flex flex-col gap-2 text-sm">
              <p className="mt-6 ">About OnLine Academy</p>
              <p>About OnLine Academy</p>
              <p>Privacy policy</p>
              <p>Terms and conditions.</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Contact</h3>
            <div className="flex flex-col gap-2 text-sm">
              <p className="mt-6 flex items-center gap-x-1">
                <FaPhoneAlt className="text-xs" /> +880934678221460
              </p>
              <p className="flex items-center gap-x-1">
                <MdEmail className="text-xs mt-[2px]" />{" "}
                contact@onlineacademy.net
              </p>
              <p className="flex items-center gap-x-1">
                <FaLocationDot className="text-xs" /> Gulshan, Dhaka - 1212,
                Bangladesh
              </p>
            </div>
          </div>
        </div>
        <div className=" border-t border-t-gray-300/70 ">
          <p className="text-center py-3 text-sm font-medium">
            &copy;{" "}
            <Link to="/" className="text-[#DB2777]">
              OnLine
            </Link>{" "}
            Academy 2024 - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
