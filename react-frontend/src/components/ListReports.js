import { useEffect, useState } from "react"
import axios from "axios";
import Report from "./Report";
const LAB_API_BASE_URL = "http://localhost:8080/api/v1/reports";

export default function ListReports(){

    const [reportList, setReportList] = useState([]);
    
    

    useEffect(() => {
        axios.get(LAB_API_BASE_URL)
            .then((res) => {
                setReportList(res.data)
            })
            console.log(reportList)
    }, []);
 
    const isThereReport = reportList.length > 0 ? true : false ;
    const HeadContent = reportList.length > 0 ? <h4 style={{marginLeft: "-10px", marginTop: "5px"}}>There are no report. You should add a report.</h4> : <h3>There are no report. You should add a report.</h3> ; // conditional content
    const ReportsTable = reportList.length > 0 ? <Report reports={reportList} /> : <></> ;

    return(
        <div>
            {HeadContent}
            {ReportsTable}
        </div>

    )

}