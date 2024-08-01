import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        gender: "",
        CourseId: "" 
    });

    const [courses, setCourses] = useState([]); // State to hold the fetched courses
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch courses when the component mounts
        axios.get('http://localhost:5000/api/Course/getAllCourses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch courses:', error);
            });
    }, []);
    const handleChange = (e) => {
        setData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }
    
    const saveStudent = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("access_token");
        console.log(data);
        axios.post('http://localhost:5000/api/Student/addStudent', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            toast.success('New student added successfully', {
                position: 'top-right',
                autoClose: 3000,
                onClose: () => navigate('/view-students'),
            });
        })
        .catch(err => {
            toast.error('An error occurred while adding the record.', {
                position: 'top-right',
                autoClose: 3000,
            });
        });
    };

    return (
        <div className='col-md-6 offset-md-3 addStudent'>
            <h3 className='mytext'>Add New student</h3>
            <Form onSubmit={saveStudent} className='fontt'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Firstname:</Form.Label>
                    <Form.Control type="input" required onChange={handleChange} name="firstname" placeholder="Enter Firstname" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Lastname:</Form.Label>
                    <Form.Control type="input" required onChange={handleChange} name="lastname" placeholder="Enter Lastname" />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Gender:</Form.Label>
                    <Form.Select onChange={handleChange} name="gender">
                        <option>--Select Gender--</option>
                        <option>Male</option>
                        <option>Female</option>
                    </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicSelect">
                    <Form.Label>Course:</Form.Label>
                    <Form.Select onChange={handleChange} name="CourseId">
                    <option value="">-- Select Course --</option>
                    {courses.map((course) => (
                     course.course_id && (
                    <option key={course.course_id} value={course.course_id}>
                    {course.course_name}
                    </option>
                      )
                     ))}

                    </Form.Select>
                   </Form.Group>
               
                <Button className="code" type="submit">
                Add Student
                </Button>
                
                <ToastContainer/>
            </Form>
        </div>
    );
}

export default AddStudent;
                  