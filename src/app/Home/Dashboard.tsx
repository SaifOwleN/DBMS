import { Raleway } from "next/font/google";
import Link from "next/link";

const Dashboard = () => {
  const reta = () => {
    const arr = ["Cars", "Employees", "Employeehours", "Overtimes", "Trips"];
    return arr.map((xdd) => {
      return (
        <div key={xdd} className="card shadow-xl w-96">
          <div className="card-body ">{xdd}</div>
          <div className="card-actions justify-around my-4">
            <Link href={`Home/Schema?table=${xdd}`} className="btn btn-primary">
              Schema
            </Link>
            <Link
              href={`Home/Entries?table=${xdd}`}
              passHref
              className="btn btn-secondary "
            >
              Entries
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="m-10 flex gap-20 font-raleway flex-wrap">{reta()}</div>
  );
};
export default Dashboard;
