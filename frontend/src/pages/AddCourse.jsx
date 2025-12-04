import axios from "axios";
import { useState } from "react"
import { BASE_URL } from "../base_url";
import { loginUserTokenKey } from "../localStorageKeys/index";

export function AddCourse() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        price: 0,
        isFree: true
    });

    const token = localStorage.getItem(loginUserTokenKey);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {...formData, ["isFree"]: formData.price > 0 ? false : true}
        try {
            const response = await axios.post(`${BASE_URL}/api/add-course`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log('response:', response.data);
        } catch (error) {
            console.log('error:', error.response);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Add New Course</h3>

                            <form onSubmit={handleSubmit}>

                                {/* <!-- Title --> */}
                                <div className="mb-3">
                                    <label className="form-label">Course Title</label>
                                    <input type="text" className="form-control" placeholder="Enter course title" name="title" value={formData.title} onChange={handleChange} />
                                </div>

                                {/* <!-- Description --> */}
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows="4" placeholder="Enter course description" name="description" value={formData.description} onChange={handleChange}></textarea>
                                </div>

                                {/* <!-- Image URL --> */}
                                <div className="mb-3">
                                    <label className="form-label">Image URL</label>
                                    <input type="text" className="form-control" placeholder="https://example.com/image.jpg" name="image" value={formData.image} onChange={handleChange} />
                                </div>

                                {/* <!-- Price --> */}
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input type="number" className="form-control" placeholder="Enter price" name="price" value={formData.price} onChange={handleChange} />
                                </div>

                                {/* <!-- Submit Button --> */}
                                <button type="submit" className="btn btn-primary w-100 py-2 mt-3">
                                    Add Course
                                </button>

                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};