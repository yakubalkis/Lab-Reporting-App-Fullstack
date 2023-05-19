import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import MessageToast from "../../components/MessageToast";
const LAB_API_BASE_URL = "http://localhost:8080/api/v1/auth/register";

export default function Registration(){

    
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [labelWarning, setLabelWarning] = useState("");
 
    const [inputAll, setInputAll] = useState({
        firstName: "",
        lastName: "",
        hospitalIdNo: "",
        password: ""
    }); 


    function handleChange(event){
        const {name, value} = event.target;

        setInputAll(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }

    function saveLaborant(e){
        e.preventDefault();
        
        if(inputAll.firstName === "" || inputAll.lastName === "" || inputAll.hospitalIdNo === "" || inputAll.password === ""){
            setLabelWarning(() => "Please fill in the all text boxes!");
            return;
        }
        else if(inputAll.hospitalIdNo.length !== 7){
            setLabelWarning(() => "Please enter 7 digit ID number!");
            return;
        }
        else{setLabelWarning(() => "");}

        let laborantRegister = {firstName: inputAll.firstName, lastName: inputAll.lastName, hospitalIdNo: inputAll.hospitalIdNo, password: inputAll.password}; 

        axios.post(LAB_API_BASE_URL, laborantRegister)
            .then(res => {
                if(res.status === 201){
                   setMessage(res.data.message)
                   setShow(true);
                }
            }).catch(res => {
                   setMessage(res.response.data.message)
                   setShow(true);
            })
    }

    return(
        <div>
            <div className="row">
                <div className="col-md-6 col-md-offset-3">

                    <br></br>
                    <h1>Laborant Registration Page</h1>

                    <div className="card-body">
                        <form>

                            <div className="form-group">
                                <label>First Name: </label>
                                <input className="form-control" placeholder="First Name" type="text" name="firstName" value={inputAll.firstName}  onChange={handleChange}/>
                            </div><br></br>

                            <div className="form-group">
                                <label>Last Name: </label>
                                <input className="form-control" placeholder="Last Name" type="text" name="lastName" value={inputAll.lastName}  onChange={handleChange}/>
                            </div><br></br>

                            <div className="form-group">
                                <label>Hospital Id No: </label>
                                <input className="form-control" placeholder="Id No" type="text" name="hospitalIdNo" value={inputAll.hospitalIdNo}  onChange={handleChange} maxLength={7}/>
                            </div><br></br>

                            <div className="form-group">
                                <label>Password: </label>
                                <input className="form-control" placeholder="Password" type="text" name="password" value={inputAll.password}  onChange={handleChange}/>
                            </div><br></br>
                            
                            <div className="form-group">
                                <button type="submit" className="btn btn-success" onClick={saveLaborant}>Register</button>
                                <span style={{marginLeft: "1rem"}}>Already registered?
                                   <Link to="/login">
                                        <span style={{marginLeft: "3px"}}>Login</span>
                                   </Link>
                                </span>
                            </div>

                            <label  style={{marginLeft: "1rem", color: "red"}}>{labelWarning}</label>

                        </form>
                    </div>

                            <MessageToast show={show} message={message} setShow={setShow} />
                </div>
            </div>
        </div>
    )

}