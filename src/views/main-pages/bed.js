
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

class Bed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomData: [],
            floorData: [],
            floorRoom: [],
            bedData: [],
            bedId: "",
            roomName: "",
            sideTable:false,
            cupboard:false,
            floorId: "",
            bedName: "",
            sideTablaInvalid:false,
            cupboardInvalid:false,
            floorIdInvalid: false,
            roomNameInvalid: false,
            bedNameInvalid: false,
        };
        
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeRoomName = this.changeRoomName.bind(this);
        this.changeFloorId = this.changeFloorId.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.changeFloorId=this.changeFloorId.bind(this);
        this.changeCupBoard=this.changeCupBoard.bind(this);
        this.changeSideTable = this.changeSideTable.bind(this);
        this.changeBedName = this.changeBedName.bind(this);
    }
    componentDidMount() {
        this.setState({roomData: this.props.roomData, floorData: this.props.floorData, bedData: this.props.bedData});
    }
    changeFloorId(values) {
        let val = values.target.value ;
        this.setState({floorId: val}) ;
        if (val === "") this.setState({floorIdInvalid: true});
        else {
          this.setState({floorIdInvalid: false});
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
    changeRoomName(values) {
        let name = values.target.value ;
        this.setState({roomName: name});
        if (name==="") this.setState({roomNameInvalid: true});
        else this.setState({roomNameInvalid: false});
    }
    changeSideTable(values) {
      this.setState({sideTable: values.target.value});
    }
    changeCupBoard(values) {
      this.setState({cupboard: values.target.value});
    }
    changeBedName(values) {
      let name = values.target.value;
      this.setState({bedName: name});
      if (name.length < 3) this.setState({bedNameInvalid: true});
      this.setState({bedNameInvalid: false});
    }
    async handleSubmit(values) {
        
        values.preventDefault();
        if (
        
            this.state.roomNameInvalid === false &&
            this.state.floorIdInvalid === false
         ){
            console.log("Handle Submit");
            let tLoad = toast.loading("Adding Bed") ;
            await this.props.postingBed(this.state.cupboard, this.state.sideTable, this.state.roomName, this.state.bedName);
            this.setState({roomData: this.props.roomData, floorData: this.props.floorData, bedData: this.props.bedData});
            this.setState({
                roomName: '',
                floorId: '',
                cupboard: false,
                sideTable: true,
                bedName: '',
            });
            toast.dismiss(tLoad) ;
            toast.success("Bed Added");
      }
      else {
        toast.error("Invalid Entry");
      }
      
    }
    async handleDelete(data) {
      if (data.enrollmentId === undefined) {
        let tLoad = toast.loading("Deleting Bed") ;
        await this.props.deletingBed(data._id) ;
        this.setState({bedData: this.props.bedData});
        toast.dismiss(tLoad) ;
        toast.success("Bed Deleted");
      }
      else {
        toast.error("Bed can't be deleted");
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
                          <label>Bed Name</label>
                          <Input
                            placeholder="Bed Name"
                            type="text"
                            onChange = {this.changeBedName}
                            value = {this.state.bedName}
                            invalid = {this.state.bedNameInvalid}
                            required
                          />
                          <FormFeedback>Not a valid room name</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1 " md="6">
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
                      <Col className="pr-1 " md="6">
                        <FormGroup>
                          <label>Room </label>
                          <Input
                            type="select"
                            onChange = {this.changeRoomName}
                            value = {this.state.roomName}
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
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Side Table</label>
                          <Input
                            type="select"
                            onChange = {this.changeSideTable}
                            value = {this.state.sideTable}
                            required
                          >
                            <option value="" disabled selected>Select</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Cup Board</label>
                          <Input
                            type="select"
                            onChange = {this.changeCupBoard}
                            value = {this.state.cupboard}
                            required
                          >
                            <option value="" disabled selected>Select</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
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
                  <CardTitle tag="h4">All Beds</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Side Table</th>
                        <th>Cupboard</th>
                        <th>Allotment</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                        
                      {this.state.bedData.map((data, index) => {
                          return(
                            <tr key={index}>
                                <td>{data.name}</td>
                                <td>{data.sideTable ? "Yes": "No"}</td>
                                <td>{data.cupboard ? "Yes": "No"}</td>
                                <td>{data.allotmentId}</td>
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

export default Bed;
