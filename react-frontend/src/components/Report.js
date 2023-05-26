
import axios from "axios";
import { useState } from "react";
import {useParams,useNavigate} from "react-router-dom";
import {Buffer} from 'buffer';
import ReportImage from "./ReportImage";
import getConfig from "../utils/getConfig";
import MessageToast from "./MessageToast";
const LAB_API_BASE_URL = "http://localhost:8080/api/v1/reports";
const LAB_API_FILE_BASE_URL = "http://localhost:8080/api/v1/file";

export default function(props){ // props come from ListReports page
    
    const [imgData, setImageData] = useState(null); // to store image data
    const [show, setShow] = useState(false); // to show ReportImage
    const [showErrorMessage, setShowErrorMessage] = useState(false); // for MessageToast component
    const [message, setMessage] = useState(""); // for MessageToast component
    const navigate = useNavigate();
    const {laborantHospitalIdNo} = useParams(); // get hospital id no from url path
    const config = getConfig(); // get config to be able to send request
    

    function editReport(id){
        navigate(`/laborant/${laborantHospitalIdNo}/${id}`); // route to AddReport page for updating process
    } 

    function deleteReport(id){
        axios.delete(LAB_API_BASE_URL + "/" + id, config) // request to delete report
            .then(() => {
                window.location.reload();
            })
            .catch((err) => { // if user doesn't have role to delete report, will take error
                setMessage("You do not have permission to delete report.") // show MessageToast component
                setShowErrorMessage(true);
            })
    }

    function showImage(id, imageName){ // handle 'Click to See' button

        axios.get(LAB_API_FILE_BASE_URL + "/" + imageName, { // get image as a array of bytes
            responseType: 'arraybuffer', 
            headers: {
                Authorization: config.headers.Authorization
            }
            })
            .then((res) => {
                setImageData(() => Buffer.from(res.data, 'binary').toString('base64')) // set image data as parsed
            })
        setShow(true); // to show ReportImage component
    }
    
    const handleClose = () => setShow(false); // for ReportImage component

    const ImageComponent = imgData !== null ?  <ReportImage show={show} onClose={handleClose}  imgData={imgData} /> : <></> // display ReportImage component if imgData isn't null
   
    return(
       
        <div className="row">
        <table className="table table-striped table-bordered">
            
            <thead>
                <tr>
                    <th>First Name</th> 
                    <th>Last Name</th>
                    <th>TC No</th>
                    <th>Diagnosis Title</th>
                    <th>Diagnosis Detail</th>
                    <th>Date</th>
                    <th>Created By</th>
                    <th>Report Image</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    props.reports.map(report => 
                        <tr key={report.id}>
                            <td>{report.firstName}</td>
                            <td>{report.lastName}</td>
                            <td>{report.tcNo}</td>
                            <td>{report.diagnosisTitle}</td>
                            <td style={{maxWidth:"100px"}}>{report.diagnosisDetail}</td>
                            <td>{report.date}</td>
                            <td>{report.laborant.firstName + " " + report.laborant.lastName}</td>
                            <td>
                                <button onClick={() => showImage(report.id, report.imageName)} className="btn btn-dark">Click to See</button>
                            </td>
                            <td>
                                <button onClick={() => editReport(report.id)} className="btn btn-info">Update</button>
                                <button onClick={() => deleteReport(report.id)} className="btn btn-danger" style={{marginLeft: "10px"}}>Delete</button>
                            </td>
                        </tr> 
                    )
                }
            </tbody>
        </table>

        {ImageComponent}

        <div style={{ position: 'fixed', left: 0, bottom: 0 }}>
            <MessageToast show={showErrorMessage} message={message} setShow={setShowErrorMessage} />
        </div>

    </div>
    
    )

}