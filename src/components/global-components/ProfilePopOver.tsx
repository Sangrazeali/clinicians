import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context-api";
import { removeAccessTokenCookie } from "../../utils/cookies-actions/user.cookies";
import constantPaths from "../../routes/constantPaths";

type Props = {
  setIsLogoutClicked?: (e: boolean) => void;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfilePopOver = ({ setDropdownOpen, setIsLogoutClicked }: Props) => {
  const navigate = useNavigate();
  const { state,dispatch } = useAppContext();
  const userData = state.dashboard_data;
  const profileImg =
    "https://admin.homnifi.codeinprogress.net/img/Profile/profile.jpg";
  const user = {
    username: userData?.userName,
    email: userData?.email,
    profilePicture: userData?.profilePicture,
  };

  const handleLogout = () => {
    removeAccessTokenCookie();
    dispatch({ type: "DASHBOARD_DATA", payload: null });
    navigate(`${constantPaths.SIGN_IN}`)
  };

  return (
    <>
      <div className='flex flex-col absolute top-2.5 right-0 w-60 bg-white border border-borderLightGray shadow-lg h-auto rounded-lg'>
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
              <p
                className='text-sm font-medium leading-0 flex items-center gap-2'
              // onClick={() => setDropdownOpen(false)}
              >
                @{user?.username}
              </p>
              <p
                className='text-xs text-app-gray-400'
              >
                {user?.email}
              </p>
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
          <button onClick={() => { handleLogout() }} className='font-medium flex items-center gap-1 text-sm text-app-gray-400 hover:text-red-600 transition-all py-3 px-4'>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(ProfilePopOver);