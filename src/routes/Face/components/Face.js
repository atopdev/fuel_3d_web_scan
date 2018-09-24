import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, UncontrolledTooltip } from 'reactstrap';
import classnames from 'classnames';
import Analyze from './Analyze';

class Face extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      faceId: this.props.match.params.faceId,
    };
  }

  componentDidMount() {
    this.props.loadFace(this.state.faceId, this.threeRootElement);
  }

  componentWillUnmount() {
    this.props.resetData();
  }

  render() {
    const { face, analyzeView, texture, analyzing, similarity, matchValue } = this.props;
    const textures = [
      { name: 'goodwood', icon: 'fa-circle' },
      { name: 'color', icon: 'fa-adjust' },
      { name: 'metal', icon: 'fa-circle-o' },
    ];

    return (
      <div className="container-fluid">
        <div className="animated fadeIn mt-3">
          <Row className="mb-2">
            <Col>
              <Link to="/" className="btn btn-link">Back</Link>
            </Col>
          </Row>
          { !analyzeView
            ?
              <Row>
                <Col>
                  <div className="object-renderer" ref={element => this.threeRootElement = element}></div>
                  <div className="text-center my-2">
                    { textures.map(item =>
                        <Fragment key={item.name}>
                          <Button
                            color="secondary"
                            className="mx-2"
                            onClick={() => this.props.updateTexture(item.name)}
                            outline={texture !== item.name}
                            active={texture === item.name}
                            id={item.name}
                          >
                            <i className={classnames('fa', 'fa-2x', item.icon)}></i>
                          </Button>
                          <UncontrolledTooltip placement="top" target={item.name} className="text-uppercase">
                            {item.name}
                          </UncontrolledTooltip>
                        </Fragment>
                      )
                    }
                  </div>
                  <Button color="link" className="btn-next" onClick={() => this.props.showAnalyzeView()}>Next</Button>
                </Col>
              </Row>
            :
              <Analyze face={face} analyzeFace={this.props.analyzeFace} analyzing={analyzing} similarity={similarity} matchValue={matchValue} />
          }
        </div>
      </div>
    )
  }
}

export default Face;
