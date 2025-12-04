import "../../css/courses.css";

export const CourseCard = ({
    title,
    description,
    image,
    price,
    isFree,
    onView,
}) => {
    return (
        <div className="card shadow course-card manual-course-card-class d-flex">
            {/* <div> */}
                <img
                    src={image}
                    className="card-img-top"
                    alt={title}
                    style={{ height: "180px", objectFit: "cover" }}
                />

                <div className="card-body">
                    <h5 className="card-title">{title}</h5>

                    <p className="card-text text-light-50">{description.slice(0, 80)}...</p>

                    <h6 className="fw-bold mb-3">
                        {isFree ? "FREE" : `₹${price}`}
                    </h6>

                    {!isFree && 
                        <p className="text-success">Get at 50% discount</p>
                    }

                </div>
            {/* </div> */}
            
            <div className="d-flex justify-content-center gap-2 mb-2 px-2">
                <button
                    className="btn btn-primary w-100"
                    onClick={onView}
                >
                    View Course
                </button>
            </div>
        </div>
    );
};
