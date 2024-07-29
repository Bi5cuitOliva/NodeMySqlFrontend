import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const GetAllStudents = () => {
    const [records, setRecords] = useState([]);
    // const [loading, setLoading] = useState(false); // Initialize loading state
    // const [unauthorized, setUnauthorized] = useState(false); // Initialize unauthorized state

    useEffect(() => {
         const token = sessionStorage.getItem("accessToken");

        // setLoading(true);

        axios.get('http://localhost:5000/api/Student/getAllStudents', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            setRecords(res.data);
        })
         .catch(err => {
            console.log(err.message);
        //     if (err.response && err.response.status === 403) {
        //         setUnauthorized(true);
        //     }
         })
        // .finally(() => {
        //     setLoading(false);
        // });
    }, []);

    return (
        <div className='table-responsive mx-5 fontt'>
            <table className="table table-hover" size="sm">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((r, i)=>(
                        <tr key={i}>
                            <td>{r.firstname}</td>
                            <td>{r.lastname}</td>
                            <td>{r.gender}</td>
                            <td>
                             <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
                                    Perform Actions
                             </Dropdown.Toggle>
                             <Dropdown.Menu>
                                <Link to={`/UpdateStudent/${r.student_id}`} className="dropdown-item" >
                                Edit student
                                </Link>
                                <Link to={`/DeleteStudent/${r.student_id}`} className="dropdown-item" >
                                Delete student
                                </Link>
                             </Dropdown.Menu>
                             </Dropdown>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

        </div>
    );
       
}

export default GetAllStudents;