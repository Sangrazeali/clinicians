import React from "react";
import { Link } from "react-router-dom";
import { InfoCircle, Logo, Note } from "../images";
import Dropdown from "./global-components/Dropdown";


interface HeaderProps {
  title: string;
  isCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  isCollapsed,
}) => {

  const pages = ["New notes", "Clients", "Clinicians", "Templates"];

  return (
    <header className='bg-white shadow pt-4 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto flex flex-wrap space-y-5 items-center justify-center lg:justify-between  space-x-5'>
        <div className="flex  items-center space-x-4">
          <Link to={`/`}>
            <div className='bg-white px-2'>
              <img src={Logo} className='' />
            </div>
          </Link>
          <p className="bg-[#F8CDD9] text-black text-sm px-2 py-1 rounded-md">PRO</p>
        </div>
        <div className="flex  items-center justify-between space-x-5">
          {pages && pages?.map((page, index) => {
            return (
              <Link to={`/${page.toLowerCase()}`} key={index}>
                <p className='text-sm  md:text-base  text-app-secondary border-opacity-0 transition-all ease-in-out hover:border-opacity-100 hover:text-app-primary border-b-3 border-app-primary pb-4 '>
                  {page}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="pb-4">
          <p className="bg-gradient-to-r from-[#DE0D6F] to-[#731054] bg-clip-text text-transparent">
            Earn $80
          </p>
        </div>
        <div className="flex space-x-3 items-center pb-4">
          <img src={Note} alt="" />
          <p className="text-app-secondary">12 notes left</p>
          <img src={InfoCircle} alt="" />
        </div>
        <div className="pb-4">
          <button className="bg-gradient-to-r from-[#DE0D6F] to-[#731054] text-white px-4 py-2 rounded-md">Become Super</button>
        </div>
        <div className="pb-4">
          <Dropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;