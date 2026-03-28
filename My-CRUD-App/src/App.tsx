import { toast, ToastContainer } from "react-toastify";
import Form from "./components/Form";
import Table from "./components/Table";
import { useState, useEffect } from "react";
import type { studentType } from "./utils/global";

export default function App() {

  const [allStudents, setAllStudents] = useState<studentType[]>(JSON.parse(localStorage.getItem('students') || "[]"));

  useEffect(() => {
    console.log("Use Effect : ", allStudents);

    localStorage.setItem("students", JSON.stringify(allStudents));

  }, []);

  const deleteStudent = (index: number) => {

    // const deletedStudents = allStudents.filter((_, i) => i !== index);

    // setAllStudents(deletedStudents);

    setAllStudents(allStudent => allStudent.filter((_, i) => i !== index));

    toast.success("Student deleted successfully..");
  }


  return <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Form allStudents={allStudents} setAllStudents={setAllStudents} />

        <Table allStudents={allStudents} deleteStudent={deleteStudent} />
      </div>
      <ToastContainer />
    </div>
  </>
}