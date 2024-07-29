import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'react-bootstrap'; 
import ScaleLoader from "react-spinners/ScaleLoader"; 
import Button from 'react-bootstrap/Button';

const spinnerOverride = {
  display: "block",
  margin: "0 auto",
};

const UpdateStudent = () => {
  const {_id} = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    _id: "",
    firstname: "",
    lastname: "",
    gender: "",
  });

  const navigate = useNavigate(); 

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken"); 
    console.log("Student ID:", _id);

    setLoading(true);

    axios.get(`http://localhost:5000/api/Student/getStudent/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json',
      },
    })
    .then(res => {
      setData({
        _id: res.data._id,
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        gender: res.data.gender
      });
    })
    .catch(err => console.log(err))
    .finally(() => {
      setLoading(false);
    });
  }, [_id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateStudent = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("accessToken");
    
    setLoading(true);

    axios.patch(`http://localhost:5000/api/Student/updateStudent/${_id}`, data, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json',
      },
    })
    .then(res => {
      toast.success('Student updated successfully', {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate('/view-students'), 
      });
    })
    .catch(err => {
        toast.error('An error occured while updating the record.',{
            position:'top-right',
            autoClose:3000,
        });
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <div> 
      {loading && <ScaleLoader color="#36D7B7" loading={loading} css={spinnerOverride} size={150} />}
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
          <Form.Control
            type="text"
            placeholder="Enter Gender"
            required
            onChange={handleChange}
            value={data.gender}
            name="gender" 
          />
        </Form.Group>
        <Button className="code" type="submit">
          Update Student
        </Button>
        <ToastContainer/>
      </Form>
    </div>
  )
}

export default UpdateStudent;