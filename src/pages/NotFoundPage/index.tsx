import { Link } from "react-router-dom";
import "./style.scss";

const NotFoundPage = () => {
    return (
        <div className="notFoundPage">
            <Link className="image" to={"/"}></Link>
        </div>
    );
};

export default NotFoundPage;
