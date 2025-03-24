import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <div className="bg-purple-900 text-white py-4 px-6">
      <nav className="justify-between flex flex-row">
        <p>
          <Link to={"/"}>Color list</Link>
        </p>
        <Link to={"/create"}>
          <PlusIcon className="size-6" />
        </Link>
      </nav>
    </div>
  );
}
