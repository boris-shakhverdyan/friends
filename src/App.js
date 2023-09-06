import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "./components/Menu";
import Sidebar from "./components/Sidebar";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function App() {
    return (
        <div className="app">
            <Menu />
            <div className="container">
                <div className="center">
                    <Sidebar />
                    <div className="content">
                        <div className="profileHeader">
                            <div
                                className="profileCover"
                                style={{
                                    backgroundImage: `url(https://sun9-79.userapi.com/impg/K-xOPE95l_QCBccyT1xSZMctCCZfdMYKVqIXXw/5ut6-S_vVnE.jpg?size=960x384&quality=95&crop=0,229,2560,1024&sign=23c34bf0f91f628a410454590c5ee182&c_uniq_tag=Ad3_mn3x1qpBxU6_2y-9v9Bj2MS7_4nLfpvsTNReBLI&type=helpers)`,
                                }}
                            ></div>
                            <div className="profileInfoWrapper">
                                <div
                                    className="avatar"
                                    style={{
                                        backgroundImage: `url(https://vk.com/images/camera_200.png)`,
                                    }}
                                >
                                    <span className="status-active"></span>
                                </div>
                                <div className="profileInfo">
                                    <div className="mainInfo">
                                        <h2>Boris Shakhverdyan</h2>
                                        <div className="fullInfo"></div>
                                    </div>
                                    <div className="actions">
                                        <button>Edit profile</button>
                                        <button className="withIcon">
                                            More{" "}
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
