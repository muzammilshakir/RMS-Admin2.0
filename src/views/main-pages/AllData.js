
import React from "react";
import { Link } from "react-router-dom";
import {Redirect} from 'react-router-dom';
import isAuthenticated from "../../auth/index";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

class AllData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allotteeData: [],
            allotmentData: [],
            floorData: [],
            roomData: [],
            bedData: [],
        }
    }
    componentDidMount(){
        this.setState({
                        allotteeData: this.props.allotteeData, 
                        allotmentData: this.props.allotmentData, 
                        floorData: this.props.floorData,
                        roomData: this.props.roomData, 
                        bedData: this.props.bedData,
                      });
    }
  render() {
    return (
      <>
        <div className="content">
        {console.log(isAuthenticated(sessionStorage.getItem('HMS-Admin')))}
        {!isAuthenticated(sessionStorage.getItem('HMS-Admin')) ? <Redirect to="/auth/login" /> : <></>}
        <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-satisfied text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Allottees</p>
                        <CardTitle tag="p">{this.props.allotteeData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-single-copy-04 text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Allotments</p>
                        <CardTitle tag="p">{this.props.allotmentData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-alert-circle-i text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Expenses</p>
                        <CardTitle tag="p">{this.props.expenseData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Payments</p>
                        <CardTitle tag="p">{this.props.rentData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-bullet-list-67 text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Floors</p>
                        <CardTitle tag="p">{this.props.floorData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-box text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Rooms</p>
                        <CardTitle tag="p">{this.props.roomData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-tie-bow text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Beds</p>
                        <CardTitle tag="p">{this.props.bedData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-single-02 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Total Visitors</p>
                        <CardTitle tag="p">{this.props.visitorData.length}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Occupation Summary</CardTitle>
                  <Link to="/admin/floor"><Button color="primary"  >Manage Floors</Button></Link>
                  <Link to="/admin/room"><Button color="primary"  >Manage Rooms</Button></Link>
                  <Link to="/admin/bed"><Button color="primary"  >Manage Beds</Button></Link>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Floor</th>
                        <th>Room</th>
                        <th>Bed</th>
                        <th>Allottee</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.floorData.map(((floor) => {
                            if (floor.rooms.length === 0) {
                                return (
                                    <tr>
                                        <td>{floor.name}</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td><Link to="/admin/room"><Button color="primary"  >Add Room</Button></Link></td>
                                    </tr>
                                );
                            }
                            else {
                                const roomReturn = floor.rooms.map((roomId) => {
                                    let room = undefined ;
                                    for (var i = 0 ; i < this.state.roomData.length ; i++) {
                                        if (this.state.roomData[i]._id === roomId){
                                            room = this.state.roomData[i];
                                            console.log("Room", room); 
                                            break ;
                                        }
                                    }
                                    if (room.beds.length === 0 || room.beds === undefined) {
                                        console.log("room IF");
                                        return (
                                            <tr>
                                                <td>{floor.name}</td>
                                                <td>{room.name}</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td><Link to="/admin/bed"><Button color="primary"  >Add Bed</Button></Link></td>
                                            </tr>
                                        );
                                    }
                                    else {
                                        console.log("room Else");
                                        const bedReturn = room.beds.map((bedId) => {
                                            let bed = undefined;
                                            for (var i = 0 ; i < this.state.bedData.length ; i++) {
                                                if (this.state.bedData[i]._id === bedId){
                                                    bed = this.state.bedData[i];
                                                    break ;
                                                }
                                            }
                                            if (bed.allotmentId === undefined) {
                                                return (
                                                    <tr>
                                                        <td>{floor.name}</td>
                                                        <td>{room.name}</td>
                                                        <td>{bed.name}</td>
                                                        <td>-</td>
                                                        <td><Link to="/admin/alottment"><Button color="primary"  >Make Allotment</Button></Link></td>
                                                    </tr>
                                                );
                                            }
                                            else {
                                                let allotteeId = undefined;
                                                let allotteeName = undefined;
                                                for (var j = 0 ; j < this.state.allotmentData.length ; j++) {
                                                    if (this.state.allotmentData[j]._id === bed.allotmentId){
                                                        allotteeId = this.state.allotmentData[j].studentId;
                                                        break ;
                                                    }
                                                }
                                                for (var k = 0 ; k < this.state.allotteeData.length ; k++) {
                                                    if (this.state.allotteeData[k]._id === allotteeId){
                                                        allotteeName = this.state.allotteeData[k].name;
                                                        break ;
                                                    }
                                                }
                                                return (
                                                    <tr>
                                                        <td>{floor.name}</td>
                                                        <td>{room.name}</td>
                                                        <td>{bed.name}</td>
                                                        <td>{allotteeName}</td>
                                                        <td><Link to={"/admin/allottee-profile/" + allotteeId}><Button color="primary"  >Details</Button></Link></td>
                                                    </tr>
                                                );
                                            }
                                        });
                                        return (<>{bedReturn}</>);
                                    }
                                })
                                return (<>{roomReturn}</>);
                            }
                        }))}
                      
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">All Allottee's</CardTitle>
                  <Link to="/admin/allottee"><Button color="primary"  >Add Allottee</Button></Link>
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
                                <td><Link to={"/admin/allottee-profile/" + record._id}><Button color="primary"  >Edit</Button></Link></td>
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

export default AllData;
