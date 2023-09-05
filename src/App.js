import Menu from "./components/Menu";
import Sidebar from "./components/Sidebar";

function App() {
    return (
        <div className="app">
            <Menu />
            <div className="container">
                <Sidebar />
                <div className="content"></div>
            </div>
        </div>
    );
}

export default App;
