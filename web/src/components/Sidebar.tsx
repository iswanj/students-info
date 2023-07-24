import { FC, useCallback } from "react";
import { Subjects } from "../types";

interface SidebarProps {
  onChangeValues: (name: string, value: string) => void;
  subjects: Subjects[];
}

const Sidebar: FC<SidebarProps> = ({ onChangeValues, subjects }) => {
  const changeYear = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const year = e.target.value;
      onChangeValues("year", year);
    },
    [onChangeValues]
  );
  const changeSubject = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const subjectId = e.target.value;

      onChangeValues("subjectId", subjectId);
    },
    [onChangeValues]
  );
  return (
    <div className="flex w-80 drawer drawer-open bg-base-200">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay  px-4">
          Filter
        </label>
        <div className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          <div className="mb-2">
            <select className="select select-bordered w-full max-w-xs" onChange={changeYear}>
              <option disabled selected>
                By Year
              </option>
              <option value="0">All</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <div className="mb-2">
            <select className="select select-bordered w-full max-w-xs" onChange={changeSubject}>
              <option disabled selected>
                By Subject
              </option>
              <option value="0">All</option>
              {subjects.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
