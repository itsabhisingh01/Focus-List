import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("⚠ Please fill all fields");
      return;
    }

    const foundUser = users.find((u) => u.username === username);

    if (!foundUser) {
      alert("⚠ No such user found, please sign up first");
      return;
    }

    if (foundUser.password !== password) {
      alert("⚠ Incorrect password");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    alert("🎉 Logged in successfully!");

    setUsername("");
    setPassword("");

    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <form
        onSubmit={handleLogin}
        className="bg-sky-800 w-[350px] p-8 hover:rounded-2xl text-white text-lg 
        flex flex-col gap-y-5 shadow-2xl
        transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_5px_rgba(255,255,255,0.15)] hover:bg-sky-700"
      >
        <h1 className="text-2xl font-semibold text-center">Log In</h1>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-start">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-amber-50 text-black text-sm focus:outline-none placeholder:text-sm py-2 px-3 rounded-lg"
            type="text"
            placeholder="Enter Username"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm text-start">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-amber-50 text-black text-sm focus:outline-none placeholder:text-sm py-2 px-3 rounded-lg"
            type="password"
            placeholder="Enter Password"
          />
        </div>

        <div>
        <button
          type="submit"
          className="bg-amber-50 w-1/4 self-center text-black hover:bg-gray-800 hover:text-white 
          duration-300 text-sm rounded-xl mr-3 mt-2 px-1 py-2 cursor-pointer"
        >
          LogIn
        </button>
        <button
          onClick={handleSignup}
          type="submit"
          className="bg-amber-50 w-1/4 self-center text-black hover:bg-gray-800 hover:text-white 
          duration-300 text-sm rounded-xl mt-2 px-1 py-2 cursor-pointer"
        >
          SignUp
        </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
