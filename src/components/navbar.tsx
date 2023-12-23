const NavBar = () => {
  return (
    <div className="navbar bg-base-100 shadow shadow-black flex justify-between">
      <h1 className="text-2xl">Dashboard</h1>
      <div className="flex gap-4">
        <button className="btn btn-primary">Button</button>
        <button className="btn btn-primary">Button</button>
        <button className="btn btn-primary">Button</button>
      </div>
    </div>
  );
};

export default NavBar;
