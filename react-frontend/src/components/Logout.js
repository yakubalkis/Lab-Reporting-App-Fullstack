import { useNavigate } from 'react-router';


export default function Profile(){

    const navigate = useNavigate();
    const hostIdNoOfCurrentUser = localStorage.getItem("hostIdNoOfCurrentUser");

    function handleLogout(){
        localStorage.removeItem("hostIdNoOfCurrentUser");
        localStorage.removeItem("tokenKey");

        navigate("/login");
        window.location.reload();
    }

    return(
        <div style={{position:"absolute", right: "2rem"}}>
            <label style={{color:"white", marginRight:"1rem"}}>{`Hospital ID No: `+ hostIdNoOfCurrentUser}</label>
            <button className='btn btn-warning' onClick={() => handleLogout()}>Logout <>&#9756;</></button>
        </div>
    )
}