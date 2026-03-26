import { ToastContainer } from "react-toastify";
import Form from "./components/Form";
import Table from "./components/Table";
import { useState, useEffect } from "react";

export default function App() {

  const [allStudents, setAllStudents] = useState<studentType[]>(JSON.parse(localStorage.getItem('students') || "[]"));

  useEffect(() => {
    console.log("Use Effect : ", allStudents);

    localStorage.setItem("students", JSON.stringify(allStudents));
  }, []);

  type studentType = {
    fName: string,
    lName: string,
    email: string,
    phone: string,
    gender: string,
    hobby: string[],
    city: string,
    address: string
  };
  return <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Form allStudents={allStudents} setAllStudents={setAllStudents} />

        <Table allStudents={allStudents} />
      </div>
      <ToastContainer />
    </div>
  </>
}