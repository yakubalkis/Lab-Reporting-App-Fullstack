import { Modal } from 'react-bootstrap';

export default function ReportImage(props){

    const { show, onClose } = props;



    return(
        <div style={{width: "40rem"}}>
            <Modal show={show} onHide={onClose} centered>
                <img src={`data:image/png;base64,`+ props.imgData} />
            </Modal>
        </div>
    )
    
}