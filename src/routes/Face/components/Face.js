import React from 'react';
import { Row, Col } from 'reactstrap';
import logo from '../../../assets/images/logo.png';

class Face extends React.Component {
  componentDidMount() {
    this.props.initialize(this.threeRootElement);
    this.props.loadFace();
  }

  componentWillUnmount() {
    this.props.resetData();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <div className="renderer-container">
              <div className="brand-gradient"></div>
              <img className="logo" src={logo} alt="Fuel3D" />
              <div className="overlay"></div>
              <div className="object-renderer" ref={element => this.threeRootElement = element}></div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Face;
