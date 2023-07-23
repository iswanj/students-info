/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">Result Info</a>
      </div>
      <div className="navbar-end">{children}</div>
    </div>
  );
};

export default Header;
