
import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import isAuthenticated from "../../auth/index";
import {Redirect} from 'react-router-dom';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  // Label,
  // FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row,
} from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email : "",
      password: "",
      emailValid: true,
      passwordValid: true,
      isAuthenticated: isAuthenticated(sessionStorage.getItem('HMS-Admin')),
      loggingIn: false 
      // 0- Undefined
      // 1 - Redirect 
      // 2 - No Redirect
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }
  changeEmail(values) {
    const email = values.target.value ;
    this.setState({email: email});
  }
  changePassword(values) {
    const password = values.target.value ;
    this.setState({password: password});
  }
  async handleSubmit(values) {
    values.preventDefault();
    if (this.state.emailValid === true && this.state.passwordValid === true) {
      let t = toast.loading("Logging You In !");
      await this.props.login(this.state.email, this.state.password) ;
      if (isAuthenticated(sessionStorage.getItem('HMS-Admin'))) {
        toast.dismiss(t);
        toast.success("Logged In !");
        this.setState({
          email: "",
          password: "",
          isAuthenticated: true,
        });
        
      }
      else {
        toast.dismiss(t) ;
        toast.error(this.props.loginResponse.message);
      }
    }
    else {
      toast.error("Invalid Input");
    }
    
  }
  componentDidMount() {
    document.body.classList.toggle("login-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }
  render() {
    let mainWindow ;
    if (this.state.isAuthenticated) {
      mainWindow = <Redirect to="/admin/dashboard" />
    }
    else {
      mainWindow = 
      <>
        <div className="login-page">
          <Container>
            <Row>
              <Toaster />
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Form action="" className="form" method=""  onSubmit= {(values) => this.handleSubmit(values)}>
                  <Card className="card-login">
                    <CardHeader>
                      <CardHeader>
                        <h3 className="header text-center">Login</h3>
                      </CardHeader>
                    </CardHeader>
                    <CardBody>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          placeholder="Email" 
                          type="text"
                          onChange = {this.changeEmail}
                          value = {this.state.email}
                          invalid = {!this.state.emailValid} />
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-key-25" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          onChange = {this.changePassword}
                          value = {this.state.password}
                          invalid = {!this.state.passwordValid} />
                      </InputGroup>
                      <br />
                    </CardBody>
                    <CardFooter>
                      <Button
                        block
                        className="btn-round mb-3"
                        color="warning"
                        type = "submit"
                      >
                        Login
                      </Button>
                    </CardFooter>
                  </Card>
                </Form>
              </Col>
            </Row>
          </Container>
          <div
            className="full-page-background"
            style={{
              backgroundImage: `url(${require("assets/img/bg/fabio-mangione.jpg")})`,
            }}
          />
        </div>
      </>
    }
    return (
      <>
        {mainWindow}
      </>
    );
  }
}

export default Login;
