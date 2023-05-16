import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router";
const LAB_API_BASE_URL = "http://localhost:8080/api/v1/laborant";

export default function Registration(){

    const navigate = useNavigate();

    const [inputAll, setInputAll] = useState({
        firstName: "",
        lastName: "",
        hospitalIdNo: ""
    });

    const [labelWarning, setLabelWarning] = useState("");

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
        
        if(inputAll.firstName === "" || inputAll.lastName === "" || inputAll.hospitalIdNo === ""){
            setLabelWarning(() => "Please fill in the all text boxes!");
            return;
        }
        else if(inputAll.hospitalIdNo.length !== 7){
            setLabelWarning(() => "Please enter 7 digit ID number!");
            return;
        }
        else{setLabelWarning(() => "");}

        let laborant = {firstName: inputAll.firstName, lastName: inputAll.lastName, hospitalIdNo: inputAll.hospitalIdNo}; 
        axios.post(LAB_API_BASE_URL, laborant);

        navigate(`/laborant/${inputAll.hospitalIdNo}/reports`);
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
                            
                            
                            <button type="submit" className="btn btn-success" onClick={saveLaborant}>Save</button>
                            <label  style={{marginLeft: "1rem", color: "red"}}>{labelWarning}</label>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    )

}