import "./App.css";
import { Container } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Home from "./Home";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login/Login";
import AddMovie from "./slick/movies/addmovie/AddMovie";
import { MoviesProvider } from "./contexts/MoviesContext";
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "./ManageUsers/ManageUsers";
import Register from "./Register/Register";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <MoviesProvider>
            <Route exact path="/" component={Home} />
            <Route path="/login/:registered?" component={Login} />
            {/* opcioni parametar */}
            <Route path="/register" component={Register} />
            <PrivateRoute path="/add-movie" component={AddMovie} />
            <PrivateRoute path="/user-profile" component={AddMovie} />
            <PrivateRoute
              path="/manage-users"
              roles={["rola", "role1"]}
              component={ManageUsers}
            />

            <ToastContainer />
          </MoviesProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
