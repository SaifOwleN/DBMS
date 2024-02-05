interface Car {
  regNumber: string;
  make: string;
  model: string;
  totalMiles: number;
  EmployeeID: number;
}

export interface SortT {
  key: string;
  order: boolean;
}

export interface Schema {
  EmployeeID: number;
  EmployeeName: string;
  Age: number;
  Position: string;
  Address?: string;
  ISFullTime: boolean;
}

interface Employee {
  EmployeeID: number | string;
  id: number | string;
  regNumber: number | string;
  EmployeeName: string;
  Age: number;
  Position: string;
  Address: string | null;
  ISFullTime: boolean;
}

export interface TableDefinition {
  name: string;
  type: string;
  max: number | string;
  required: boolean;
  primaryKey: boolean;
}
export interface Tables {
  [key: string]: TableDefinition[];
  Cars: TableDefinition[];
  Employees: TableDefinition[];
  EmployeeHours: TableDefinition[];
  Fuel: TableDefinition[];
  Overtime: TableDefinition[];
  Trips: TableDefinition[];
}

export interface User {
  name: string;
  username: string;
  token: string;
  userID: string;
}

export const getUserFromLocalStorage = (): User | null => {
  try {
    const user = JSON.parse(localStorage.getItem("SignedUser") as string);
    return user;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

export type Data = Employee;
