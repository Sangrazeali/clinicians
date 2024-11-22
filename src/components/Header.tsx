import React from "react";
import { Link } from "react-router-dom";
import ProfilePopOver from "./global-components/ProfilePopOver";
import { jbLogo } from "../images";
import { useUserActions } from "../context-api/actions";
import { useAppContext } from "../context-api";
import { getAccessTokenFromCookie } from "../utils/cookies-actions/user.cookies";


interface HeaderProps {
  title: string;
  isCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  isCollapsed,
}) => {
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { state } = useAppContext();
  const userData = state?.dashboard_data;
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  return (
    <header className='border-b bg-black p-2 md:p-4'>
      <div className='container mx-auto px-5  flex items-center space-x-3 md:justify-between'>
        <div className=' flex items-center justify-between md:justify-normal space-x-4 w-full'>
          <Link to={`/`}>
            <div className='bg-black px-2'>
              <img src={jbLogo} className='w-40' />
            </div>
          </Link>
          
          {/* <h1 className='capitalize text-2xl'>{title}</h1> */}
        </div>
        {userData && (
          <div className='rounded-full text-sm text-white'>
          <div className='relative'>
            <button
              onClick={toggleDropdown}
              className='flex items-center space-x-2'
            >
              <img
                src={userData?.profilePhoto ? userData?.profilePhoto :'https://admin.homnifi.codeinprogress.net/img/Profile/profile.jpg'}
                alt='Profile'
                className='w-8 h-8 rounded-full'
              />

              <span className='whitespace-nowrap'>{userData?.userName}</span>
              <svg
                className={`w-5 h-5 app-transition-all-300 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill='none'
                stroke='#FFFFFF'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                ></path>
              </svg>
            </button>
            <div
              className={`z-50 absolute top-[35px] right-0 mt-2 w-48 bg-white text-black rounded shadow-lg app-transition-all-300 ${
                isDropdownOpen ? "opacity-100" : "opacity-0 hidden"
              }`}
              ref={dropdownRef}
            >
              <ProfilePopOver setDropdownOpen={setIsDropdownOpen}/>
            </div>
          </div>
        </div>
        )}
        
      </div>
    </header>
  );
};

export default Header;