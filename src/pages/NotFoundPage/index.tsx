import { Link } from "react-router-dom";
import "./style.scss";
import { route } from "../../utils/helpers";

const NotFoundPage = () => {
    return (
        <div className="notFoundPage">
            <Link className="image" to={route("index")}></Link>
        </div>
    );
};

export default NotFoundPage;
