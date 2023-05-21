import { useEffect, useState } from "react"
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Report from "../components/Report";
import getConfig from "../utils/getConfig";
const LAB_API_BASE_URL = "http://localhost:8080/api/v1/reports";

export default function ListReports(){

    const [reportList, setReportList] = useState([]);
    const [filteredReportList, setFilteredReportList] = useState([]);
    const [filterType, setFilterType] = useState("Choose Filter type");
    const [isSortedAsc,setIsSortedAsc] = useState(false)
    const {laborantHospitalIdNo} = useParams();

    
    

    useEffect(() => {
        const config = getConfig();
        
        axios.get(LAB_API_BASE_URL, config)
            .then((res) => {
                setReportList(Object.assign([], res.data)) // make deep copy to have different memory address for not being effected by change
                                                            // from filteredReportList

                setFilteredReportList(res.data) // at first, since there is no filter, filteredReportList has all data too
            })
    },[]);
    
    function handleChange(type){
        setFilterType(type)
    }
    
    function handleSearchInput(e){
        
        const inputSearch = e.target.value;
       
        if(filterType==="By Patient Name/Surname"){

            setFilteredReportList(reportList.filter((report) => report.firstName.toLowerCase().includes(inputSearch.toLowerCase())))
                if(filteredReportList.length===0){ // if not found by name, try by lastname
                    setFilteredReportList(reportList.filter((report) => report.lastName.toLowerCase().includes(inputSearch.toLowerCase())))
                }
        }
        else if(filterType==="By TC No"){
            setFilteredReportList(reportList.filter((report) => report.tcNo.includes(inputSearch)))
        }
        else if(filterType==="By Report Creator"){
            setFilteredReportList(reportList.filter((report) => report.createdBy.toLowerCase().includes(inputSearch.toLowerCase())))
        }
        else{ // if there is no filter type, as default, filter by name
            setFilteredReportList(reportList.filter((report) => report.firstName.toLowerCase().includes(inputSearch.toLowerCase())))
        }
    }
    
    function handleSortBtn(boolIsSortedAsc){
        
        if(boolIsSortedAsc){
            setFilteredReportList((prevState) => prevState.sort(function(a,b){
                return new Date(a.date) - new Date(b.date)
            })) 
        }
        else{
            setFilteredReportList((prevState) => prevState.sort(function(a,b){
                return new Date(b.date) - new Date(a.date)
            })) 
        }
        setIsSortedAsc((prevState) => !prevState);
    }

    function handleDisableSortBtn(){
        
        setFilteredReportList((prevState) => Object.assign([], reportList)); // again make deep copy, pass by value not by reference !
        setIsSortedAsc(false);
        
    }
    
    const HeadContent = reportList.length > 0 ? <></> : <h4 style={{marginLeft: "-10px", marginTop: "5px"}}>There are no report. You should add a report.</h4> ; 
    const ReportsTable = filteredReportList.length > 0 ? <Report reports={filteredReportList}  /> : <></> ;

    return(
        <div>

            {HeadContent}
            <div className="div-add-filter">

                <Link to={`/laborant/${laborantHospitalIdNo}/${0}`}><button style={{marginTop: "1rem", marginBottom: "0.5rem"}} className="btn btn-primary" > Add Report </button></Link>
                
               
               {reportList.length > 0 &&
                <>
                    <input type="text" className="form-control" placeholder="Search..." onChange={handleSearchInput} />
                    
                    <DropdownButton id="dropdown-basic-button" title={filterType} className="dropdown-filter">
                        <Dropdown.Item onClick={() => handleChange("By Patient Name/Surname")}>By Patient Name/Surname</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleChange("By TC No")}>By TC No</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleChange("By Report Creator")}>By Report Creator</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleChange("Choose Filter type")}>Set No Filter</Dropdown.Item>
                    </DropdownButton>

                    
                    <button style={{marginLeft:"2rem",marginTop: "0.5rem"}} onClick={() => handleSortBtn(!isSortedAsc)}  className="btn btn-success">Sort By Date {isSortedAsc ? <>&darr;</> : <>&uarr;</>}</button>
                    <button style={{marginLeft:"1rem",marginTop: "0.5rem"}} onClick={() => handleDisableSortBtn()}  className="btn btn-secondary">Disable Sorting<>&#x21A9;</></button>
                </>
                }
            </div>

            {ReportsTable}

        </div>

    )

}