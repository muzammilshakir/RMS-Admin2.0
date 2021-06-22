
import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import {Redirect} from 'react-router-dom';
import isAuthenticated from "../../auth/index";
import ReactTable from "components/ReactTable/ReactTable.js";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

class ManageAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adminData:this.props.adminData.map((prop, key) => {
              return {
                id: key,
                name: prop.name,
                email: prop.email,
              };
            }),
            name: '' ,
            email: '',
            password: '' ,
            nameInvalid: false,
            emailInvalid: false,
            passwordInvalid: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeName = this.changeName.bind(this) ;
        this.changePassword = this.changePassword.bind(this) ;
        this.changeEmail = this.changeEmail.bind(this) ;
    }
    //Validation
    changeName(values) {
      var name = values.target.value ;
      if (name.length < 3 || name.length > 30) {
        this.setState({nameInvalid: true});
      }
      else {
        this.setState({nameInvalid: false});
      }
      this.setState({name: values.target.value});
    }
    changePassword(values) {
        var name = values.target.value ;
        if (name.length < 7 || name.length > 30) {
            this.setState({passwordInvalid: true});
        }
        else {
            this.setState({passwordInvalid: false});
        }
        this.setState({password: values.target.value});
    }
    changeEmail(values) {
        var name = values.target.value ;
        if (name.length < 4 || name.length > 30) {
            this.setState({emailInvalid: true});
        }
        else {
            this.setState({emailInvalid: false});
        }
        this.setState({email: values.target.value});
    }

    async handleSubmit(values) {
      let tLoad = toast.loading("Adding New Admin")
      values.preventDefault();
      if (
          this.state.nameInvalid === false &&
          this.state.emailInvalid === false &&
          this.state.passwordInvalid === false 
       ){
        await this.props.postingAdmin(this.state.name, this.state.email, this.state.password);
        this.setState({
          name: '',
          email: '', 
          password: '',
        });
        toast.dismiss(tLoad);
        toast.success("New Admin Added");
      }
      
    }
  render() {
    return (
      <>
        <div className="content">
        {!isAuthenticated(sessionStorage.getItem('HMS-Admin')) ? <Redirect to="/auth/login" /> : <></>}
          <Row>
            
            <Col md="12">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Enter Admin Information</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                        <Col className="pr-1" md="12">
                            <FormGroup>
                            <label>Name</label>
                            <Input
                                placeholder="Name"
                                type="text"
                                onChange = {this.changeName}
                                value = {this.state.name}
                                invalid = {this.state.nameInvalid}
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="12">
                            <FormGroup>
                            <label>Email</label>
                            <Input
                                placeholder="Email"
                                type="text"
                                onChange = {this.changeEmail}
                                value = {this.state.email}
                                invalid = {this.state.emailInvalid}
                            />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            placeholder="Password"
                            type="text"
                            onChange = {this.changePassword}
                            value = {this.state.password}
                            invalid = {this.state.passwordInvalid}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">All Admins</CardTitle>
                </CardHeader>
                <CardBody>
                    <ReactTable
                      data={this.state.adminData}
                      columns={[
                      {
                          Header: "Name",
                          accessor: "name",
                      },
                      {
                        Header: "Email",
                        accessor: "email",
                      },
                      ]}
                      /*
                      You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
                      */
                      className="-striped -highlight info-pagination"
                  />
                </CardBody>
              </Card>
            </Col>
            
          </Row>
        </div>
      </>
    );
  }
}

export default ManageAdmin;
