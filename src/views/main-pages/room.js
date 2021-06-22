
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

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomData: [],
            floorData: [],
            bedData:[],
            floorId: "",
            roomName: "",
            floorIdInvalid: false,
            roomNameInvalid: false,
        };
        
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeRoomName = this.changeRoomName.bind(this);
        this.changeFloorId = this.changeFloorId.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount() {
        this.setState({roomData: this.props.roomData, floorData: this.props.floorData, bedData: this.props.bedData});
    }
    changeFloorId(values) {
        let val = values.target.value ;
        this.setState({floorId: val}) ;
        if (val === "") this.setState({floorIdInvalid: true});
        else this.setState({floorIdInvalid: false});
    }
    changeRoomName(values) {
        let name = values.target.value ;
        this.setState({roomName: name});
        if (name.length <= 3) this.setState({roomNameInvalid: true});
        else this.setState({roomNameInvalid: false});
    }
    async handleSubmit(values) {
        
        values.preventDefault();
        if (
        
            this.state.roomNameInvalid === false &&
            this.state.floorIdInvalid === false
         ){
            let tLoad = toast.loading("Adding Room") ;
            await this.props.postingRooms(this.state.roomName, this.state.floorId);
            this.setState({roomData: this.props.roomData});
            this.setState({
                roomName: '',
                floorId: '',
            });
            toast.dismiss(tLoad) ;
            toast.success("Room Added");
      }
      else {
        toast.error("invalid Entry");
      }
      
    }
    async handleDelete(data) {
      if (data.totalBeds <= 0) {
        let tLoad = toast.loading("Deleting Room") ;
      
        await this.props.deletingRoom(data._id) ;
        this.setState({roomData: this.props.roomData});
        toast.dismiss(tLoad) ;
        toast.success("Room Deleted");
      }
      else {
        toast.error("This floor can't be deleted");
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
                  <CardTitle tag="h5">Enter Room Information</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                      <Col className="pr-1 " md="12">
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
                          <FormFeedback>Not a valid floor</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1 " md="12">
                        <FormGroup>
                          <label>Room Name</label>
                          <Input
                            placeholder="Room Name"
                            type="text"
                            onChange = {this.changeRoomName}
                            value = {this.state.roomName}
                            invalid = {this.state.roomNameInvalid}
                            required
                          />
                          <FormFeedback>Not a valid room name</FormFeedback>
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
                  <CardTitle tag="h4">All Rooms</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Total Beds</th>
                        <th>Beds</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                        
                      {this.state.roomData.map((data, index) => {
                          return(
                            <tr key={index}>
                                <td>{data.name}</td>
                                <td>{data.totalBeds}</td>
                                <td>{data.beds.map((data, index) => {
                                  let name = "NONe" ;
                                  for (var i = 0 ; i < this.state.bedData.length ; i++) {
                                    if (this.state.bedData[i]._id === data) {
                                      name = this.state.bedData[i].name;
                                    }
                                  }
                                  return (
                                    <><p>{name}</p></>
                                  );
                                })}</td>
                                <td><Button color="danger" onClick={() => this.handleDelete(data)} >Delete</Button></td>
                            </tr>
                          );
                      })}
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

export default Room;
