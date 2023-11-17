import { NavLink } from "react-router-dom";

function Logo(){
    return (
        <div className="sm:w-20 flex justify-center w-full sm:text-left text-center  text-lg font-semibold leading-5 text-indigo-600 hover:cursor">
            <div className="w-20">
                <NavLink to='/'>Project Management</NavLink>
            </div>
        </div>
    );
};

export default Logo;