"use client";
import services from "@/services";
import { TableDefinition, Tables } from "@/utils";
import { table } from "console";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { object } from "yup";

const Schema = () => {
  const router = useSearchParams().get("table");
  const [schema, setSchema] = useState<TableDefinition[]>([]);

  useEffect(() => {
    const getSchema = async () => {
      try {
        const tablesData: Tables = await services.getSchema();
        setSchema(tablesData[router as string]);
      } catch (error) {
        console.error("Error fetching schema:", error);
        setSchema([]);
      }
    };

    getSchema();
  }, [router]);

  const showSchema = () => {
    return schema?.map((attr) => (
      <tr key={attr.name}>
        <td>{attr.name}</td>
        <td>{attr.type}</td>
        <td>{String(!attr.allowNull)}</td>
      </tr>
    ));
  };

  return (
    <div className="border border-neutral-800 mx-96 mt-10 p-10">
      <table className="table">
        <thead>
          <tr>
            <th>Column</th>
            <th>Type</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>{showSchema()}</tbody>
      </table>
    </div>
  );
};

export default Schema;
