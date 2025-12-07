import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Lucide (outline only, no filled variants)
import { User, Bell } from "lucide-react";

// React Icons – outline + solid pairs
// import { FaHome } from "react-icons/fa";
import { HiOutlineInformationCircle, HiOutlineHome, HiInformationCircle } from "react-icons/hi2";
import { IoTrophyOutline, IoTrophySharp } from "react-icons/io5";
import { FaTrophy } from "react-icons/fa";
import { BiHomeSmile, BiSolidHomeSmile } from "react-icons/bi";

// Team (outline + solid)
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiUserGroup } from "react-icons/hi2"; // solid

// Login / Logout (outline + solid-like)
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";


const MobileBottomNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.remove("userId");
    Cookies.remove("email");
    Cookies.remove("first_name");

    navigate("/");
  };

  let user = null;
  try {
    const userCookie = Cookies.get("user");
    if (userCookie) user = JSON.parse(userCookie);
  } catch {
    user = null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-4px_15px_rgba(0,0,0,0.08)] border-t border-gray-200">
      <div className="flex justify-between items-center px-4 py-3">
        
        <NavItem
          to="/"
          icon={BiHomeSmile}
          filledIcon={BiSolidHomeSmile}
          label="Home"
        />

        <NavItem
          to="/about-us"
          icon={HiOutlineInformationCircle}
          filledIcon={HiInformationCircle}
          label="About us"
        />

        <NavItem
          to="/tournaments"
          icon={IoTrophyOutline}
          filledIcon={IoTrophySharp}
          label="Tournaments"
        />

        {user ? (
          <>
            <NavItem
              to="/add-team"
              icon={HiOutlineUserGroup}
              filledIcon={HiUserGroup}
              label="Team"
            />

            <div onClick={handleLogout}>
              <NavItem
                icon={HiOutlineLogout}
                filledIcon={HiOutlineLogout}
                label="Logout"
              />
            </div>
          </>
        ) : (
          <NavItem
            to="/login"
            icon={HiOutlineLogin}
            filledIcon={HiOutlineLogin}
            label="Login"
          />
        )}

      </div>
    </div>
  );
};


// 🔥 NavItem with forced gray + filled/outline switching
const NavItem = ({ to, icon: Icon, filledIcon: FilledIcon, label }) => (
  <NavLink to={to || "#"} className="text-gray-600">
    {({ isActive }) => (
      <div className="flex flex-col items-center gap-1 transition-all duration-300">
        {isActive ? (
          <FilledIcon size={26} className="text-gray-600" />
        ) : (
          <Icon size={26} className="text-gray-600" />
        )}
        <span className="text-[10px] font-medium text-gray-600">
          {label}
        </span>
      </div>
    )}
  </NavLink>
);

export default MobileBottomNav;
