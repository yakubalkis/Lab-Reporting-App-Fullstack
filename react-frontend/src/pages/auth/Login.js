import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const LAB_API_BASE_URL = "http://localhost:8080/api/v1/auth/login";

export default function Login(){

    const [labelWarning, setLabelWarning] = useState("");

    const [inputAll, setInputAll] = useState({
        hospitalIdNo: "",
        password: ""
    });

    const navigate = useNavigate();


    function handleChange(event){
        const {name, value} = event.target;

        setInputAll(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }

    function handleLogin(e){
        e.preventDefault();

        if(inputAll.hospitalIdNo === "" || inputAll.password === ""){
            setLabelWarning(() => "Please fill in the all text boxes!");
            return;
        }
        else{setLabelWarning(() => "");}

        let laborantRequest = {hospitalIdNo: inputAll.hospitalIdNo, password: inputAll.password}; 

        axios.post(LAB_API_BASE_URL, laborantRequest)
            .then(res => {
                localStorage.setItem("tokenKey", res.data.message);
                localStorage.setItem("hostIdNoOfCurrentUser", inputAll.hospitalIdNo);
                navigate(`/laborant/${inputAll.hospitalIdNo}/reports`);
                window.location.reload();
            })
            .catch(res => setLabelWarning(() => "Invalid Id No or Password!"));
    }

    return(
        <div className="row">
                <div className="col-md-6 col-md-offset-3">

                    <br></br>
                    <h1>Laborant Login Page</h1>

                    <div className="card-body">
                        <form>

                            <div className="form-group">
                                <label>Hospital Id No: </label>
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