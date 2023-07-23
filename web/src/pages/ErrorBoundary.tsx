import { FC } from "react";
import { useRouteError, Link } from "react-router-dom";

interface ErrorBoundaryProps {}

const ErrorBoundary: FC<ErrorBoundaryProps> = ({}) => {
  let error = useRouteError();
  console.error(error);
  return (
    <main className="flex h-screen flex-col w-full justify-center items-center">
      <h1 className="text-4xl">Not Found</h1>
      <Link to="/login" className="mt-4 text-primary text-lg underline">
        Login
      </Link>
    </main>
  );
};

export default ErrorBoundary;
