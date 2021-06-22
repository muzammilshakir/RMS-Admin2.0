
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

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allotteeData: [],
            roomData: [],
            floorData: [],
            bedData: [],
            allotmentData: [],
            floorRoom: [],
            roomBed: [],

            allotteeId: "",
            allotteeIdInvalid: false,
            floorId: "",
            floorIdInvalid: false,
            roomId: "",
            roomIdInvalid: false,
            bedId: "",
            bedIDInvalid:false,
            securityCharges: '0',
            registeraitonCharges: '0',
            monthlyRent: '0',
            securityChargesInvalid: false,
            registrationChargesInvalid: false,
            monthlyRentInvalid: false,

        }
        this.changeAllotteeId = this.changeAllotteeId.bind(this);
        this.changeFloorId = this.changeFloorId.bind(this) ;
        this.changeRoomId = this.changeRoomId.bind(this);
        this.changeBedId = this.changeBedId.bind(this) ;
        this.changeSecurityCharges = this.changeSecurityCharges.bind(this) ;
        this.changeRegisterationCharges = this.changeRegisterationCharges.bind(this) ;
        this.changeMonthlyRent = this.changeMonthlyRent.bind(this) ;
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.setState({allotteeData: this.props.allotteeData, 
                        floorData: this.props.floorData, 
                        bedData: this.props.bedData, 
                        roomData: this.props.roomData,
                        allotmentData: this.props.allotmentData
                      });
    }
    //Validation
    changeAllotteeId(values) {
      this.setState({allotteeId: values.target.value});
      
      if (values.target.value === "") this.setState({allotteeIdInvalid: true}) ;
      else this.setState({allotteeIdInvalid: false}) ;
    }
    changeFloorId(values) {
      this.setState({floorId: values.target.value});
      let val = values.target.value;
      if (values.target.value === "") this.setState({floorIdInvalid: true}) ;
      else {
        this.setState({floorIdInvalid: false}) ;
        let floorData = this.state.floorData;
          let roomFloor = [];
          for (var i = 0 ; i < floorData.length ; i++) {
            if (floorData[i]._id === val) {
              for (var j = 0 ; j < floorData[i].rooms.length ; j++) {
                for (var k = 0 ; k < this.state.roomData.length ; k++) {
                  if (floorData[i].rooms[j] === this.state.roomData[k]._id) {
                    roomFloor.push(this.state.roomData[k]);
                  }
                }
              }
              this.setState({floorRoom: roomFloor});
              return ;
            }
          }
      }
    }
    changeRoomId(values) {
      this.setState({roomId: values.target.value});
      let val = values.target.value;
      if (values.target.value === "") this.setState({roomIdInvalid: true}) ;
      else {
        this.setState({roomIdInvalid: false}) ;
        let roomData = this.state.roomData;
          let roomBed = [];
          for (var i = 0 ; i < roomData.length ; i++) {
            if (roomData[i]._id === val) {
              for (var j = 0 ; j < roomData[i].beds.length ; j++) {
                for (var k = 0 ; k < this.state.bedData.length ; k++) {
                  if (roomData[i].beds[j] === this.state.bedData[k]._id) {
                    roomBed.push(this.state.bedData[k]);
                  }
                }
              }
              this.setState({roomBed: roomBed});
              return ;
            }
          }
      }
    }
    changeBedId(values) {
      this.setState({bedId: values.target.value});
      if (values.target.value === "") this.setState({bedIDInvalid: true}) ;
      else {
        this.setState({bedData: false}) ;}
    }
    changeSecurityCharges(values) {
      let val = values.target.value ;
      this.setState({securityCharges: val}) ;
      let check = false ;
      if (val === '') check = true ;
      for (var i = 0 ; i < val.length ; i++) {
        if (val[i] >= '0' && val <= '9') continue ;
        check = true ;
        break ;
      }
      this.setState({securityChargesInvalid: check}) ;
    }
    changeRegisterationCharges(values) {
      let val = values.target.value ;
      this.setState({registeraitonCharges: val}) ;
      let check = false ;
      if (val === '') check = true ;
      for (var i = 0 ; i < val.length ; i++) {
        if (val[i] >= '0' && val[i] <= '9') continue ;
        check = true ;
        break ;
      }
      this.setState({registrationChargesInvalid: check}) ;
    }
    changeMonthlyRent(values) {
      let val = values.target.value ;
      this.setState({monthlyRent: val}) ;
      let check = false ;
      if (val === '') check = true ;
      for (var i = 0 ; i < val.length ; i++) {
        if (val[i] >= '0' && val[i] <= '9') continue ;
        check = true ;
        break ;
      }
      this.setState({monthlyRentInvalid: check}) ;
    }
    async handleSubmit(values) {
      values.preventDefault();
      if (
        this.state.allotteeIdInvalid === false &&
        this.state.floorIdInvalid === false &&
        this.state.roomIdInvalid === false &&
        this.state.bedIDInvalid === false &&
        this.state.securityChargesInvalid === false &&
        this.state.registrationChargesInvalid === false &&
        this.state.monthlyRentInvalid === false 
      ){
        let tLoad = toast.loading("Adding New Allotment")
        await this.props.postingAllotment(this.state.allotteeId, this.state.bedId, this.state.securityCharges, this.state.registeraitonCharges, this.state.monthlyRent)
        this.setState({allotteeData: this.props.allotteeData, 
          floorData: this.props.floorData, 
          bedData: this.props.bedData, 
          roomData: this.props.roomData,
          allotmentData: this.props.allotmentData
        });
        this.setState({allotteeId: '', bedId: '', floorId: '', roomId: '', registeraitonCharges: 0, monthlyRent: 0, securityCharges: 0});
        toast.dismiss(tLoad);
        toast.success("New Allotment Added");
      }
      else {
        toast.error("Inavlid Entry");
      }
      
    }
    async handleDelete(data) {
      let tLoad = toast.loading("Deleting Allotment") ;
      await this.props.deletingAllotment(data._id) ;
      this.setState({allotmentData: this.props.allotmentData});
      toast.dismiss(tLoad) ;
      toast.success("Allotment Deleted");
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
                  <CardTitle tag="h5">Enter Allotment Information</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                        <Col className="pr-1" md="12">
                          <FormGroup>
                          <label>Allottee </label>
                          <Input
                            type="select"
                            onChange = {this.changeAllotteeId}
                            value = {this.state.allotteeId}
                            required
                          >
                            <option value="" disabled selected>Select Allotee</option>
                            {
                                this.state.allotteeData.map((data, index) => {
                                    let check = false ;
                                    for (var i = 0 ; i < this.state.allotmentData.length ; i++) {
                                      if (data._id === this.state.allotmentData[i].studentId) {
                                        check = true ;
                                        break ;
                                      }
                                    }
                                    if (check) {
                                      return (<></>);
                                    }
                                    else {
                                      return (
                                        <option key={index} value={data._id}>{data.name}</option>
                                      );
                                    }
                                    
                                })
                            }
                          </Input>
                        </FormGroup>
                        </Col>
                      
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Floor</label>
                          <Input
                            type="select"
                            onChange = {this.changeFloorId}
                            value = {this.state.floorId}
                            required
                          >
                            <option value="" disabled selected>Select Floor</option>
                            {
                                this.state.floorData.map((data, index) => {
                                    return (
                                        <option key={index} value={data._id}>{data.name}</option>
                                    );
                                })
                            }
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Room</label>
                          <Input
                            type="select"
                            onChange = {this.changeRoomId}
                            value = {this.state.roomId}
                            required
                          >
                            <option value=""  selected>Select Room</option>
                            {
                                this.state.floorRoom.map((data, index) => {
                                    return (
                                        <option key={index} value={data._id}>{data.name}</option>
                                    );
                                })
                            }
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Bed </label>
                          <Input
                            type="select"
                            onChange = {this.changeBedId}
                            value = {this.state.bedId}
                            required
                          >
                            <option value=""  selected>Select Bed</option>
                            {
                                this.state.roomBed.map((entry, index) => {
                                  return (
                                    <option key={index} value={entry._id}>{ entry.name }</option>
                                  );
                                    
                                })
                            }
                          </Input>
                        </FormGroup>
                      </Col>
                      
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                             <label>Security Deposit</label>
                          <Input
                            type="text"
                            onChange = {this.changeSecurityCharges}
                            value = {this.state.securityCharges}
                            invalid={this.state.securityChargesInvalid}
                          />
                            
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                      <FormGroup>
                      <label>Registration Charges</label>
                          <Input
                          placeholder="Enter Charges"
                            type="text"
                            onChange = {this.changeRegisterationCharges}
                            value = {this.state.registeraitonCharges}
                            invalid={this.state.registrationChargesInvalid}
                          />
                        </FormGroup>
                        </Col>
                        
                      <Col className="px-1" md="4">
                        <FormGroup> 
                          <label>Monthly Rent</label>
                          <Input
                            placeholder="Enter Rent"
                            type="text"
                            onChange = {this.changeMonthlyRent}
                            value = {this.state.monthlyRent}
                            invalid = {this.state.monthlyRentInvalid}
                          />
                          <FormFeedback></FormFeedback>
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
                  <CardTitle tag="h4">All Allotments</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Allottee</th>
                        <th>Bed</th>
                        <th>Security Deposit</th>
                        <th>Registeration Charges</th>
                        <th>Monthly Rent</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.allotmentData.map(((record) => {
                            let bedName = "";
                            let allotteeName = "";
                            for (var i = 0 ; i < this.state.bedData.length ; i++) {
                              if (this.state.bedData[i]._id === record.bedId) {
                                bedName = this.state.bedData[i].name ;
                                break ;
                              }
                            }
                            for (var j = 0 ; j < this.state.allotteeData.length ; j++) {
                              if (this.state.allotteeData[j]._id === record.studentId) {
                                allotteeName = this.state.allotteeData[j].name ;
                                break ;
                              }
                            }
                            return (
                                <>
                                <tr>
                                <td>{allotteeName}</td>
                                <td>{bedName}</td>
                                <td>{record.securityDeposit}</td>
                                <td>{record.registerationCharges}</td>
                                <td>{record.monthlyRent}</td>
                                <td><Button color="danger" onClick={() => this.handleDelete(record)} >Delete</Button></td>
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

export default User;
