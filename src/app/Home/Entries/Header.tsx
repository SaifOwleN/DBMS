import React from "react";
import { CiSearch } from "react-icons/ci";
import SingleEntry from "./SingleEntry";
import BulkEntry from "./BulkEntry";

const Header = ({
  route,
  search,
  setSearch,
}: {
  route: string | null;
  search: string;
  setSearch: Function;
}) => {
  return (
    <div className="flex justify-between">
      <h1 className="text-3xl text-slate-600 font-bold font-poppins">
        {route}
      </h1>
      <div className="flex items-center w-7/12 gap-2">
        <div className="w-full relative flex items-center">
          <CiSearch className="absolute left-5 text-2xl" />
          <input
            className="input input-primary w-full rounded-box pl-14"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </div>

        <button
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className="btn btn-primary"
        >
          Add {route}
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-xl">Hello!</h3>
            <p className="py-4">Select the Preferred Method for Data Entry</p>
            <div className="flex justify-around py-2">
              <button
                className="btn btn-primary"
                onClick={() =>
                  document.getElementById("Modal_AddSingle").showModal()
                }
              >
                Single
              </button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  document.getElementById("Modal_AddBulk").showModal()
                }
              >
                Bulk
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button className="cursor-default" />
          </form>
        </dialog>
        <SingleEntry />
        <BulkEntry />
      </div>
    </div>
  );
};

export default Header;
