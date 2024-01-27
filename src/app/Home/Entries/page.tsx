"use client";
import services from "@/services";
import { Data } from "@/utils";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiArrowToBottom, BiArrowToTop, BiSolidError } from "react-icons/bi";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";

interface SortT {
  key: string;
  order: boolean;
}

const Entries = () => {
  const route = useSearchParams().get("table");
  const [data, setData] = useState<Data[]>([]);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState<SortT | undefined>();

  useEffect(() => {
    const getSchema = async () => {
      try {
        const data = await services.getEntries(route as string);
        console.log("data", data);
        setData(data);
      } catch (err) {
        console.log(err);
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            setError(true);
            localStorage.removeItem("SignedUser");
            setTimeout(() => {
              setError(false);
              router.push("/login");
            }, 5000);
          }
        }
      }
    };
    getSchema();
  }, [route]);

  const tableHead = () => {
    if (!data || !data[0]) {
      return null;
    }
    return Object.entries(data ? data[0] : {}).map(([name, _]) => {
      return <th key={name}>{name}</th>;
    });
  };

  const changeSort = (key: string) => {
    if (sortValue) {
      if (sortValue?.order && sortValue.key === key) {
        setSortValue({ key, order: false });
      } else if (sortValue?.order == false && sortValue.key === key) {
        setSortValue(undefined);
      } else {
        setSortValue({ key, order: true });
      }
    } else {
      setSortValue({ key, order: true });
    }
  };

  const Filters = () => {
    return (
      <div className="flex justify-evenly mb-4">
        <input
          className="input input-primary w-7/12 rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
        <div className="Filters dropdown">
          <button role="button" tabIndex={0} className="btn">
            Sort By
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 z-[1] shadow bg-base-100 rounded-box w-52"
          >
            {data.length !== 0
              ? Object.entries(data[0]).map(([key, value]) => {
                  if (typeof value === "number") {
                    return (
                      <li>
                        <a
                          key={key}
                          onClick={() => changeSort(key)}
                          className="flex justify-between"
                        >
                          {key}
                          {sortValue?.key == key ? (
                            sortValue.order ? (
                              <FaArrowDown />
                            ) : (
                              <FaArrowUp />
                            )
                          ) : null}
                        </a>
                      </li>
                    );
                  }
                  return null;
                })
              : null}
          </ul>
        </div>
      </div>
    );
  };

  const showData = () => {
    return data
      ?.filter((attr) => {
        for (let key in attr) {
          // @ts-ignore
          if (attr[key]?.toString().includes(search)) {
            return true;
          }
        }
        return false;
      })
      .sort((a, b) => {
        if (sortValue !== undefined) {
          return sortValue.order == true
            ? // @ts-ignore
              a[sortValue.key] - b[sortValue.key]
            : // @ts-ignore
              b[sortValue.key] - a[sortValue.key];
        }
        return 1;
      })
      .map((attr) => (
        <tr key={attr.EmployeeID}>
          {Object.entries(attr).map(([key, value]) => (
            <td key={key}>
              {typeof value === "boolean" ? String(value) : value}
            </td>
          ))}
        </tr>
      ));
  };

  return (
    <>
      <div
        className={`my-10 p-10 pt-5 ${
          !data || data.length !== 0 ? "block" : "hidden"
        }`}
      >
        {Filters()}
        <table className="table">
          <thead>
            <tr>{tableHead()}</tr>
          </thead>
          <tbody>{showData()}</tbody>
        </table>
      </div>
      {
        /* Session Expired Toast */
        <div className={`toast m-6 ${error ? "block" : "hidden"}`}>
          <div className="alert alert-error flex items-center">
            <span className="text-xl">
              <BiSolidError />
            </span>
            session expired. redirecting to login page
          </div>
        </div>
      }
    </>
  );
};

export default Entries;
