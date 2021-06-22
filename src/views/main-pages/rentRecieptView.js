
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
          rentData: [],
          allotteeData: [],
          allotmentData: [],
            allotteeId:'',
            rentMonth:'',
            natureOfPayment:'',
            amount:'',
            modeOfPayment:'',
            receivedBy:'',

            amountInvalid:false,
            receiverByInvalid:false,

        }
        this.changeAlotteeID=this.changeAlotteeID.bind(this);
        this.changeAmount=this.changeAmount.bind(this);
        this.changeModeOfPayment=this.changeModeOfPayment.bind(this);
        this.changeNatureOfPayment=this.changeNatureOfPayment.bind(this);
        this.changeRentMonth=this.changeRentMonth.bind(this);
        this.changeReceivingPerson=this.changeReceivingPerson.bind(this);

        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
      this.setState({allotteeData: this.props.allotteeData, rentData: this.props.rentData, allotmentData: this.props.allotmentData});
    }
    //Validation
    changeAlotteeID(values){
      this.setState({allotteeId: values.target.value});
    }
    changeRentMonth(values){
      this.setState({rentMonth: values.target.value});
    }
    changeNatureOfPayment(values){
        this.setState({natureOfPayment: values.target.value});
    }
    changeModeOfPayment(values){
      this.setState({modeOfPayment: values.target.value});
  }
    changeAmount(values){
      var amount=values.target.value;
      if (amount.length <0) {
        this.setState({amountInvalid: true});
      }
      else {
        this.setState({amountInvalid: false});
      }
      this.setState({amount: values.target.value});
    }
    changeReceivingPerson(values){
      var name = values.target.value ;
      if (name.length < 5 || name.length > 30) {
        this.setState({receiverByInvalid: true});
      }
      else {
        this.setState({receiverByInvalid: false});
      }
      this.setState({receivedBy: values.target.value});
    }

    async handleSubmit(values) {
      values.preventDefault();
      if (
        this.state.amountInvalid === false &&
        this.state.receiverByInvalid === false 
      ){
        let tLoad = toast.loading("Adding New Rent Receipt")
        await this.props.postingRent(this.state.allotteeId, this.state.rentMonth, this.state.natureOfPayment, this.state.amount, this.state.modeOfPayment, this.state.receivedBy);
        this.setState({allotteeData: this.props.allotteeData, 
          rentData: this.props.rentData
        });
        this.setState({allotteeId: '', rentMonth: '', natureOfPayment: '', amount: '', modeOfPayment: '', receivedBy: ''});
        toast.dismiss(tLoad);
        toast.success("New Rent Receipt Added");
      }
      else {
        toast.error("Inavlid Entry");
      }
      
    }
    async handleDelete(data) {
      let tLoad = toast.loading("Deleting Rent Receipt") ;
      await this.props.deletingRent(data._id) ;
      this.setState({rentData: this.props.rentData});
      toast.dismiss(tLoad) ;
      toast.success("Rent Receipt Deleted");
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
                  <CardTitle tag="h5">Enter Payment Details</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup> 
                          <label>Alottee </label>
                          <Input
                            type="select"
                            onChange = {this.changeAlotteeID}
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
                                    return (
                                      <option key={index} value={data._id}>{data.name}</option>
                                    );
                                  }
                                  else {
                                    return (<></>);
                                  }
                                    
                                })
                            }
                          </Input>
                          <FormFeedback>Format: xxxxx</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Nature Of Payment</label>
                          <Input
                            type="select"
                            onChange = {this.changeNatureOfPayment}
                            value = {this.state.natureOfPayment}
                            required
                          >
                            <option value="" disabled selected>Select</option>
                            <option value="Monthly Rent">Monthly Rent</option>
                            <option value="Registeration Charges">Registeration Charges</option>
                            <option value="Security Deposit">Security Deposit</option>
            
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup> 
                          <label>Amount</label>
                          <Input
                            placeholder="Enter Amount"
                            type="text"
                            onChange = {this.changeAmount}
                            value = {this.state.amount}
                            invalid = {this.state.amountInvalid}
                          />
                          <FormFeedback></FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                             <label>Mode Of Payment</label>
                          <Input
                            type="select"
                            onChange = {this.changeModeOfPayment}
                            value = {this.state.modeOfPayment}
                            required
                          >
                            <option value="" disabled selected>Select</option>
                            <option value="Easy Paisa">Easy Paisa</option>
                            <option value="Acount Transfer">Account Transfer</option>
                            <option value="JazzCash">Jazz Cash</option>
                            <option value="By Hand">By Hand</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                      <FormGroup>
                      <label>Rent Month</label>
                          <Input
                            type="select"
                            onChange = {this.changeRentMonth}
                            value = {this.state.rentMonth}
                            required
                          >
                            <option value="" disabled selected>Select</option>
                                  <option value='Janaury'>Janaury</option>
                                  <option value='February'>February</option>
                                  <option value='March'>March</option>
                                  <option value='April'>April</option>
                                  <option value='May'>May</option>
                                  <option value='June'>June</option>
                                  <option value='July'>July</option>
                                  <option value='August'>August</option>
                                  <option value='September'>September</option>
                                  <option value='October'>October</option>
                                  <option value='November'>November</option>
                                  <option value='December'>December</option>
                   
                          </Input>
                        </FormGroup>
                        </Col>
                        
                      <Col className="px-1" md="6">
                        <FormGroup> 
                          <label>Received By</label>
                          <Input
                            placeholder="Enter Name"
                            type="text"
                            onChange = {this.changeReceivingPerson}
                            value = {this.state.receivedBy}
                            invalid = {this.state.receiverByInvalid}
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
                  <CardTitle tag="h4">Rent Receipts</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Allottee</th>
                        <th>Created At</th>
                        <th>Rent Month</th>
                        <th>NOP</th>
                        <th>Amount</th>
                        <th>MOP</th>
                        <th>RP</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.rentData.map(((record) => {
                          let allotteeName = "" ;
                          for (var i = 0 ; i < this.state.allotteeData.length ; i++) {
                            if (this.state.allotteeData[i]._id === record.allotteeId) {
                              allotteeName = this.state.allotteeData[i].name ;
                              break;
                            }
                          }
                            return (
                                <>
                                <tr>
                                <td>{allotteeName}</td>
                                <td>{record.createdAt}</td>
                                <td>{record.rentMonth}</td>
                                <td>{record.natureOfPayment}</td>
                                <td>{record.amount}</td>
                                <td>{record.modeOfPayment}</td>
                                <td>{record.receivingPerson}</td>
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
