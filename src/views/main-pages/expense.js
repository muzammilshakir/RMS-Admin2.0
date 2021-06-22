
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

class Expense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expenseData: this.props.expenseData.map((prop, key) => {
              return {
                id: key,
                name: prop.name, 
                category: prop.category,
                amount: prop.amount,
                hash: <Button color="danger" onClick={() => this.handleDelete(prop)} >Delete</Button>
              };
            }),

            category: "",
            amount: '0',
            name:"",
            amountInvalid: false,
            nameInvalid: false,

        }
        this.changeAmount = this.changeAmount.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeName = this.changeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        // this.setState({
        //                 expenseData: this.props.expenseData
        //               });
    }
    //Validation
    changeCategory(values) {
      this.setState({category: values.target.value});
    }
    changeName(values) {
      this.setState({name: values.target.value});
      let val = values.target.value;
      if (val.length < 3) this.setState({nameInvalid: true});
      else this.setState({nameInvalid: false});
    }
    changeAmount(values) {
      let val = values.target.value ;
      this.setState({amount: val}) ;
      let check = false ;
      if (val === '') check = true ;
      for (var i = 0 ; i < val.length ; i++) {
        if (val[i] >= '0' && val <= '9') continue ;
        check = true ;
        break ;
      }
      this.setState({amountInvalid: check}) ;
    }
    async handleSubmit(values) {
      values.preventDefault();
      if (
        this.state.amountInvalid === false &&
        this.state.nameInvalid === false
      ){
        let tLoad = toast.loading("Adding New Expense")
        await this.props.postingExpense(this.state.name, this.state.category, this.state.amount)
        this.setState({
            expenseData: this.props.expenseData
        });
        this.setState({name: "", category: "", amount:'0'});
        toast.dismiss(tLoad);
        toast.success("New Expense Added");
      }
      else {
        toast.error("Inavlid Entry");
      }
      
    }
    async handleDelete(data) {
      let tLoad = toast.loading("Deleting Expense") ;
      await this.props.deletingExpense(data._id) ;
      this.setState({expenseData: this.props.expenseData});
      toast.dismiss(tLoad) ;
      toast.success("Expense Deleted");
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
                  <CardTitle tag="h5">Enter Expense</CardTitle>
                </CardHeader>
                <CardBody>
                  <Toaster/>
                  <Form onSubmit={(values) => this.handleSubmit(values)}>
                    <Row>
                        <Col className="pr-1" md="12">
                          <FormGroup>
                          <label>Category </label>
                          <Input
                            type="select"
                            onChange = {this.changeCategory}
                            value = {this.state.category}
                            required
                          >
                            <option value="" disabled selected>Select Category</option>
                            <option value="Salary">Salary</option>
                            <option value="Crokery">Crokery</option>
                            <option value="Food">Food</option>
                            <option value="Mantainence">Mantainence</option>
                            <option value="Rent">Rent</option>
                            <option value="Utitlity Bills">Utility Bills</option>
                            <option value="Kitchen Running Expense">Kitchen Running Expense</option>
                          </Input>
                        </FormGroup>
                        </Col>
                      
                    </Row>
                    
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                             <label>Expense Name</label>
                          <Input
                            type="text"
                            placeholder = "Expense Name"
                            onChange = {this.changeName}
                            value = {this.state.name}
                            invalid={this.state.nameInvalid}
                          />
                            
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="6">
                      <FormGroup>
                      <label>Amount</label>
                          <Input
                          placeholder="Enter Amount"
                            type="text"
                            onChange = {this.changeAmount}
                            value = {this.state.amount}
                            invalid={this.state.amountInvalid}
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
                  <CardTitle tag="h4">All Expenses</CardTitle>
                </CardHeader>
                <CardBody>
                <ReactTable
                      data={this.state.expenseData}
                      columns={[
                      {
                          Header: "Name",
                          accessor: "name",
                      },
                      {
                        Header: "Category",
                        accessor: "category",
                      },
                      {
                        Header: "Amount",
                        accessor: "amount",
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

export default Expense;
