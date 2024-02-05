"use client";
import services from "@/services";
import { Data, SortT } from "@/utils";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { RxDotFilled } from "react-icons/rx";
import Header from "./Header";
import { GoTrash } from "react-icons/go";
import { Schema } from "yup";

const Entries = () => {
  const route = useSearchParams().get("table");
  const [data, setData] = useState<Data[]>([]);

  const [schema, setSchema] = useState<Schema[]>([]);
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState<SortT | undefined>();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await services.getEntries(route as string);
        console.log("data", data);
        setData(data);
      } catch (err) {
        console.log(err);
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            setError("session expired. redirecting to login page");
            localStorage.removeItem("SignedUser");
            setTimeout(() => {
              setError(undefined);
              router.push("/login");
            }, 5000);
          }
        }
      }
    };
    const getSchema = async () => {
      const data = await services.getOneSchema(route as string);
      setSchema(data);
      console.log("data", data);
    };
    getData();
    getSchema();
  }, [route]);

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
  const tableHead = () => {
    if (!data || !data[0]) {
      return null;
    }
    return Object.entries(data ? data[0] : {}).map(([key, xdd], index) => {
      if (typeof xdd == "number") {
        return (
          <th key={key}>
            <div className="tooltip" data-tip={schema[index]?.type}>
              <label
                onClick={() => changeSort(key)}
                key={key}
                style={{ userSelect: "none" }}
                className="inline-flex items-center cursor-pointer"
              >
                {key}
                {sortValue?.key == key ? (
                  sortValue.order ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowUp />
                  )
                ) : (
                  <RxDotFilled />
                )}
              </label>
            </div>
          </th>
        );
      }
      return (
        <th key={key}>
          <span className="tooltip" data-tip={schema[index]?.type}>
            <label style={{ userSelect: "none" }}>{key}</label>
          </span>
        </th>
      );
    });
  };

  const deleteEntry = async (id: number | string) => {
    try {
      await services.deleteEntry(route as string, id);
      window.location.reload();
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
        setError(
          "An Error Has Occured when deleting the entry. Please try again later.",
        );
        setTimeout(() => {
          setError(undefined);
        }, 5000);
      }
    }
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
          {Object.entries(attr).map(([key, value]) => {
            return (
              <td key={key}>
                {typeof value === "boolean" ? (
                  value === true ? (
                    <span className="text-blue-600">True</span>
                  ) : (
                    <span className="text-red-600">False</span>
                  )
                ) : (
                  value
                )}
              </td>
            );
          })}
          <button
            className="inline-flex py-3 px-4 text-lg"
            onClick={() => {
              document.getElementById("modal_delete").showModal();
            }}
          >
            <GoTrash />
          </button>
          <dialog id="modal_delete" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Carefull</h3>
              <p className="py-4">
                You are about to delete{" "}
                {route?.endsWith("s")
                  ? route?.substring(0, route.length - 1)
                  : route}
                with {attr.EmployeeID}. Are You Sure?
              </p>
              <div className="flex justify-end py-2">
                <button
                  className="btn btn-primary"
                  onClick={() => deleteEntry(attr.EmployeeID)}
                >
                  Yes
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button className="cursor-default" />
            </form>
          </dialog>
        </tr>
      ));
  };

  return (
    <>
      <div className={`p-10 w-full`}>
        <div className="mb-8 ml-2">
          <Header search={search} setSearch={setSearch} route={route} />
        </div>
        <table
          className={`table table-zebra ${
            !data || data.length !== 0 ? "block" : "hidden"
          }`}
        >
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
            {error}
          </div>
        </div>
      }
    </>
  );
};

export default Entries;
