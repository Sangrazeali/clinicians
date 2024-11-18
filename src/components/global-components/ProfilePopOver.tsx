import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  setIsLogoutClicked?: (e: boolean) => void;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfilePopOver = ({ setDropdownOpen, setIsLogoutClicked }: Props) => {
  const navigate = useNavigate();

  const userProfile = () => navigate("/profile");
  const profileImg =
    "https://admin.homnifi.codeinprogress.net/img/Profile/profile.jpg";
  const user = {
    username: "Sunny",
    email: "sunny@softbuilders.ae",
    profilePicture: "",
  };

  return (
    <>
      <div className='flex flex-col absolute top-0 right-0 left-0 w-60 bg-white border border-borderLightGray shadow-lg h-auto rounded-lg'>
        <div className='w-full flex justify-start gap-2 items-center p-4'>
          <div>
            <div className='w-10 h-10 overflow-hidden'>
              <img
                src={user?.profilePicture ? user?.profilePicture : profileImg}
                alt='Profile'
                className='w-full h-full rounded-full object-cover'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex flex-col gap-0'>
              <Link
                to='/profile'
                className='text-sm font-medium leading-0 flex items-center gap-2'
                // onClick={() => setDropdownOpen(false)}
              >
                @{user?.username}
              </Link>
              <Link
                to='/profile'
                className='text-xs text-app-gray-400'
                onClick={() => {
                  setDropdownOpen && setDropdownOpen(false);
                }}
              >
                {user?.email}
              </Link>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-0'>
          {/* <button
            onClick={() => {
              setDropdownOpen(false);
              userProfile();
            }}
            className='font-medium  flex items-center gap-1 text-sm hover:text-app-primary transition-all py-3 px-4'
          >
            Profile
          </button>*/}
          <hr /> 
          <button className='font-medium flex items-center gap-1 text-sm text-app-gray-400 hover:text-red-600 transition-all py-3 px-4'>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(ProfilePopOver);