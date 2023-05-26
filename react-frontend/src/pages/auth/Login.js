import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const LAB_API_BASE_URL = "http://localhost:8080/api/v1/auth/login";

export default function Login(){

    const [labelWarning, setLabelWarning] = useState(""); // for basic warnings

    const [inputAll, setInputAll] = useState({ // for inputs in form
        hospitalIdNo: "",
        password: ""
    });

    const navigate = useNavigate(); // to route the page


    function handleChange(event){ // get values from inputs
        const {name, value} = event.target;

        setInputAll(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }

    function handleLogin(e){ // handle Login btn
        e.preventDefault();

        if(inputAll.hospitalIdNo === "" || inputAll.password === ""){ // basic checks
            setLabelWarning(() => "Please fill in the all text boxes!");
            return;
        }
        else{setLabelWarning(() => "");}

        let laborantRequest = {hospitalIdNo: inputAll.hospitalIdNo, password: inputAll.password}; // create laborant request object to send backend

        axios.post(LAB_API_BASE_URL, laborantRequest) // request to login
            .then(res => {
                localStorage.setItem("tokenKey", res.data.message); // set items to local storage to use in other components
                localStorage.setItem("hostIdNoOfCurrentUser", inputAll.hospitalIdNo);
                navigate(`/laborant/${inputAll.hospitalIdNo}/reports`); // route to reports page
                window.location.reload();
            })
            .catch(res => setLabelWarning(() => "Invalid ID No or Password!")); // error message
    }

    return(
        <div className="row">
                <div className="col-md-6 col-md-offset-3">

                    <br></br>
                    <h1>Laborant Login Page</h1>

                    <div className="card-body">
                        <form>

                            <div className="form-group">
                                <label>Hospital ID No: </label>
                                <input className="form-control" placeholder="Id No" type="text" name="hospitalIdNo" value={inputAll.hospitalIdNo}  onChange={handleChange} maxLength={7}/>
                            </div><br></br>

                            <div className="form-group">
                                <label>Password: </label>
                                <input className="form-control" placeholder="Password" type="text" name="password" value={inputAll.password}  onChange={handleChange}/>
                            </div><br></br>
                            
                            <div className="form-group">

                                <button type="submit" className="btn btn-success" onClick={handleLogin}>Login</button>
                                <span style={{marginLeft: "1rem"}}>New user?
                                   <Link to="/">
                                        <span style={{marginLeft: "3px"}}>Sign Up</span>
                                   </Link>
                                </span>
                                
                            </div>

                            <label  style={{marginLeft: "0.5rem", color: "red"}}>{labelWarning}</label>

                        </form>
                    </div>

                </div>
            </div>
    )
}