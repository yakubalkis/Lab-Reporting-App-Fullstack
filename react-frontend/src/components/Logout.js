import { useNavigate } from 'react-router';


export default function Profile(){

    const navigate = useNavigate();
    const hostIdNoOfCurrentUser = localStorage.getItem("hostIdNoOfCurrentUser"); // get host ID no from local storage

    function handleLogout(){
        localStorage.removeItem("hostIdNoOfCurrentUser"); // remove items from local storage
        localStorage.removeItem("tokenKey");

        navigate("/login"); // redirect to login page
        window.location.reload();
    }

    return(
        <div style={{position:"absolute", right: "2rem"}}>
            <label style={{color:"white", marginRight:"1rem"}}>{`Hospital ID No: `+ hostIdNoOfCurrentUser}</label>
            <button className='btn btn-warning' onClick={() => handleLogout()}>Logout <>&#9756;</></button>
        </div>
    )
}