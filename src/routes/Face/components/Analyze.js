import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import RadialChart from './RadialChart';
import ProgressBar from './ProgressBar';
import faceImg from '../../../assets/images/face.png';

class Analyze extends React.Component {
  componentDidMount() {
    this.props.analyzeFace();
  }

  render() {
    const { face, analyzing, similarity, matchValue } = this.props;

    return (
      <Card>
        <CardBody>
          <Row>
            <Col xs="12">
              <h1 className="h1 text-uppercase text-center">How does your face fit?</h1>
            </Col>
            <Col md="6">
              <img src={faceImg} alt="face" className="img-fluid" />
              <p className="mt-2 text-center text-uppercase text">
                Base detection reference: <br />
                Lewis Hamilton
              </p>
            </Col>
            <Col md="6" className="right-pane">
              { analyzing
                ?
                  <div>Analyzing...</div>
                :
                  <div className="bg-grey p-4">
                    <p className="text-uppercase text">
                      Feature set <br />
                      Proportion match
                    </p>
                    <div className="points">
                      { similarity && similarity.map((percent, ind) =>
                          <div className="d-flex mb-3" key={ind}>
                            <div className="text text-uppercase">
                              x
                              <sub>{ind + 1}</sub>
                            </div>
                            <ProgressBar percent={percent} showLabel duration={300} timeout={ind * 300} />
                          </div>
                        )
                      }
                    </div>
                    <div className="match-block d-flex justify-content-center align-items-center">
                      <h1 className="h1 text-uppercase">Match</h1>
                      {
                        matchValue &&
                        <RadialChart percent={matchValue} duration={300} timeout={1200} />
                      }
                      <h1 className="h1">%</h1>
                    </div>
                  </div>
              }
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
};

export default Analyze;
