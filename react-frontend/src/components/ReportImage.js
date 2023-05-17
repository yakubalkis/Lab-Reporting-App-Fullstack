

export default function ReportImage(props){

    return(
        <div className="image-cart-div">
            
            <img src={`data:image/png;base64,`+ props.imgData} />
        </div>
    )
    
}