import React from 'react';
import { Row, Col, Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.loadFaces();
  }

  render() {
    const { loading, faces } = this.props;

    return (
      <div className="container">
        <div className="animated fadeIn mt-3">
          { loading
            ? <div>Loading...</div>
            :
              <Row>
                { faces && faces.map(face => (
                    <Col sm={12} md={6} lg={4} key={face.id}>
                      <Link to={`/${face.id}`}>
                        <Card inverse>
                          <CardImg width="100%" src={face.url} alt={face.name} />
                          <CardImgOverlay>
                            <CardTitle>{face.name}</CardTitle>
                          </CardImgOverlay>
                        </Card>
                      </Link>
                    </Col>
                  ))
                }
              </Row>
          }
        </div>
      </div>
    );
  }
}

export default Dashboard;
