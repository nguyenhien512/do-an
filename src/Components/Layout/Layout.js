import { Row, Col, Container } from 'react-bootstrap'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({ leftComponent, mainComponent, rightComponent }) => {
    Layout.defaultProps = {
        leftComponent: <div></div>,
        mainComponent: <div></div>,
        rightComponent: <div></div>
    }
    return (
        <div className="m-0 vw-100 vh-100">
            <Header />
            <Row className="bg-body w-100 m-0 h-100">
                <Col id="left" className="bg-transparent pt-3 d-flex justify-content-center">
                    {leftComponent}
                </Col>
                <Col id="main" className="bg-white pt-3 d-flex justify-content-center" lg="6" md="6" xs="6">
                    {mainComponent}
                </Col>
                <Col id="right" className="bg-transparent pt-3 d-flex justify-content-center">
                    {rightComponent}
                </Col>
            </Row>
            <Footer />
        </div>
    )
}

export default Layout