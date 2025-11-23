import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [glow, setGlow] = useState(false);

  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  // function for adding the list
  const handleSave = (e) => {
    e.preventDefault();

    if (todo.trim() == "") return;
    setList([...list, todo]);
    setTodo("");

    // Trigger glow effect
    setGlow(true);
    setTimeout(() => {
      setGlow(false);
    }, 1000);
  };

  // function for deleting the list
  const handleDelete = (index) => {
    const updateList = list.filter((_, i) => i !== index);
    setList(updateList);
  };

  // function for edit the list
  const handleEdit = (index) => {
    if (editIndex === index) {
      // if already editing save changes
      const updatedList = [...list];
      updatedList[index] = editText; // this will replace with new text
      setList(updatedList);
      setEditIndex(null); // Exit from edit mode
      setEditText("");
    } else {
      // Enter in edit mode
      setEditIndex(index);
      setEditText(list[index]);
    }
  };

  return (
    <>
      <div
        className={` bg-gray-900 relative duration-300 p-10 mt-2 rounded-2xl ${
          glow ? "shadow-[0_0_25px_5px_rgba(255,255,255,0.15)]" : ""
        }`}
      >
        <h1 className=" text-white bg-transparent mb-7 font-semibold text-3xl">
          Focus List
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("loggedInUser");
            navigate("/login");
          }}
          className="bg-amber-50 text-black hover:bg-sky-600 hover:text-white 
                       duration-300 absolute top-4 right-4 text-sm rounded-lg mt-2 px-3 py-2 cursor-pointer"
        >
          Logout
        </button>
        <p className="text-white text-lg mb-3">
          Welcome <span className="font-bold">{loggedUser?.username}</span>,
          prepare your focus list here
        </p>

        <form
          onSubmit={handleSave}
          className=" bg-amber-50 m-auto flex justify-center rounded-lg"
        >
          <input
            value={todo} // This will control the input
            onChange={(e) => setTodo(e.target.value)} // This will update the "State"
            className=" flex flex-auto border-none focus:outline-none ring-0 focus:ring-gray-400/40 focus:rounded-md focus:ring-2 m-2 pl-1"
            type="text"
            placeholder="Enter Todo"
          />
          <button
            type="submit"
            className=" md:px-10 m-2 md:py-2 px-5 py-1  rounded-lg bg-blue-500 hover:bg-blue-300 text-white cursor-pointer justify-items-center"
          >
            Save
          </button>
        </form>
        <ul className=" flex flex-col items-center mt-4">
          {list.map((item, index) => (
            <li
              key={index}
              className=" flex justify-between items-center text-white hover:bg-gray-600 hover:scale-105 hover:shadow-[0_0_25px_5px_rgba(255,255,255,0.15)] transition duration-300 border-1 m-2 py-2 px-4 rounded-3xl sm:w-2xl md:w-3xl lg:w-4xl"
            >
              {/* Show input if editing, else normal text */}
              {editIndex === index ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="text-white p-1 rounded w-full bg-transparent border-none focus:outline-none focus:ring-0"
                />
              ) : (
                <span>{item}</span>
              )}

              <div className=" flex gap-1">
                <button
                  onClick={() => handleEdit(index)}
                  className=" bg-green-600 hover:bg-green-400 ml-10 px-3 border-2 rounded-l-lg cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(index)}
                  className=" bg-red-600 hover:bg-red-400 mr-0 px-2 border-2 rounded-r-lg cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
