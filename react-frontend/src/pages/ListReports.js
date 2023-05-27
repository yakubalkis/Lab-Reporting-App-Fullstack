import { useEffect, useState } from "react"
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Report from "../components/Report";
import getConfig from "../utils/getConfig";
const LAB_API_BASE_URL = "http://localhost:8080/api/v1/reports";

export default function ListReports(){

    const [reportList, setReportList] = useState([]); // list of reports
    const [filteredReportList, setFilteredReportList] = useState([]); // list of filtered reports for filtering process
    const [filterType, setFilterType] = useState("Choose Filter type"); // filter type
    const [isSortedAsc,setIsSortedAsc] = useState(false) // is used in function handleSortBtn, because there are 2 ways of sorting by date
    const {laborantHospitalIdNo} = useParams(); // getting from url path, used for navigating process in Link of Add Report button

    
    

    useEffect(() => {
        const config = getConfig(); // get config(jwt) to use in http request
        
        axios.get(LAB_API_BASE_URL, config)
            .then((res) => {
                setReportList(Object.assign([], res.data)) // make deep copy to have different memory address for not being effected by change
                                                            // from filteredReportList
                setFilteredReportList(res.data) // at first, since there is no filter, filteredReportList has all data too
            }).catch(err => {
                console.log(err)
            })
    },[]);
    
    function handleChange(type){ // is used in dropdown component
        setFilterType(type)
    }
    
    function handleSearchInput(e){ // is used to filter the report list according to the selected filter
        
        const inputSearch = e.target.value; // get text from search textbox to search in report list
       
        if(filterType==="By Patient Name/Surname"){ // filter by name/surname of patient
            setFilteredReportList(reportList.filter((report) => 
                        (report.firstName.toLowerCase() + report.lastName.toLowerCase()).includes(inputSearch.toLowerCase().trim().replace(/\s/g,'')) ))
        }
        else if(filterType==="By TC No"){ // filter by TC No 
            setFilteredReportList(reportList.filter((report) => report.tcNo.includes(inputSearch)))
        }
        else if(filterType==="By Report Creator"){ // filter by creator of report
            setFilteredReportList(reportList.filter((report) => 
                        (report.laborant.firstName.toLowerCase() + report.laborant.lastName.toLowerCase()).includes(inputSearch.toLowerCase().trim().replace(/\s/g,'')) ))
        }
    }

    
    function handleSortBtn(boolIsSortedAsc){ // is used to sort by date
        
        if(boolIsSortedAsc){
            setFilteredReportList((prevState) => prevState.sort(function(a,b){ // from past to future
                return new Date(a.date) - new Date(b.date)
            })) 
        }
        else{
            setFilteredReportList((prevState) => prevState.sort(function(a,b){ // from future to past
                return new Date(b.date) - new Date(a.date)
            })) 
        }
        setIsSortedAsc((prevState) => !prevState); // set again, because sorting type changed
    }

    function handleDisableSortBtn(){
        
        setFilteredReportList((prevState) => Object.assign([], reportList)); // sort by database, not by date (again make deep copy, pass by value not by reference!)
        setIsSortedAsc(false); // set false as default   
    }
    
    const HeadContent = reportList.length > 0 ? <></> : <h4 style={{marginLeft: "-10px", marginTop: "5px"}}>There are no report. You should add a report.</h4> ; // head content for user
    const ReportsTable = filteredReportList.length > 0 ? <Report reports={filteredReportList}  /> : <></> ; // use Report component for reusing, assign report list as prop 

    return(
        <div>

            {HeadContent}

            <div className="div-add-filter">

                <Link to={`/laborant/${laborantHospitalIdNo}/${0}`}>
                    <button style={{marginTop: "1rem", marginBottom: "0.5rem"}} className="btn btn-primary"> Add Report </button>
                </Link>
                
               
               {reportList.length > 0 &&
                <>
                    <input type="text" className="form-control" placeholder="Search after filtering..." onChange={handleSearchInput} />
                    
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