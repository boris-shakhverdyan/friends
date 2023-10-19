import { useNavigate } from "react-router";
import "./style.scss";

const ProfileNotFound = () => {
    const navigate = useNavigate();

    return <div className="profileNotFound">
        <h3>Information</h3>
        <div className="content">
            <p>The page has been deleted or has not yet been created.</p>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    </div>
};

export default ProfileNotFound;