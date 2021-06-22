
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
  // Table,
} from "reactstrap";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visitorData:this.props.visitorData.map((prop, key) => {
              return {
                id: key,
                name: prop.visitorName, 
                organization: prop.organization,
                occupation: prop.occupation,
                cellNo: prop.cellNo,
                edo: prop.edo,
                noOfBedsAsked: prop.noOfBedsAsked,
                afforingCapacity: prop.afforingCapacity,
                self: prop.self,
                hash: <Button color="danger" onClick={() => this.handleDelete(prop)} >Delete</Button>
              };
            }),
            visitorName: '', 
            phoneNumber: '',
            occupation: '',
            entryNumber:'',
            organization:'',
            bedAsked:'',
            afforingCapacity:'',
            dateOfArival:'',
            self:'',
            visitorNameInvalid: false,
            phoneNumberInvalid: false,
            occupationInvalid: false,
            entryNumberInvalid: false,
            organizationInvlid:false,
            bedAskedInvalid:false,
            affordingCapacityInvalid:false,
            dateOfArivalInvalid:false,
            selfInvalid:false,
        }
        this.changeVisitorName = this.changeVisitorName.bind(this) ;
        this.changePhoneNumber = this.changePhoneNumber.bind(this) ;
        this.changeOccupation = this.changeOccupation.bind(this) ;
        this.changeOrganization=this.changeOrganization.bind(this);
        this.changebedAsked=this.changebedAsked.bind(this);
        this.changeAffordingCapacity=this.changeAffordingCapacity.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeDateOfArival = this.changeDateOfArival.bind(this);
        this.changeSelf = this.changeSelf.bind(this);
    }
    componentDidMount(){
      // this.setState({visitorData: this.props.visitorData});
    }
    //Validation
    changeVisitorName(values) {
      var name = values.target.value ;
      if (name.length < 3 || name.length > 30) {
        this.setState({visitorNameInvalid: true});
      }
      else {
        this.setState({visitorNameInvalid: false});
      }
      this.setState({visitorName: values.target.value});
    }
    changePhoneNumber(values) {
      this.setState({phoneNumber: values.target.value});
      var number = values.target.value ;
      for (var i = 0; i < number.length ; i++) {
        if (number[i] >= '0' && number[i] <= '9') continue ;
        this.setState({phoneNumberInvalid: true});
        return ;
      }
      if (number.length !== 12) {
        this.setState({phoneNumberInvalid: true});
      }
      else {
        this.setState({phoneNumberInvalid: false});
      }
      
    }
    changeOccupation(values) {
      var occupation = values.target.value ;
      if (occupation.length < 3 || occupation.length > 30) {
        this.setState({occupationInvalid: true});
      }
      else {
        this.setState({occupationInvalid: false});
      }
      this.setState({occupation: values.target.value});
    }
    changeOrganization(values){
      var org = values.target.value ;
      if (org.length < 5 || org.length > 30) {
        this.setState({organizationInvlid: true});
      }
      else {
        this.setState({organizationInvlid: false});
      }
      this.setState({organization: values.target.value});
    }
    changebedAsked(values){
      var bed=values.target.value;
      this.setState({bedAsked: values.target.value});
      for (var i = 0; i < bed.length ; i++) {
        if (bed[i] >= '0' && bed[i] <= '9') continue ;
        else {
          this.setState({bedAskedInvalid: true});
          return ;
        }
      }
      this.setState({bedAskedInvalid: false});
    }
    changeAffordingCapacity(values){
      var capacity=values.target.value;
      this.setState({afforingCapacity: values.target.value});
      for (var i = 0; i < capacity.length ; i++) {
        if (capacity[i] >= '0' && capacity[i] <= '9') continue ;
        else {
          this.setState({affordingCapacityInvalid: true});
          return ;
        }
      }
      this.setState({affordingCapacityInvalid: false});
      
    }
    changeDateOfArival(values){
      this.setState({dateOfArival: values.target.value});
      console.log("Date", values.target.value);
    }
    changeSelf(values){
      this.setState({self: values.target.value});
    }

    async handleSubmit(values) {
      let tLoad = toast.loading("Adding New Visitor")
      values.preventDefault();
      if (
          this.state.visitorNameInvalid === false &&
          this.state.phoneNumberInvalid === false &&
          this.state.occupationInvalid === false &&
          this.state.entryNumberInvalid === false &&
          this.state.organizationInvlid === false &&
          this.state.bedAskedInvalid === false &&
          this.state.affordingCapacityInvalid === false &&
          this.state.dateOfArivalInvalid === false &&
          this.state.selfInvalid === false 
       ){
        await this.props.postingVisitor(this.state.visitorName, this.state.occupation, this.state.organization, this.state.phoneNumber, this.state.bedAsked, this.state.afforingCapacity, this.state.dateOfArival, this.state.self);
        this.setState({visitorData: this.props.visitorData});
        this.setState({
          visitorName: '',
          occupation: '',
          organization: '',
          phoneNumber: '',
          bedAsked: '',
          afforingCapacity: '',
          dateOfArival: '',
          self: '',
        });
        toast.dismiss(tLoad);
        toast.success("New Visitor Added");
      }
      
    }
    async handleDelete(data) {
      let tLoad = toast.loading("Deleting Visitor") ;
      await this.props.deletingVisitor(data._id) ;
      this.setState({visitorData: this.props.visitorData});
      toast.dismiss(tLoad) ;
      toast.success("Visitor Deleted");
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
                  <CardTitle tag="h5">Enter Visitor Information</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Visitor Name</label>
                          <Input
                            placeholder="Visitor Name"
                            type="text"
                            onChange = {this.changeVisitorName}
                            value = {this.state.visitorName}
                            invalid = {this.state.visitorNameInvalid}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup> 
                          <label>Cell Number</label>
                          <Input
                            placeholder="Cell Number"
                            type="text"
                            onChange = {this.changePhoneNumber}
                            value = {this.state.phoneNumber}
                            invalid = {this.state.phoneNumberInvalid}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Occupation
                          </label>
                          <Input 
                            placeholder="Occupation" 
                            type="text"
                            onChange = {this.changeOccupation}
                            value = {this.state.occupation}
                            invalid = {this.state.occupationInvalid}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="6">
                        <FormGroup> 
                          <label>Organization</label>
                          <Input
                            placeholder="Organization"
                            type="text"
                            onChange = {this.changeOrganization}
                            value = {this.state.organization}
                            invalid = {this.state.organizationInvlid}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Arrival Date</label>
                          <Input 
                            placeholder="Select Date" 
                            type="Date"
                            onChange = {this.changeDateOfArival}
                            value = {this.state.dateOfArival}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="5">
                          <FormGroup>
                            <label>Bed Asked</label>
                            <Input
                              placeholder="Enter Bed Asked"
                              type="text"
                              onChange = {this.changebedAsked}
                              value = {this.state.bedAsked}
                              invalid = {this.state.bedAskedInvalid}
                            />
                            </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                          <FormGroup> 
                            <label>Affording Capacity</label>
                            <Input
                              placeholder="Affording Capacity"
                              type="text"
                              onChange = {this.changeAffordingCapacity}
                              value = {this.state.afforingCapacity}
                              invalid = {this.state.affordingCapacityInvalid}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Self</label>
                          <Input
                            type="select"
                            onChange = {this.changeSelf}
                            value = {this.state.self}
                            required
                          >
                            <option value="" disabled selected>Select</option>
                            <option value="Student">Yes</option>
                            <option value="Job Holder">No</option>
                          </Input>
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
                  <CardTitle tag="h4">Visitor Log Book</CardTitle>
                </CardHeader>
                <CardBody>
                    <ReactTable
                      data={this.state.visitorData}
                      columns={[
                      {
                          Header: "Name",
                          accessor: "name",
                      },
                      {
                        Header: "Organization",
                        accessor: "organization",
                      },
                      {
                        Header: "Occupation",
                        accessor: "occupation",
                      },
                      {
                        Header: "Cell No.",
                        accessor: "cellNo",
                      },
                      {
                        Header: "EDO",
                        accessor: "edo",
                      },
                      {
                        Header: "Beds Asked",
                        accessor: "noOfBedsAsked",
                      },
                      {
                        Header: "Capacity",
                        accessor: "afforingCapacity",
                      },
                      {
                        Header: "Self",
                        accessor: "self",
                      },
                      {
                          Header: "#",
                          accessor: "hash",
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

export default User;
