
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
var axios = require("axios");

class Allottee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allotteeData: [],
            allotteeName: '',
            allotteePhoto: '',
            photoURL: '',
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
        this.changeAllotteePhoto = this.changeAllotteePhoto.bind(this) ;
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
    fetchingAllottee() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        var url = '';
        if (process.env.NODE_ENV === 'production') {
          url = 'https://repairmanagement.herokuapp.com/api/allottee';
        }
        else {
          url = 'http://localhost:3443/api/allottee';
        }
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({allotteeData: data});
                
            })
            .catch((error) => console.log(error));
    }
    postingAllottee() {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ allotteeName: this.state.allotteeName, 
                                  cellNumber: this.state.cellNumber,
                                  emailId: this.state.emailAddress,
                                  emergencyContactNumber: this.state.emergencyContactNumber,
                                  occupation: this.state.occupation, 
                                  bloodGroup: this.state.bloodGroup,
                                  guardianName: this.state.guardianName,
                                  guardianCellNumber: this.state.guardianPhoneNumber,
                                  city: this.state.city,
                                  state: this.state.state,
                                  country: this.state.country,
                                  address: this.state.address,  })
      };
      var url = '';
      if (process.env.NODE_ENV === 'production') {
        url = 'https://repairmanagement.herokuapp.com/api/allottee';
      }
      else {
        url = 'http://localhost:3443/api/allottee';
      }
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            //console.log(data) ;
            this.fetchingAllottee();
        })
        .catch((error) => console.log(error));
    }
    componentDidMount(){
      this.setState({allotteeData: this.props.allotteeData});
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
    changeAllotteePhoto(values) {
      this.setState({allotteePhoto: values.target.files[0]})
      console.log("State: ", this.state.allotteePhoto);
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
    async uploadImage() {
      const data = new FormData();
      console.log(this.state.allotteePhoto);
      data.append("file", this.state.allotteePhoto);
      data.append("upload_preset", "hms_admin");
      data.append("cloud_name", "zam-technologies");
      const config = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
      var response = await axios.post("https://api.cloudinary.com/v1_1/zam-technologies/upload", data, config) ;
      this.setState({photoURL: response.data.url});
      console.log(response);

    }
    async handleSubmit(values) {
      values.preventDefault();
      if (
        this.state.allotteeNameInvalid === false &&
        this.state.allotteePhoto !== '' &&
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
        let tLoad = toast.loading("Adding New Allottee");
        await this.uploadImage();
        await this.props.postingAllottee(this.state.allotteeName, 
                                          this.state.photoURL,
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
        this.setState({
          allotteeName: '',
          allottePassword: '',
          photoURL: '',
          allotteePhoto: '',
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
        });
        toast.dismiss(tLoad);
        toast.success("New Allottee Added") ;
      }
      else {
        toast.error("Wrong Input");
      }
      
    }
    async handleDelete(id) {
        let tLoad = toast.loading("Deleting Allottee") ;
        await this.props.deletingAllottee(id) ;
        this.setState({allotteeData: this.props.allotteeData});
        toast.dismiss(tLoad) ;
        toast.success("Allottee Deleted");
    }
  render() {
    return (
      <>
        <div className="content">
        {!isAuthenticated(sessionStorage.getItem('HMS-Admin')) ? <Redirect to="/admin/login" /> : <></>}
          <Row>
            
            <Col md="12">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Enter Allottee Information</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)} encType='multipart/form-data'>
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
                      <Col className="pr-1" md="8">
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
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Profile Photo</label>
                          <Input 
                              type="file" 
                              accept=".png, .jpg, .jpeg"
                              name="Profile Photo"
                              onChange={this.changeAllotteePhoto}
                              required
                          />
                          <FormFeedback>Not an image</FormFeedback>
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
                  <CardTitle tag="h4">All Allottee's</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Father Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        <th>Father Contact Number</th>
                        <th>Occupation</th>
                        <th>Guardian Name</th>
                        <th>Guardian Relation</th>
                        <th>Guardian Contact Number</th>
                        <th>Blood Group</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.allotteeData.map(((record) => {
                            return (
                                <>
                                <tr>
                                <td>{record.name}</td>
                                <td>{record.fatherName}</td>
                                <td>{record.address}</td>
                                <td>{record.city}</td>
                                <td>{record.state}</td>
                                <td>{record.country}</td>
                                <td>{record.contactNumber}</td>
                                <td>{record.email}</td>
                                <td>{record.fatherContactNumber}</td>
                                <td>{record.occupation}</td>
                                <td>{record.guardianName}</td>
                                <td>{record.guardianRelation}</td>
                                <td>{record.guardianContactNumber}</td>
                                <td>{record.bloodGroup}</td>
                                <td><Button color="danger" onClick={() => this.handleDelete(record._id)} >Delete</Button></td>
                                </tr>
                                </>
                            );
                        }))}
                      
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
        </div>
      </>
    );
  }
}

export default Allottee;
