import { FC } from "react";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  return (
    <div className="flex w-80 drawer drawer-open bg-base-200">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay  px-4">
          Filter
        </label>
        <div className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          <div className="mb-2">
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                By Year
              </option>
              <option>2023</option>
              <option>2021</option>
              <option>2021</option>
            </select>
          </div>
          <div className="mb-2">
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                By Subject
              </option>
              <option>Math</option>
              <option>Chemistry</option>
              <option>Physics</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
