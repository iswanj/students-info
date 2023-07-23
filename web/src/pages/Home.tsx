import { FC } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  const { user, logout } = useAuth();
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Header>
        <div className="flex flex-row gap-2 items-center">
          <h4 className="text-sky-600"> {user?.name}</h4>
          <button className="btn btn-secondary" onClick={() => logout()}>
            Sign Out
          </button>
        </div>
      </Header>
      <div className="flex flex-row">
        <Sidebar />
        <div className="p-4">
          <h1 className="text-lg">Hello</h1>
        </div>
      </div>
    </main>
  );
};

export default Home;
