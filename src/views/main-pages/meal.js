
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

class Meal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mealData:this.props.mealData.map((prop, key) => {
              return {
                id: key,
                day: prop.day,
                time: prop.time,
                food: prop.food,
                hash: <Button color="danger" onClick={() => this.handleDelete(prop)} >Delete</Button>
              };
            }),
            day: '', 
            time: '',
            food: '',
            foodInvalid: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeFood = this.changeFood.bind(this) ;
        this.changeDay = this.changeDay.bind(this) ;
        this.changeTime = this.changeTime.bind(this) ;
    }
    componentDidMount(){
      // this.setState({mealData: this.props.mealData});
    }
    //Validation
    changeFood(values) {
      var name = values.target.value ;
      if (name.length < 3 || name.length > 30) {
        this.setState({foodInvalid: true});
      }
      else {
        this.setState({foodInvalid: false});
      }
      this.setState({food: values.target.value});
    }
    changeDay(values){
      this.setState({day: values.target.value});
    }
    changeTime(values){
        this.setState({time: values.target.value});
    }

    async handleSubmit(values) {
      let tLoad = toast.loading("Adding New Meal")
      values.preventDefault();
      if (
          this.state.foodInvalid === false &&
          this.state.day !== '' &&
          this.state.time !== ''
       ){
        await this.props.postingMeal(this.state.day, this.state.time, this.state.food);
        this.setState({mealData: this.props.mealData});
        this.setState({
          food: '',
          time: '',
          day: '',
        });
        toast.dismiss(tLoad);
        toast.success("New Meal Added");
      }
      
    }
    async handleDelete(data) {
      let tLoad = toast.loading("Deleting Meal") ;
      await this.props.deletingMeal(data._id) ;
      this.setState({mealData: this.props.mealData});
      toast.dismiss(tLoad) ;
      toast.success("Meal Deleted");
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
                  <CardTitle tag="h5">Enter Meal Information</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                        <Col className="pr-1" md="12">
                            <FormGroup>
                                <label>Day</label>
                            <Input
                                type="select"
                                onChange = {this.changeDay}
                                value = {this.state.day}
                                required
                            >
                                <option value="" disabled selected>Select</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="12">
                            <FormGroup>
                                <label>Time</label>
                            <Input
                                type="select"
                                onChange = {this.changeTime}
                                value = {this.state.time}
                                required
                            >
                                <option value="" disabled selected>Select</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="12">
                        <FormGroup>
                          <label>Food Details</label>
                          <Input
                            placeholder="Food Details"
                            type="text"
                            onChange = {this.changeFood}
                            value = {this.state.food}
                            invalid = {this.state.foodInvalid}
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
                  <CardTitle tag="h4">Meals Log Book</CardTitle>
                </CardHeader>
                <CardBody>
                    <ReactTable
                      data={this.state.mealData}
                      columns={[
                      {
                          Header: "Day",
                          accessor: "day",
                      },
                      {
                        Header: "Time",
                        accessor: "time",
                      },
                      {
                        Header: "Food",
                        accessor: "food",
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

export default Meal;
