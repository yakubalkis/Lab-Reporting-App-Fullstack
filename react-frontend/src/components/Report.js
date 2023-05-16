

export default function(props){

    console.log(props.reports);

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
                    <th>Report Image</th>
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
                            <td>{report.diagnosisDetail}</td>
                            <td>{report.date}</td>
                            <td>{report.imageName}</td>
                            
                        </tr> 
                    )
                }
            </tbody>

        </table>

    </div>
    )

}