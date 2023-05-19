import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

export default function MessageToast(props){

    const {show, setShow, message} = props;

    return(
        <Row>
            <Col xs={6}>
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                    <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                    />
                    <strong className="me-auto">Message...</strong>
                    <small>Now</small>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
                </Toast>
            </Col>
        </Row>
    )
}