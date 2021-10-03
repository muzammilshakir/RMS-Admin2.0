
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { WindMillLoading } from 'react-loadingg';
import isAuthenticated from "../auth/index";
var axios = require("axios");

var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      sidebarMini: false,
      floorData: [],
      roomData: [],
      allotteeData: [],
      bedData: [],
      allotmentData: [],
      rentData: [],
      visitorData: [],
      expenseData: [],
      mealData: [],
      adminData: [],
      loading: false,
    };
    this.gettingResources = this.gettingResources.bind(this);
    this.gettingFloors = this.gettingFloors.bind(this) ;
    this.postingFloors = this.postingFloors.bind(this) ;
    this.deletingFloor = this.deletingFloor.bind(this) ;

    this.gettingRooms = this.gettingRooms.bind(this) ;
    this.postingRooms = this.postingRooms.bind(this) ;
    this.deletingRoom = this.deletingRoom.bind(this) ;

    this.gettingAllottee = this.gettingAllottee.bind(this) ;
    this.postingAllottee = this.postingAllottee.bind(this) ;
    this.updatingAllottee = this.updatingAllottee.bind(this) ;
    this.deletingAllottee = this.deletingAllottee.bind(this) ;

    this.gettingBeds = this.gettingBeds.bind(this) ;
    this.postingBed = this.postingBed.bind(this) ;
    this.deletingBed = this.deletingBed.bind(this);

    this.gettingAllotments = this.gettingAllotments.bind(this) ;
    this.postingAllotment = this.postingAllotment.bind(this) ;
    this.deletingAllotment = this.deletingAllotment.bind(this);

    this.gettingRent = this.gettingRent.bind(this) ;
    this.postingRent = this.postingRent.bind(this);
    this.deletingRent = this.deletingRent.bind(this);

    this.gettingVisitor = this.gettingVisitor.bind(this) ;
    this.postingVisitor = this.postingVisitor.bind(this);
    this.deletingVisitor = this.deletingVisitor.bind(this);

    this.gettingExpense = this.gettingExpense.bind(this) ;
    this.postingExpense = this.postingExpense.bind(this);
    this.deletingExpense = this.deletingExpense.bind(this);

    this.gettingMeal = this.gettingMeal.bind(this) ;
    this.postingMeal = this.postingMeal.bind(this);
    this.deletingMeal = this.deletingMeal.bind(this);

    this.postingAdmin = this.postingAdmin.bind(this) ;
    this.gettingAdmin = this.gettingAdmin.bind(this) ;
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    this.gettingResources()
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      // this.refs.mainPanel.scrollTop = 0;
    }
  }
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        let Comp = prop.component ;
        return (
          <Route
            path={prop.layout + prop.path}
            // component={prop.component}
            key={key}
            render = {
              (props) => (
                <Comp
                  {...props}
                  floorData = {this.state.floorData}
                  gettingFloors = {this.gettingFloors}
                  postingFloors = {this.postingFloors}
                  deletingFloor = {this.deletingFloor}

                  roomData = {this.state.roomData}
                  gettingRooms = {this.gettingRooms}
                  postingRooms = {this.postingRooms}
                  deletingRoom = {this.deletingRoom}

                  allotteeData = {this.state.allotteeData}
                  gettingAllottee = {this.gettingAllottee}
                  postingAllottee = {this.postingAllottee}
                  updatingAllottee = {this.updatingAllottee}
                  deletingAllottee = {this.deletingAllottee}

                  bedData = {this.state.bedData}
                  gettingBeds = {this.gettingBeds}
                  postingBed = {this.postingBed}
                  deletingBed = {this.deletingBed}

                  allotmentData = {this.state.allotmentData}
                  gettingAllotments = {this.gettingAllotments}
                  postingAllotment = {this.postingAllotment}
                  deletingAllotment = {this.deletingAllotment}

                  rentData = {this.state.rentData}
                  gettingRent = {this.gettingRent}
                  postingRent = {this.postingRent}
                  deletingRent = {this.deletingRent}

                  visitorData = {this.state.visitorData}
                  gettingVisitor = {this.gettingVisitor}
                  postingVisitor = {this.postingVisitor}
                  deletingVisitor = {this.deletingVisitor}

                  expenseData = {this.state.expenseData}
                  gettingExpense = {this.gettingExpense}
                  postingExpense = {this.postingExpense}
                  deletingExpense = {this.deletingExpense}

                  mealData = {this.state.mealData}
                  gettingMeal = {this.gettingMeal}
                  postingMeal = {this.postingMeal}
                  deletingMeal = {this.deletingMeal} 

                  adminData = {this.state.adminData}
                  gettingAdmin = {this.gettingAdmin}
                  postingAdmin = {this.postingAdmin}
                />
              )
            }
          />
        );
      } else {
        return null;
      }
    });
  };
  async deletingFloor(id) {
    console.log("Deleting Floors");
    try {
      var response = await axios.delete("https://hms-web-api.herokuapp.com/floor/" + id , {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingFloors() ;
  }
  async postingFloors(name) {
    console.log("Posting Floors");
    try {
      var header = {
        name: name 
      }
      var response = await axios.post("https://hms-web-api.herokuapp.com/floor", header, {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingResources() ;
  }
  async gettingFloors() {
    console.log("Getting Floors");
    try {
      var response = await axios.get("https://hms-web-api.herokuapp.com/floor", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({floorData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  //Rooms
  async deletingRoom(id) {
    console.log("Deleting Rooms");
    try {
      var response = await axios.delete("https://hms-web-api.herokuapp.com/room/" + id , {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingRooms() ;
    await this.gettingFloors();
  }
  async postingRooms(name, id) {
    console.log(id);
    console.log("Posting Rooms");
    try {
      var header = {
        name: name,
        floorId: id 
      }
      var response = await axios.post("https://hms-web-api.herokuapp.com/room", header, {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingResources() ;
  }
  async gettingRooms() {
    console.log("Getting Rooms");
    try {
      var response = await axios.get("https://hms-web-api.herokuapp.com/room", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({roomData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  // Allottee 
  async deletingAllottee(id) {
    console.log("Deleting Allottee");
    try {
      var response = await axios.delete("https://hms-web-api.herokuapp.com/allottee/" + id , {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingAllottee() ;
  }
  async postingAllottee(name, photo, password, fatherName, address, city, state, country, contactNumber, email, fatherContactNumber, occupation, guardianName, guardianRelation, guardianContactNumber, bloodGroup) {
    console.log("Posting Allottee");
    try {
      var header = {
        name: name,
        photo: photo,
        password: password,
        fatherName: fatherName,
        address: address,
        city: city,
        state: state,
        country: country,
        contactNumber: contactNumber,
        email: email,
        fatherContactNumber: fatherContactNumber,
        occupation: occupation,
        guardianName: guardianName,
        guardianRelation: guardianRelation,
        guardianContactNumber: guardianContactNumber,
        bloodGroup: bloodGroup,
      }
      var response = await axios.post("https://hms-web-api.herokuapp.com/allottee", header, {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingAllottee() ;
  }
  async updatingAllottee(id ,name, fatherName, address, city, state, country, contactNumber, email, fatherContactNumber, occupation, guardianName, guardianRelation, guardianContactNumber, bloodGroup) {
    console.log("Updating Allottee");
    try {
      var header = {
        name: name,
        fatherName: fatherName,
        address: address,
        city: city,
        state: state,
        country: country,
        contactNumber: contactNumber,
        email: email,
        fatherContactNumber: fatherContactNumber,
        occupation: occupation,
        guardianName: guardianName,
        guardianRelation: guardianRelation,
        guardianContactNumber: guardianContactNumber,
        bloodGroup: bloodGroup,
      }
      var response = await axios.put("https://hms-web-api.herokuapp.com/allottee/" + id, header, {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingAllottee() ;
  }
  async gettingAllottee() {
    console.log("Getting Allottee");
    try {
      var response = await axios.get("https://hms-web-api.herokuapp.com/allottee", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({allotteeData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  // Beds
  async deletingBed(id) {
    console.log("Deleting Bed");
    try {
      var response = await axios.delete("https://hms-web-api.herokuapp.com/bed/" + id , {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingResources();
  }
  async postingBed(cupboard, sideTable, id, name) {
    console.log(id);
    console.log("Posting Beds");
    try {
      var header = {
        sideTable: sideTable,
        cupboard: cupboard,
        roomId: id,
        name: name
      }
      var response = await axios.post("https://hms-web-api.herokuapp.com/bed", header, {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingResources() ;
  }
  async gettingBeds() {
    console.log("Getting Rooms");
    try {
      var response = await axios.get("https://hms-web-api.herokuapp.com/bed", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({bedData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  // Allotment
  async deletingAllotment(id) {
    console.log("Deleting Allotment");
    try {
      var response = await axios.delete("https://hms-web-api.herokuapp.com/allotment/" + id , {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingResources();
  }
  async postingAllotment(studentId, bedId, securityDeposit, registeraitonCharges, monthlyRent) {
    console.log("Posting Allotment");
    try {
      var header = {
        studentId: studentId,
        bedId: bedId,
        securityDeposit: securityDeposit,
        registerationCharges: registeraitonCharges,
        monthlyRent: monthlyRent,
      }
      var response = await axios.post("https://hms-web-api.herokuapp.com/allotment", header, {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingResources() ;
  }
  async gettingAllotments() {
    console.log("Getting Allotments");
    try {
      var response = await axios.get("https://hms-web-api.herokuapp.com/allotment", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({allotmentData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  // Rent Receipts
  async deletingRent(id) {
    console.log("Deleting Rent Receipt");
    try {
      var response = await axios.delete("https://hms-web-api.herokuapp.com/rentreceipts/" + id, {withCredentials: true} ) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingResources();
  }
  async postingRent(allotteeId, rentMonth, natureOfPayment, amount, modeOfPayment, receivingPerson) {
    console.log("Posting Rent");
    try {
      var header = {
        allotteeId: allotteeId,
        rentMonth: rentMonth,
        natureOfPayment: natureOfPayment,
        amount: amount,
        modeOfPayment: modeOfPayment,
        receivingPerson: receivingPerson
      }
      var response = await axios.post("https://hms-web-api.herokuapp.com/rentreceipts", header, {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingResources() ;
  }
  async gettingRent() { 
    console.log("Getting REnt");
    try {
      var response = await axios.get("https://hms-web-api.herokuapp.com/rentreceipts", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({rentData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  // Visitor Log
  async deletingVisitor(id) {
    console.log("Deleting Visitor Log");
    try {
      var response = await axios.delete("https://hms-web-api.herokuapp.com/visitorLog/" + id , {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingResources();
  }
  async postingVisitor(visitorName, occupation, organization, cellNo, noOfBedsAsked, affordingCapacity, expectedDateOfArrival, self) {
    console.log("Posting Visitor Log");
    try {
      var header = {
        visitorName: visitorName,
        occupation: occupation,
        organization: organization,
        cellNo: cellNo,
        noOfBedsAsked: noOfBedsAsked,
        affordingCapacity: affordingCapacity,
        edo: expectedDateOfArrival,
        self: self
      }
      var response = await axios.post("https://hms-web-api.herokuapp.com/visitorLog", header, {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingResources() ;
  }
  async gettingVisitor() { 
    console.log("Getting Visitor Log");
    try {
      var response = await axios.get("https://hms-web-api.herokuapp.com/visitorLog", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({visitorData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  // Meal
  async deletingMeal(id) {
    console.log("Deleting Meal");
    try {
      var response = await axios.delete("https://hms-web-api.herokuapp.com/meal/" + id , {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingResources();
  }
  async postingMeal(day, time, food) {
    console.log("Posting Meal");
    try {
      var header = {
        day: day,
        time: time,
        food: food
      }
      var response = await axios.post("https://hms-web-api.herokuapp.com/meal", header, {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingResources() ;
  }
  async gettingMeal() { 
    console.log("Getting Meal");
    try {
      var response = await axios.get("https://hms-web-api.herokuapp.com/meal", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({mealData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  // Expense
  async deletingExpense(id) {
    console.log("DeletingExpense");
    try {
      var response = await axios.delete("https://hms-web-api.herokuapp.com/expense/" + id , {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingResources();
  }
  async postingExpense(name, category, amount) {
    console.log("Posting Expense");
    try {
      var header = {
        name: name,
        category: category,
        amount: amount
      }
      var response = await axios.post("https://hms-web-api.herokuapp.com/expense", header, {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingResources() ;
  }
  async gettingExpense() { 
    console.log("Getting Expenses");
    try {
      var response = await axios.get("https://hms-web-api.herokuapp.com/expense", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({expenseData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  //Admin
  async postingAdmin(name, email, password) {
    console.log("Posting Admin");
    try {
      var header = {
        name: name,
        email: email,
        password: password
      }
      var response = await axios.post("https://hms-web-api.herokuapp.com/admin/register", header, {withCredentials: true}) ;
      console.log(response) ;
    }
    catch(error) {
      console.log(error) ;
    }
    await this.gettingResources() ;
  }
  async gettingAdmin() { 
    console.log("Getting Admins");
    try {
      var response = await axios.get("https://hms-web-api.herokuapp.com/admin/get-all-admins", {withCredentials: true}) ;
      console.log(response) ;
      this.setState({adminData: response.data.data});
    }
    catch(error) {
      console.log(error) ;
    }
    
  }
  async gettingResources() {
    if (isAuthenticated(sessionStorage.getItem('HMS-Admin'))) {
      this.setState({loading: true});
      await this.gettingFloors() ;
      await this.gettingRooms() ;
      await this.gettingAllottee();
      await this.gettingBeds();
      await this.gettingAllotments() ;
      await this.gettingRent();
      await this.gettingVisitor();
      await this.gettingExpense();
      await this.gettingMeal() ;
      await this.gettingAdmin() ;
      this.setState({loading: false});
    }
  }
  render() {
    return (
      <>
        {this.state.loading === true 
          ? <WindMillLoading size="large"/>
          :
          <div className="wrapper">
            <Sidebar
              {...this.props}
              routes={routes}
              bgColor={this.state.backgroundColor}
              activeColor={this.state.activeColor}
            />
            <div className="main-panel" ref="mainPanel">
              <AdminNavbar {...this.props}  />
              <Switch>{this.getRoutes(routes)}</Switch>
              {
                // we don't want the Footer to be rendered on full screen maps page
                this.props.location.pathname.indexOf("full-screen-map") !==
                -1 ? null : (
                  <Footer fluid />
                )
              }
            </div>
          </div>
        }
      </>
      
    );
  }
}

export default Admin;
