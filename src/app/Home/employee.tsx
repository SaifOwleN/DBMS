"use client";
import services from "@/services";
import { useEffect, useState } from "react";

interface Employee {
  Address: string | null;
  Age: number;
  EmployeeID: number;
  EmployeeName: string;
  ISFullTime: boolean;
  Position: string;
}

const Employees = () => {
  const [emp, setEmp] = useState<Employee[]>([]);

  useEffect(() => {
    const func = async () => {
      const employees = await services.getEmployees();
      setEmp(employees);
    };
    func();
  }, []);

  const renderEmployees = () => {
    return (
      emp != null && (
        <div className="flex">
          {emp.map((em) => (
            <div key={em.EmployeeID} className="card border border-black">
              <div className="card-body">{em.EmployeeName}</div>
            </div>
          ))}
        </div>
      )
    );
  };

  return <>{renderEmployees()}</>;
};

export default Employees;
