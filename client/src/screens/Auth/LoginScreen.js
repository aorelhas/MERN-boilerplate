import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/Container/FormContainer';
import { GoogleLogin } from 'react-google-login';
import env from 'react-dotenv';
import { USER_LOGIN_SUCCESS } from '../../constants/userConstants';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      history.push('/dashboard');
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(login(email, password));
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;

    const token = res?.tokenId;

    try {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: { result, token } });

      localStorage.setItem('userInfo', JSON.stringify({ result, token }));
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const googleFailure = () => {
    console.log('Google Sign In was unsuccessful. Try Again Later');
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <GoogleLogin
        clientId={env.GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Google Login
          </button>
        )}
        buttonText="Login"
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={'single_host_origin'}
      />
      <Row className="py-3">
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
