"use client";
import services from "@/services";
import { table } from "console";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { object } from "yup";

interface TableDefinition {
  name: string;
  type: string;
  allowNull: boolean;
}

interface Tables {
  [key: string]: TableDefinition[];
  Cars: TableDefinition[];
  Employees: TableDefinition[];
  EmployeeHours: TableDefinition[];
  Fuel: TableDefinition[];
  Overtime: TableDefinition[];
  Trips: TableDefinition[];
}

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
    return schema.map((attr) => (
      <tr key={attr.name}>
        <td>{attr.name}</td>
        <td>{attr.type}</td>
        <td>{String(!attr.allowNull)}</td>
      </tr>
    ));
  };

  return (
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
  );
};

export default Schema;
