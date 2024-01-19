import { FormEvent, useState } from "react";
import { useAppDispatch } from "../store/store";
import { setCurrentUser } from "../store/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import APICall from "../classes/APICall";

type LoginData = {
  username: string;
  password: string;
};

type UserRole = {
  _id: string;
  role_description: string;
};

type CurrentUser = {
  username: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  isAuth: boolean;
};

type APIResponse = {
  status: number;
  message: string;
  data?: CurrentUser;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showSpinner, setShowSpinner] = useState(false);
  const [formValidation, setFormValidation] = useState({
    usernameInvalid: false,
    passwordInvalid: false,
  });
  const [error, setError] = useState({
    hasError: false,
    errorMessage: "",
  });
  const [userLoginData, setUserLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const handleOnUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== "") {
      setUserLoginData((prev) => {
        return { ...prev, username: e.target.value };
      });
      setFormValidation((prev) => {
        return { ...prev, usernameInvalid: false };
      });
    } else {
      setFormValidation((prev) => {
        return { ...prev, usernameInvalid: true };
      });
    }
  };

  const handleOnPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== "") {
      setUserLoginData((prev) => {
        return { ...prev, password: e.target.value };
      });
      setFormValidation((prev) => {
        return { ...prev, passwordInvalid: false };
      });
    } else {
      setFormValidation((prev) => {
        return { ...prev, passwordInvalid: true };
      });
    }
  };

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();

    let isValidated = true;

    if (userLoginData.username == "" || userLoginData.username == null) {
      setFormValidation((prev) => {
        return { ...prev, usernameInvalid: true };
      });
      isValidated = false;
    }
    if (userLoginData.password === "" || userLoginData.password === null) {
      setFormValidation((prev) => {
        return { ...prev, passwordInvalid: true };
      });
      isValidated = false;
    }

    if (isValidated) {
      setShowSpinner(true);
      try {
        const res: APIResponse = await APICall.post(
          "http://localhost:3000/api/auth/login",
          userLoginData
        );

        if (res.status == 200 && typeof res.data !== "undefined") {
          setError(() => {
            return { hasError: false, errorMessage: "" };
          });
          dispatch(setCurrentUser(res.data!));
          navigate("/dashboard");
        } else {
          setShowSpinner(false);
          setError(() => {
            return { hasError: true, errorMessage: res.message };
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='appContainer loginPage d-flex align-items-center'>
      <Container className='appContainer'>
        <Row className='row d-flex justify-content-center'>
          <Col lg={6}>
            <Card className='shadow-lg'>
              <Card.Body>
                <Form noValidate>
                  <h2 className='mt-3 mb-5 text-center'>
                    <u className='purple-underline'>Welcome</u>
                  </h2>
                  <Form.Group className='form-floating mb-3'>
                    <Form.Control
                      type='text'
                      className='form-control'
                      id='username'
                      required
                      isInvalid={formValidation.usernameInvalid}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleOnUsernameChange(e)
                      }
                    />
                    <Form.Label htmlFor='username'>Username</Form.Label>
                    <Form.Control.Feedback type='invalid'>
                      Uh-oh! Please enter your username!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='form-floating mb-3'>
                    <Form.Control
                      type='password'
                      className='form-control'
                      id='password'
                      required
                      isInvalid={formValidation.passwordInvalid}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleOnPasswordChange(e)
                      }
                    />
                    <Form.Label htmlFor='password' className=''>
                      Password
                    </Form.Label>
                    <Form.Control.Feedback type='invalid'>
                      Don't forget your password!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className='mb-3 d-flex justify-content-center'>
                    <small
                      className={`text-danger text-center ${
                        error.hasError ? "" : "d-none"
                      }`}
                    >
                      {error.errorMessage}
                    </small>
                  </Form.Group>

                  <Form.Group className='d-flex flex-column justify-content-center align-items-center row'>
                    <Col lg={8}>
                      <Button
                        variant='outline-purple'
                        type='submit'
                        onClick={(e) => onLogin(e)}
                        size='lg'
                        className='rounded-pill mb-3 w-100'
                      >
                        Login{" "}
                        <Spinner
                          as='span'
                          animation='border'
                          role='status'
                          size='sm'
                          aria-hidden='true'
                          className={`${showSpinner ? "" : "d-none"}`}
                        />
                      </Button>
                    </Col>
                    {/* <Col lg={8}>
                      <Button
                        variant='outline-purple'
                        size='lg'
                        className='rounded-pill w-100'
                      >
                        Forgot Password?
                      </Button>
                    </Col> */}
                  </Form.Group>
                  <Form.Group>
                    <p className='text-black text-center mt-3'>
                      Don't have an account?{" "}
                      <Link
                        to='/'
                        className='text-decoration-none text-purple border-bottom'
                      >
                        Message me!
                      </Link>
                    </p>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
