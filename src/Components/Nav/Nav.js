import "./Nav.scss"


import {
    Link
} from "react-router-dom";

const Nav = () => {
    return (
        <>
            <div className="nav" >
                <Link exact="true" to="/" >
                    Home
                </Link>
                <Link to="/movie" >
                    Movie
                </Link>
            </div>
        </>
    )
}

export default Nav;