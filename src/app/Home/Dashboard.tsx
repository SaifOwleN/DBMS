import Link from "next/link";

const Dashboard = () => {
  const Tables = () => {
    const arr = [
      "Cars",
      "Employees",
      "EmployeeHours",
      "Overtime",
      "Trips",
      "Fuel",
    ];

    return arr.map((xdd) => {
      return (
        <div key={xdd} className="card shadow-md w-96">
          <div className="card-body">{xdd}</div>
          <div className="card-actions justify-around my-4">
            <Link href={`Home/Schema?table=${xdd}`} className="btn btn-primary">
              Schema
            </Link>
            <Link
              href={`Home/Entries?table=${xdd}`}
              passHref
              className="btn btn-secondary"
            >
              Entries
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="py-10 pl-10">
      <h1 className="font-bold text-3xl ml-2 font-poppins mb-8">Data Tables</h1>
      <div className="flex gap-10 font-raleway flex-wrap">{Tables()}</div>
    </div>
  );
};
export default Dashboard;
