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
    const [errors, setErrors] = useState({});

    const token = localStorage.getItem(loginUserTokenKey);

    const validateInputFields = () => {
        const tempErrors = {};
        if (!formData.title) {
            tempErrors.title = "Title is required";
        };
        if (!formData.description) {
            tempErrors.description = "Description is required";
        };
        if (!formData.image) {
            tempErrors.image = "Image URL is required";
        };

        return tempErrors;
    };

    const validateInputFieldsOnChange = (name, value) => {
        let error;
        value = value.trim();

        switch (name) {
            case "title":
                if (!value) {
                    error = "Title is required";
                }
                break;
            case "description":
                if (!value) {
                    error = "Description is required";
                }
                break;
            case "image":
                if (!value) {
                    error = "Image URL is required";
                }
            default:
                null;
        };

        setErrors(prev => ({...prev, [name]: error}));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateInputFieldsOnChange(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tempErrors = validateInputFields();
        const keys = Object.keys(tempErrors).length;
        if (keys != 0) {
            setErrors(tempErrors);
            return;
        }
        
        const dataToSend = { ...formData, ["isFree"]: formData.price > 0 ? false : true, ["price"]: Math.floor(formData.price) }
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
        <div className="">
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">

                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h3 className="text-center mb-4">Add New Course</h3>

                                <form onSubmit={handleSubmit}>

                                    {/* <!-- Title --> */}
                                    <div className="mb-3">
                                        <label className="form-label">Title <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors?.title ? "is-invalid" : ""}`}
                                            placeholder="Enter course title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                        <p className="invalid-feedback">{errors?.title}</p>
                                    </div>

                                    {/* <!-- Description --> */}
                                    <div className="mb-3">
                                        <label className="form-label">Description <span className="text-danger">*</span></label>
                                        <textarea
                                            className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                            rows="4"
                                            placeholder="Enter course description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}>
                                        </textarea>
                                        <p className="invalid-feedback">{errors.description}</p>
                                    </div>

                                    {/* <!-- Image URL --> */}
                                    <div className="mb-3">
                                        <label className="form-label">Image URL</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.image ? "is-invalid" : ""}`}
                                            placeholder="https://example.com/image.jpg"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleChange}
                                        />
                                        <p className="invalid-feedback">{errors.image}</p>
                                    </div>

                                    {/* <!-- Price --> */}
                                    <div className="mb-3">
                                        <label className="form-label">Price</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter price"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                        />
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
        </div>
    )
};