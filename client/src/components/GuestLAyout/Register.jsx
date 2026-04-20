import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
        bankName: "",
        bankNumber: "",
        ifscCode: "",
        upiId: "",
    });
    const [profilePic, setProfilePic] = useState(null);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }
        if (profilePic) {
            data.append("profilePic", profilePic);
        }

        try {
            const res = await axios.post("http://localhost:8000/api/users/register", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setMessage(res.data.message);
            setFormData({
                name: "",
                email: "",
                contact: "",
                password: "",
                bankName: "",
                bankNumber: "",
                ifscCode: "",
                upiId: "",
            });
            setProfilePic(null);
        } catch (err) {
            setMessage(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto" }}>
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

                <input type="text" name="bankName" placeholder="Bank Name" value={formData.bankName} onChange={handleChange} required />
                <input type="text" name="bankNumber" placeholder="Account Number" value={formData.bankNumber} onChange={handleChange} required />
                <input type="text" name="ifscCode" placeholder="IFSC Code" value={formData.ifscCode} onChange={handleChange} required />
                <input type="text" name="upiId" placeholder="UPI ID" value={formData.upiId} onChange={handleChange} required />

                <input type="file" name="profilePic" accept="image/*" onChange={handleFileChange} />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
