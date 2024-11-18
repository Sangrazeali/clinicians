import { AuthBannerBG } from "../../images";

function AuthBanner() {
  return (
    <div className='lg:py-8'>
      <img
        src={AuthBannerBG}
        className='w-full h-auto'
        alt='Auth Banner'
      />
    </div>
  );
}
export default AuthBanner;