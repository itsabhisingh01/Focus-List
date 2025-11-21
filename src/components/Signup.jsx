import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      alert("⚠️ Please fill all fields");
      return;
    } else if (password.length < 6) {
      alert("⚠️ Password must be at least 6 characters");
      return;
    } else if (password !== confirmPassword) {
      alert("⚠️ Confirm Password should match Password");
      return;
    }

    // Check if username already exists
    else if (users.some((user) => user.username === username)) {
      alert("⚠️ Username already exists");
      return;
    }

    // Save new user
    const updateUsers = [...users, { username, password }];
    localStorage.setItem("users", JSON.stringify(updateUsers));
    setUsers(updateUsers);

    alert("🎉 Signed up successfully!");
    setUsername("");
    setPassword("");
    setConfirmPassword("");

    // Redirect to login page after successful signup
    navigate("/login");
  };
  return (
    <>
      {/* Full screen wrapper */}
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        {/* Shrunk form box */}
        <form
          onSubmit={handleSubmit}
          className="bg-sky-800 w-[350px] p-8 hover:rounded-2xl text-white text-lg 
                         flex flex-col gap-y-5 shadow-2xl
                         transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_5px_rgba(255,255,255,0.15)] hover:bg-sky-700"
        >
          <h1 className="text-2xl font-semibold text-center">Sign Up</h1>

          {/* Username */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-start">Set Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-amber-50 text-black text-sm focus:outline-none placeholder:text-sm py-2 px-3 rounded-lg"
              type="text"
              placeholder="Enter Username"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-start">Set Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-amber-50 text-black text-sm focus:outline-none placeholder:text-sm py-2 px-3 rounded-lg"
              type="password"
              placeholder="Enter Password"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-start">Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-amber-50 text-black text-sm focus:outline-none placeholder:text-sm py-2 px-3 rounded-lg"
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-amber-50 w-1/4 self-center text-black hover:bg-gray-800 hover:text-white 
                       duration-300 text-sm rounded-xl mt-2 px-1 py-2 cursor-pointer"
          >
            SignUp
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
