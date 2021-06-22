
import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import {Redirect} from 'react-router-dom';
import isAuthenticated from "../../auth/index";
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
  Table,
  FormFeedback
} from "reactstrap";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allotteeData: [],
            allotmentData: [],
            bedData: [],
            rentData:[],
            allotteeId: '',
            allotteeName: '',
            allotteePhoto: '',
            allottePassword: '',
            cellNumber:'',
            emailAddress: '',
            emergencyContactNumber: '',
            occupation: '',
            bloodGroup: '',
            guardianName: '',
            guardianPhoneNumber: '',
            city: '',
            state: '',
            country: '',
            address: '',
            fatherName:'',
            fatherPhoneNumber:'',
            guardianRelation:'',
            // reactstrap components
            allotteeNameInvalid: false,
            allotteePasswordInvalid: false, 
            cellNumberInvalid: false,
            emailAddressInvalid: false,
            emergencyContactNumberInvalid: false,
            //occupationInvalid: false,
            //bloodGroupInvalid: false,
            guardianNameInvalid: false,
            guardianPhoneNumberInvalid: false,
            cityInvalid: false,
            //stateInvalid: false,
            countryInvalid: false,
            addressInvalid: false,
            fatherNameInvalid:false,
            fatherPhoneNumberInvalid:false,
            guardianRelationInvalid:false,
        }
        this.changeAllotteeName = this.changeAllotteeName.bind(this) ;
        this.changeAllotteePassword = this.changeAllotteePassword.bind(this) ;
        this.changeCellNumber = this.changeCellNumber.bind(this) ;
        this.changeEmailAddress = this.changeEmailAddress.bind(this) ;
        this.changeEmergencyContactNumber = this.changeEmergencyContactNumber.bind(this) ;
        this.changeOccupation = this.changeOccupation.bind(this) ;
        this.changeBloodGroup = this.changeBloodGroup.bind(this) ;
        this.changeGuardianName = this.changeGuardianName.bind(this) ;
        this.changeGuardianPhoneNumber = this.changeGuardianPhoneNumber.bind(this) ;
        this.changeCity = this.changeCity.bind(this) ;
        this.changeState = this.changeState.bind(this) ;
        this.changeCountry = this.changeCountry.bind(this);
        this.changeAddress = this.changeAddress.bind(this) ;
        this.changeFatherName=this.changeFatherName.bind(this);
        this.changeFatherPhoneNumber=this.changeFatherPhoneNumber.bind(this);
        this.changeGuardianRelation=this.changeGuardianRelation.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
      //this.setState({allotteeData: this.props.allotteeData});
      //let id = this.props.id;
      console.log("id", this.props.match.params.id);
      let allotteeId = this.props.match.params.id ;
      let index = undefined; ;
      for (var i = 0 ; i < this.props.allotteeData.length ; i++) {
          if (this.props.allotteeData[i]._id === allotteeId) {
            index = i ;
            break ;
          }
      }
      this.setState({
        allotteeName: this.props.allotteeData[index].name,
        allotteePhoto: this.props.allotteeData[index].photo,
        allottePassword: this.props.allotteeData[index].password,
        cellNumber: this.props.allotteeData[index].contactNumber,
        emailAddress: this.props.allotteeData[index].email,
        emergencyContactNumber: this.props.allotteeData[index].guardianContactNumber,
        occupation: this.props.allotteeData[index].occupation,
        bloodGroup: this.props.allotteeData[index].bloodGroup,
        guardianName: this.props.allotteeData[index].guardianName,
        guardianPhoneNumber: this.props.allotteeData[index].guardianContactNumber,
        city: this.props.allotteeData[index].city,
        state: this.props.allotteeData[index].state,
        country: this.props.allotteeData[index].country,
        address: this.props.allotteeData[index].address,
        fatherName:this.props.allotteeData[index].fatherName,
        fatherPhoneNumber:this.props.allotteeData[index].fatherContactNumber,
        guardianRelation:this.props.allotteeData[index].guardianRelation,
        rentData: this.props.rentData,
        allotmentData: this.props.allotmentData,
        bedData: this.props.bedData,
        allotteeId: allotteeId,
      });
        //this.fetchingGuradianRecords();
    }
    //Validation
    changeAllotteeName(values) {
      var name = values.target.value ;
      if (name.length < 5 || name.length > 30) {
        this.setState({allotteeNameInvalid: true});
      }
      else {
        this.setState({allotteeNameInvalid: false});
      }
      this.setState({allotteeName: values.target.value});
    }
    changeAllotteePassword(values) {
      var name = values.target.value ;
      if (name.length < 7) {
        this.setState({allotteePasswordInvalid: true});
      }
      else {
        this.setState({allotteePasswordInvalid: false});
      }
      this.setState({allottePassword: values.target.value});
    }
    changeCellNumber(values) {
      this.setState({cellNumber: values.target.value});
      
      var number = values.target.value ;
      for (var i = 0 ; i < number.length; i++) {
        if (number[i] < '0' || number[i] > '9') {
          this.setState({cellNumberInvalid: true});
          return ;
        }
      }
      if (number.length !== 12) {
        this.setState({cellNumberInvalid: true});
      }
      else {
        this.setState({cellNumberInvalid: false});
      }
    }
    changeEmailAddress(values) {
      var email  = values.target.value ;
      var check = false ;
      for (var i = 0 ; i < email.length ; i++) {
        if (email[i] === '@') check = true ;
      }
      if (check) {
        this.setState({emailAddressInvalid: false});
      }
      else {
        this.setState({emailAddressInvalid: true});
      }
      this.setState({emailAddress: values.target.value});
    }
    changeEmergencyContactNumber(values) {
      this.setState({emergencyContactNumber: values.target.value});
      
      var number = values.target.value ;
      for (var i = 0 ; i < number.length; i++) {
        if (number[i] < '0' || number[i] > '9') {
          this.setState({emergencyContactNumberInvalid: true});
          return ;
        }
      }
      if (number.length !== 12) {
        this.setState({emergencyContactNumberInvalid: true});
      }
      else {
        this.setState({emergencyContactNumberInvalid: false});
      }
    }
    changeOccupation(values) {
      this.setState({occupation: values.target.value});
    }
    changeBloodGroup(values) {
      this.setState({bloodGroup: values.target.value});
    }
    changeGuardianName(values) {
      var name = values.target.value ;
      if (name.length < 5 || name.length > 30) {
        this.setState({guardianNameInvalid: true});
      }
      else {
        this.setState({guardianNameInvalid: false});
      }
      this.setState({guardianName: values.target.value});
    }
    changeGuardianPhoneNumber(values) {
      this.setState({guardianPhoneNumber: values.target.value});
      
      var number = values.target.value ;
      for (var i = 0 ; i < number.length; i++) {
        if (number[i] < '0' || number[i] > '9') {
          this.setState({guardianPhoneNumberInvalid: true});
          return ;
        }
      }
      if (number.length !== 12) {
        this.setState({guardianPhoneNumberInvalid: true});
      }
      else {
        this.setState({guardianPhoneNumberInvalid: false});
      }
    }
    changeCity(values) {
      var name = values.target.value ;
      if (name.length < 5 || name.length > 30) {
        this.setState({cityInvalid: true});
      }
      else {
        this.setState({cityInvalid: false});
      }
      this.setState({city: values.target.value});
    }
    changeState(values) {
      var name = values.target.value ;
      if (name.length < 5 || name.length > 30) {
        this.setState({stateInvalid: true});
      }
      else {
        this.setState({stateInvalid: false});
      }
      this.setState({state: values.target.value});
    }
    changeCountry(values) {
      var name = values.target.value ;
      if (name.length < 5 || name.length > 30) {
        this.setState({countryInvalid: true});
      }
      else {
        this.setState({countryInvalid: false});
      }
      this.setState({country: values.target.value});
    }
    changeAddress(values) {
      var name = values.target.value ;
      if (name.length < 10 || name.length > 100) {
        this.setState({addressInvalid: true});
      }
      else {
        this.setState({addressInvalid: false});
      }
      this.setState({address: values.target.value});
    }
    changeFatherName(values){
      var name = values.target.value ;
      if (name.length < 5 || name.length > 100) {
        this.setState({fatherNameInvalid: true});
      }
      else {
        this.setState({fatherNameInvalid: false});
      }
      this.setState({fatherName: values.target.value});
    }
    changeFatherPhoneNumber(values){
      this.setState({fatherPhoneNumber: values.target.value});
      
      var number = values.target.value ;
      for (var i = 0 ; i < number.length; i++) {
        if (number[i] < '0' || number[i] > '9') {
          this.setState({fatherPhoneNumberInvalid: true});
          return ;
        }
      }
      if (number.length !== 12) {
        this.setState({fatherPhoneNumberInvalid: true});
      }
      else {
        this.setState({fatherPhoneNumberInvalid: false});
      }
    }
    changeGuardianRelation(values){
      this.setState({guardianRelation: values.target.value});
      var name = values.target.value ;
      if (name.length < 4 || name.length > 100) {
        this.setState({guardianRelationInvalid: true});
      }
      else {
        this.setState({guardianRelationInvalid: false});
      }
      
    }
    async handleSubmit(values) {
      values.preventDefault();
      if (
        this.state.allotteeNameInvalid === false &&
        this.state.allotteePasswordInvalid === false &&
        this.state.cellNumberInvalid === false &&
        this.state.emailAddressInvalid === false &&
        this.state.emergencyContactNumberInvalid === false &&
        this.state.guardianNameInvalid === false &&
        this.state.guardianPhoneNumberInvalid === false &&
        this.state.cityInvalid === false  &&
        this.state.countryInvalid === false &&
        this.state.addressInvalid === false 
      ){
        let tLoad = toast.loading("Updating Allottee");
        await this.props.updatingAllottee(this.state.allotteeId,
                                          this.state.allotteeName, 
                                          this.state.allottePassword,
                                          this.state.fatherName,
                                          this.state.address,
                                          this.state.city,
                                          this.state.state,
                                          this.state.country,
                                          this.state.cellNumber,
                                          this.state.emailAddress,
                                          this.state.fatherPhoneNumber,
                                          this.state.occupation,
                                          this.state.guardianName,
                                          this.state.guardianRelation,
                                          this.state.guardianPhoneNumber,
                                          this.state.bloodGroup);
        this.setState({allotteeData: this.props.allotteeData}) ;
        toast.dismiss(tLoad);
        toast.success("Allottee Updated") ;
      }
      else {
        toast.error("Wrong Input");
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
                  <CardTitle tag="h5"></CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="author">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="avatar border-gray"
                          src={this.state.allotteePhoto}
                        />
                        <h5 className="title">{this.state.allotteeName}</h5>
                      </a>
                    </div>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                      <Col className="pr-1 " md="6">
                        <FormGroup>
                          <label>Allottee Name</label>
                          <Input
                            placeholder="Allottee Name"
                            type="text"
                            onChange = {this.changeAllotteeName}
                            value = {this.state.allotteeName}
                            invalid = {this.state.allotteeNameInvalid}
                            required
                          />
                          <FormFeedback>Not a valid allottee name</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="pr-1 " md="6">
                        <FormGroup>
                          <label>Allottee Password</label>
                          <Input
                            placeholder="Allottee Password"
                            type="text"
                            onChange = {this.changeAllotteePassword}
                            value = {this.state.allottePassword}
                            invalid = {this.state.allotteePasswordInvalid}
                            required
                          />
                          <FormFeedback>Not a valid allottee password</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Cell Number</label>
                          <Input
                            placeholder="Cell Number"
                            type="text"
                            onChange = {this.changeCellNumber}
                            value = {this.state.cellNumber}
                            invalid = {this.state.cellNumberInvalid}
                            required
                          />
                          <FormFeedback>Not a valid cell number</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Email Address</label>
                          <Input
                            placeholder="Email Address"
                            type="text"
                            onChange = {this.changeEmailAddress}
                            value = {this.state.emailAddress}
                            invalid = {this.state.emailAddressInvalid}
                            required
                          />
                          <FormFeedback>Not a valid email address</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Emergency Contact Number</label>
                          <Input
                            placeholder="Emergency Contact Number"
                            type="text"
                            onChange = {this.changeEmergencyContactNumber}
                            value = {this.state.emergencyContactNumber}
                            invalid = {this.state.emergencyContactNumberInvalid}
                            required
                          />
                          <FormFeedback>Not a valid emergency contact number</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Occupation</label>
                          <Input
                            type="select"
                            onChange = {this.changeOccupation}
                            value = {this.state.occupation}
                            required
                          >
                            <option value="" disabled selected>Select your occupation</option>
                            <option value="Student">Student</option>
                            <option value="Job Holder">Job Holder</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Blood Group</label>
                          <Input
                            type="select"
                            onChange = {this.changeBloodGroup}
                            value = {this.state.bloodGroup}
                            required
                          >
                            <option value="" disabled selected>Select your Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </Input>
                          <FormFeedback>Not a valid blood group</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Father Name</label>
                          <Input
                            placeholder="Father Name"
                            type="text"
                            onChange = {this.changeFatherName}
                            value = {this.state.fatherName}
                            invalid = {this.state.fatherNameInvalid}
                            required
                          />
                          <FormFeedback>Not a valid name</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Father Phone Number</label>
                          <Input
                            placeholder="Father Number"
                            type="text"
                            onChange = {this.changeFatherPhoneNumber}
                            value = {this.state.fatherPhoneNumber}
                            invalid = {this.state.fatherPhoneNumberInvalid}
                            required
                          />
                          <FormFeedback>Not a valid phone number</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Guardian Name</label>
                          <Input
                            placeholder="Guardian Name"
                            type="text"
                            onChange = {this.changeGuardianName}
                            value = {this.state.guardianName}
                            invalid = {this.state.guardianNameInvalid}
                            required
                          />
                          <FormFeedback>Not a valid guardian name</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Guardian Phone Number</label>
                          <Input
                            placeholder="Guardian Number"
                            type="text"
                            onChange = {this.changeGuardianPhoneNumber}
                            value = {this.state.guardianPhoneNumber}
                            invalid = {this.state.guardianPhoneNumberInvalid}
                            required
                          />
                          <FormFeedback>Not a valid guardian phone number</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Guardian Relation</label>
                          <Input
                            placeholder="Guardian Relation"
                            type="text"
                            onChange = {this.changeGuardianRelation}
                            value = {this.state.guardianRelation}
                            invalid = {this.state.guardianRelationInvalid}
                            required
                          />
                          <FormFeedback>Not a valid Relation</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            placeholder="City"
                            type="text"
                            onChange = {this.changeCity}
                            value = {this.state.city}
                            invalid = {this.state.cityInvalid}
                            required
                          />
                          <FormFeedback>Not a valid city</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup> 
                          <label>State</label>
                          <Input
                            type="select"
                            onChange = {this.changeState}
                            value = {this.state.state}
                            required
                          >
                            <option value="" disabled>Select your state</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Sindh">Sindh</option>
                            <option value="KPK">KPK</option>
                            <option value="Balochistan">Balochistan</option>
                            <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                            <option value="Azad Kashmir">Azad Kashmir</option>
                          </Input>
                          <FormFeedback>Not a valid state</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Country
                          </label>
                          <Input 
                            placeholder="Country" 
                            type="text"
                            onChange = {this.changeCountry}
                            value = {this.state.country}
                            invalid = {this.state.countryInvalid}
                            required
                          />
                          <FormFeedback>Not a valid country</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            placeholder="Address"
                            type="text"
                            onChange = {this.changeAddress}
                            value = {this.state.address}
                            invalid = {this.state.addressInvalid}
                            required
                          />
                          <FormFeedback>Not a address</FormFeedback>
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
                          Update
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
                  <CardTitle tag="h4">Allotment Details</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Bed</th>
                        <th>Security Deposit</th>
                        <th>Registeration Charges</th>
                        <th>Monthly Rent</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.allotmentData.map(((record) => {
                            if (record.studentId !== this.state.allotteeId) {
                                return (<></>);
                            }
                            else {
                                let bedName = "";
                                for (var i = 0 ; i < this.state.bedData.length ; i++) {
                                if (this.state.bedData[i]._id === record.bedId) {
                                    bedName = this.state.bedData[i].name ;
                                    break ;
                                }
                                }
                                return (
                                    <>
                                    <tr>
                                    <td>{bedName}</td>
                                    <td>{record.securityDeposit}</td>
                                    <td>{record.registerationCharges}</td>
                                    <td>{record.monthlyRent}</td>
                                    </tr>
                                    </>
                                );
                            }
                            
                        }))}
                      
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
          {/* <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Payment Details</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Created At</th>
                        <th>Rent Month</th>
                        <th>NOP</th>
                        <th>Amount</th>
                        <th>MOP</th>
                        <th>RP</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.rentData.map(((record) => {
                            if (record.allotteeId !== this.state.allotteeId) {
                                return (<></>);
                            }
                            else {
                                return (
                                    <>
                                    <tr>
                                    <td>{record.createdAt}</td>
                                    <td>{record.rentMonth}</td>
                                    <td>{record.natureOfPayment}</td>
                                    <td>{record.amount}</td>
                                    <td>{record.modeOfPayment}</td>
                                    <td>{record.receivingPerson}</td>
                                    </tr>
                                    </>
                                );
                            }
                            
                        }))}
                      
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            
          </Row> */}
        </div>
      </>
    );
  }
}

export default UserProfile;
