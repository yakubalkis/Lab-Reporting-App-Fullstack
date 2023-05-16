import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const LAB_API_BASE_URL =  "http://localhost:8080/api/v1/reports";

export default function AddReport(){

    const [inputAll, setInputAll] = useState({
        id: "",
        firstName: "",
        lastName: "",
        tcNo: "",
        diagnosisTitle: "",
        diagnosisDetail: "",
        date: "",
        imageName: ""
    });
    
    const [labelWarning, setLabelWarning] = useState("");
    const {laborantHospitalIdNo, reportId} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if(reportId !== String(0)){
            axios.get(LAB_API_BASE_URL + "/" + reportId)
                .then((res) => {
                    setInputAll({
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        tcNo: res.data.tcNo,
                        diagnosisTitle: res.data.diagnosisTitle,
                        diagnosisDetail: res.data.diagnosisDetail,
                        date: res.data.date,
                        imageName:res.data.imageName
                    })
                })
        }
    }, []);


    function handleChange(event){
        const {name, value} = event.target;

        setInputAll(prevState => {
            return{
                ...prevState,
                [name]: value
            }
        })
    }

    function SaveOrUpdateEmployee(e){
        e.preventDefault();

        if(inputAll.firstName==="" || inputAll.lastName === "" || inputAll.tcNo === "" || inputAll.diagnosisTitle === "" || inputAll.diagnosisDetail === ""){
            setLabelWarning(() => "Please fill in the all text boxes!");
            return;
        }

        if(reportId=== String(0)){ // create report

            let report = {firstName: inputAll.firstName, lastName: inputAll.lastName,
                          tcNo: inputAll.tcNo, diagnosisTitle: inputAll.diagnosisTitle, diagnosisDetail: inputAll.diagnosisDetail, date: inputAll.date, imageName: inputAll.imageName};

            axios.post(LAB_API_BASE_URL+ "/" + laborantHospitalIdNo, report);
        }
        else{ // update report
            let report = {id: reportId, firstName: inputAll.firstName, lastName: inputAll.lastName,
                          tcNo: inputAll.tcNo, diagnosisTitle: inputAll.diagnosisTitle, diagnosisDetail: inputAll.diagnosisDetail, date: inputAll.date, imageName: inputAll.imageName};

            axios.put(LAB_API_BASE_URL, report);
        }
        
        navigate(`/laborant/${laborantHospitalIdNo}/reports`);
    }
    
    const header = reportId === String(0) ? "Add Report": "Update Report"

    return(
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">

                            <h3 className="text-center">{header}</h3>
                            <div className="card-body">
                                <form>

                                    <div className="form-group">
                                        <label>First Name: </label>
                                        <input placeholder="First Name" type="text" name="firstName" value={inputAll.firstName} className="form-control" onChange={handleChange}  />
                                    </div><br></br>

                                    <div className="form-group">
                                        <label>Last Name: </label>
                                        <input placeholder="Last Name" type="text" name="lastName" value={inputAll.lastName} className="form-control" onChange={handleChange}  />
                                    </div><br></br>

                                    <div className="form-group">
                                        <label>TC No: </label>
                                        <input placeholder="TC No" type="text" name="tcNo" value={inputAll.tcNo} className="form-control" onChange={handleChange}  />
                                    </div><br></br>

                                    <div className="form-group">
                                        <label>Diagnosis Title: </label>
                                        <input placeholder="Diagnosis Title" type="text" name="diagnosisTitle" value={inputAll.diagnosisTitle} className="form-control" onChange={handleChange}  />
                                    </div><br></br>

                                    <div className="form-group">
                                        <label>Diagnosis Detail: </label>
                                        <input placeholder="Diagnosis Detail" type="text" name="diagnosisDetail" value={inputAll.diagnosisDetail} className="form-control" onChange={handleChange}  />
                                    </div><br></br>

                                    <div className="form-group">
                                        <label>Date </label>
                                        <input placeholder="Date" type="text" name="date" value={inputAll.date} className="form-control" onChange={handleChange}  />
                                    </div><br></br>

                                    <div className="form-group">
                                        <label>Image </label>
                                        <input placeholder="Image" type="text" name="imageName" value={inputAll.imageName} className="form-control" onChange={handleChange}  />
                                    </div><br></br>
                                    
                                    <button type="submit" className="btn btn-success" onClick={SaveOrUpdateEmployee}>Save</button>
                                    <Link to={`/laborant/${laborantHospitalIdNo}/reports`}><button className="btn btn-danger" style={{marginLeft: "10px"}}>Cancel</button></Link>
                                    <label style={{marginLeft: "1rem", color: "red"}}>{labelWarning}</label>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
    )

}