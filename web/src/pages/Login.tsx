import { FC, useCallback, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface LoginProps {}
interface ApiResponse {
  error: boolean;
  name: string;
  token: string;
}

const Login: FC<LoginProps> = ({}) => {
  const { login } = useAuth();
  const username = useRef("");
  const password = useRef("");

  const handleSubmit = useCallback(async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login`;

      const res = await axios.post<ApiResponse>(url, {
        username: username.current,
        password: password.current,
      });
      if (!res.data.error) {
        login(res.data);
      }
    } catch (error) {
      console.log("error login: ", error);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="card w-96 bg-base-300 shadow-xl">
        <div className="card-body">
          <div className="flex justify-center">
            <h2 className="card-title pb-2">Login</h2>
          </div>

          <div className="card-actions justify-end">
            <input
              type="text"
              placeholder="Username"
              className="input w-full max-w-xs"
              onChange={(e) => (username.current = e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input w-full max-w-xs"
              onChange={(e) => (password.current = e.target.value)}
            />
            <div className="flex w-full">
              <button className="btn btn-primary btn-block" onClick={handleSubmit}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
