import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'react-bootstrap'; 
import ScaleLoader from "react-spinners/ScaleLoader"; 
import Button from 'react-bootstrap/Button';

const UpdateStudent = () => {
  const { student_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    student_id: "",
    firstname: "",
    lastname: "",
    gender: "",
    CourseId: "" // Assuming a single course ID for simplicity; adjust if multiple courses are allowed
  });
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    setLoading(true);

    // Fetch student details
    axios.get(`http://localhost:5000/api/Student/getStudent/${student_id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": 'application/json',
      },
    })
    .then(res => {
      setData({
        ...res.data,
        CourseId: res.data.CourseId ? res.data.CourseId.toString() : "" // Ensure CourseId matches the value expected by <Form.Select>
      });
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));

    // Fetch all courses for selection
    axios.get('http://localhost:5000/api/Course/getAllCourses')
      .then(response => setCourses(response.data))
      .catch(err => console.error('Failed to fetch courses:', err));
  }, [student_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const updateStudent = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.patch(`http://localhost:5000/api/Student/updateStudent/${student_id}`, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": 'application/json',
      },
    })
    .then(() => {
      toast.success('Student updated successfully', {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate('/view-students'),
      });
    })
    .catch(err => {
      toast.error('Update failed', {
        position: 'top-right',
        autoClose: 3000,
      });
    })
    .finally(() => setLoading(false));
  };

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <ScaleLoader color="#36D7B7" loading={loading} css={{ display: "block", margin: "0 auto" }} size={150} />
      ) : (
        <Form onSubmit={updateStudent} className="fontt mx-5">
          <h4 className="mb-3">Update Student</h4>
          <Form.Group className="mb-3" controlId="firstname">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            required
            onChange={handleChange}
            value={data.firstname}
            name="firstname" 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastname">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            required
            onChange={handleChange}
            value={data.lastname}
            name="lastname" 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender:</Form.Label>
          <Form.Select onChange={handleChange} name="gender">
                        <option>--Select Gender--</option>
                        <option>Male</option>
                        <option>Female</option>
                    </Form.Select>
        </Form.Group>
          <Form.Group className="mb-3" controlId="course">
            <Form.Label>Course:</Form.Label>
            <Form.Select onChange={handleChange} name="CourseId" value={data.CourseId}>
              <option value="">-- Select Course --</option>
              {courses.map(course => (
                <option key={course.course_id} value={course.course_id}>{course.course_name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        
          <Button type="submit">Update Student</Button>
        </Form>
      )}
    </div>
  );
};

export default UpdateStudent;
