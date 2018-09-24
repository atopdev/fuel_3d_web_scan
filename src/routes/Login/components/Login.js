import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
} from 'reactstrap';
import { renderInput } from '../../../components/form';
import { loginFormValidate } from '../../../helpers/validates';

const Login = ({ submitting, loading, handleSubmit }) => (
  <div className="app flex-row align-items-center">
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <CardGroup>
            <Card className="p-4">
              <CardBody>
                <form onSubmit={handleSubmit}>
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <Field name="email" type="email" label="Email" component={renderInput} />
                  <Field name="password" type="password" label="Password" component={renderInput} />
                  <Row>
                    <Col>
                      <Button type="submit" color="primary" className="px-4" disabled={submitting || loading}>Login</Button>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  </div>
);

export default reduxForm({
  form: 'loginForm',
  onSubmit: (values, dispatch, props) => {
    props.loginUser(values);
  },
  validate: loginFormValidate,
})(Login);
