"use client";
import services from "@/services";
import { TableDefinition, Tables } from "@/utils";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";

const Schema = () => {
  const route = useSearchParams().get("table");
  const [schema, setSchema] = useState<TableDefinition[]>([]);
  const [error, setError] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const getSchema = async () => {
      try {
        const tablesData = await services.getOneSchema(route as string);
        setSchema(tablesData);
      } catch (err) {
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

  const showSchema = () => {
    return schema?.map((attr) => (
      <tr key={attr.name}>
        <td>
          {attr.name}
          {attr.primaryKey ? (
            <span className="ml-2 badge badge-secondary badge-outline">
              Primary Key
            </span>
          ) : null}
        </td>
        <td>{attr.type}</td>
        <td>{String(!attr.required)}</td>
        <td>{attr.max ?? "Has No Max Value"}</td>
      </tr>
    ));
  };

  return (
    <>
      <div
        className={`p-10 w-full ${
          !schema || schema.length !== 0 ? "block" : "hidden"
        }`}
      >
        <h1 className="ml-2 mb-8 text-3xl text-slate-600 font-bold font-poppins">
          {route} Schema
        </h1>
        <table className="table">
          <thead>
            <tr style={{ userSelect: "none" }}>
              <th>Column</th>
              <th>Type</th>
              <th>Required</th>
              <th>Max Value</th>
            </tr>
          </thead>
          <tbody>{showSchema()}</tbody>
        </table>
      </div>
      <div className={`toast m-6 ${error ? "block" : "hidden"}`}>
        <div className="alert alert-error flex items-center">
          <span className="text-xl">
            <BiSolidError />
          </span>
          session expired. redirecting to login page
        </div>
      </div>
    </>
  );
};

export default Schema;
