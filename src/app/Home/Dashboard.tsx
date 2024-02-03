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
        <div key={xdd} className="card shadow-xl w-96">
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
            <Link
              href={`Home/NewEntry?table=${xdd}`}
              passHref
              className="btn btn-accent"
            >
              Add
            </Link>
            <Link
              href={`Home/Bulk?table=${xdd}`}
              passHref
              className="btn btn-warning"
            >
              Bulk
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="m-10">
      <h1 className="font-bold text-2xl ">Data Entries</h1>
      <div className="my-10 flex gap-10 font-raleway flex-wrap">{Tables()}</div>
    </div>
  );
};
export default Dashboard;
