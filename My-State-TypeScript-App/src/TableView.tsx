import { useEffect, useState } from "react"

function TableView() {
    const [allAdmin, setAllAdmin] = useState<any[]>([]);


    useEffect(() => {
        // Fetch All Admin API

        const data = [
            {
                name: "Pavan",
                email: "pavan@gmail.com",
                phone: "7896541289",
                isActive: true
            },
            {
                name: "Maulik",
                email: "maulik@gmail.com",
                phone: "7897841289",
                isActive: true
            },
            {
                name: "Jenish",
                email: "jenish@gmail.com",
                phone: "6932145865",
                isActive: false
            },
            {
                name: "Om",
                email: "om@gmail.com",
                phone: "9632147845",
                isActive: true
            }
        ];

        setAllAdmin(data);
    }, []);

    return <>

        <h1 style={{ color: 'red' }}>Admin Table</h1>
        <table className="table table-striped " border={1} >
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {
                    allAdmin.map((admin, index) => {
                        return <tr key={index}>
                            <td>{index + 1} </td>
                            <td>{admin.name}</td>
                            <td>{admin.email}</td>
                            <td>{admin.phone}</td>
                            <td>{admin.isActive ? "Active 🟢" : "Inactive 🔴"}</td>
                            <td>
                                <button className="btn btn-success">Edit</button>
                                <button className="btn btn-danger mx-2">Delete</button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </>
}

export default TableView