import { Modal } from 'react-bootstrap';

export default function ReportImage(props){ // props come from Report component

    const { show, onClose, imgData } = props; // get props


    return(
        <div style={{width: "40rem"}}>
            <Modal show={show} onHide={onClose} centered>
                <img src={`data:image/png;base64,`+ imgData}/>
            </Modal>
        </div>
    )
    
}