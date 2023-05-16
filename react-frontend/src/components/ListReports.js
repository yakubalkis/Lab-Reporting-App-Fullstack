import { useEffect, useState } from "react"
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Report from "./Report";
const LAB_API_BASE_URL = "http://localhost:8080/api/v1/reports";

export default function ListReports(){

    const [reportList, setReportList] = useState([]);
    const {laborantHospitalIdNo} = useParams();
    
    

    useEffect(() => {
        axios.get(LAB_API_BASE_URL)
            .then((res) => {
                setReportList(res.data)
            })
            console.log(reportList)
    }, []);
 
    
    const HeadContent = reportList.length > 0 ? <></> : <h4 style={{marginLeft: "-10px", marginTop: "5px"}}>There are no report. You should add a report.</h4> ; 
    const ReportsTable = reportList.length > 0 ? <Report reports={reportList} /> : <></> ;

    return(
        <div>

            {HeadContent}

            <div className="row">
                <Link to={`/laborant/${laborantHospitalIdNo}/${0}`}><button style={{marginTop: "1rem", marginBottom: "0.5rem"}} className="btn btn-primary" > Add Report </button></Link>
            </div>

            {ReportsTable}

        </div>

    )

}