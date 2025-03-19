import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import InputField from "../components/InputField";

function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isVisible, setIsVisible] = useState(false);

  const signOutHandler = () => {
    removeCookie("token");
  };
  return (
    <div>
      <h1>Home page</h1>
      <button
        onClick={() => {
          setIsVisible(true);
        }}
      >
        Add Task
      </button>
      {/* <Spinner/> */}
      <Modal title="Add Task"  isVisible={isVisible} setIsVisible={setIsVisible}>
        <InputField type={"text"} name={"m"} label="Title" />
        <div className="col-span-2 sm:col-span-1 pt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Status
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option selected={true}>Select status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Unassigned">Unassigned</option>
          </select>
        </div>
        <div className="col-span-2 pt-4 pb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Task Description
          </label>
          <textarea
            id="description"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write Task description here"
          ></textarea>
        </div>

        <button
          type="submit"
          className="text-white inline-flex items-center float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          <svg
            className="me-1 -ms-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Add Task
        </button>
      </Modal>
      <button onClick={signOutHandler}>Sign out</button>
    </div>
  );
}

export default Home;
