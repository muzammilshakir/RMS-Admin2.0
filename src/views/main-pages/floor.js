
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

class Floor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            floorData: [],
            roomData: [],
            floorName: '',
            floorNameInvalid: false,
        }
        
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeFloorName = this.changeFloorName.bind(this);
        //this.deleteFloor = this.props.deleteFloor.bind(this);
    }
    componentDidMount() {
        this.setState({floorData: this.props.floorData, roomData: this.props.roomData});
    }
    changeFloorName(values) {
        let name = values.target.value ;
        this.setState({floorName: name});
        if (name.length <= 3) this.setState({floorNameInvalid: true});
        else this.setState({floorNameInvalid: false});
    }
    async handleSubmit(values) {
        let tLoad = toast.loading("Adding New Floor")
        values.preventDefault();
        if (
        
            this.state.floorNameInvalid === false 
         ){
        await this.props.postingFloors(this.state.floorName);
        this.setState({floorData: this.props.floorData});
        this.setState({
          floorName: '',
        });
        toast.dismiss(tLoad);
        toast.success("New Floor Added");
      }
      
    }
    async handleDelete(data) {
        if (data.totalRooms <= 0) {
          let tLoad = toast.loading("Deleting Floor") ;
          await this.props.deletingFloor(data._id) ;
          this.setState({floorData: this.props.floorData});
          toast.dismiss(tLoad) ;
          toast.success("Floor Deleted");
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
                  <CardTitle tag="h5">Enter Floor Information</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster />
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                      <Col className="pr-1 " md="12">
                        <FormGroup>
                          <label>Floor Name</label>
                          <Input
                            placeholder="Floor Name"
                            type="text"
                            onChange = {this.changeFloorName}
                            value = {this.state.floorName}
                            invalid = {this.state.floorNameInvalida}
                            required
                          />
                          <FormFeedback>Not a valid floor name</FormFeedback>
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
                  <CardTitle tag="h4">All Floors</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Total Rooms</th>
                        <th>Rooms</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.floorData.map((data, index) => {
                          return(
                            <tr key={index}>
                                <td>{data.name}</td>
                                <td>{data.totalRooms}</td>
                                <td>{data.rooms.map((data, index) => {
                                  let name = "NONe" ;
                                  for (var i = 0 ; i < this.state.roomData.length ; i++) {
                                    if (this.state.roomData[i]._id === data) {
                                      name = this.state.roomData[i].name;
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

export default Floor;
