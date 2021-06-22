
import AllData from "views/main-pages/AllData.js";
import visitorLogView from './views/main-pages/visitorLogView';
import allotteeView from './views/main-pages/allotteeView';
import floor from './views/main-pages/floor';
import rentRecieptView from './views/main-pages/rentRecieptView';
import room from "./views/main-pages/room";
import alottmentView from "./views/main-pages/alottmentView";
import bed from"./views/main-pages/bed";
import expense from "./views/main-pages/expense";
import UserProfile from "./views/main-pages/UserProfile";
import Meal from "./views/main-pages/meal";
import ManageAdmin from "./views/main-pages/manage-admin";
//Auth
import Login from "views/pages/Login.js";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-calendar-60",
    component: AllData,
    layout: "/admin",
    enabled: true,
  }, 
  {
    path: "/allottee",
    name: "Allottee",
    icon: "nc-icon nc-single-02",
    component: allotteeView,
    layout: "/admin",
    enabled: false,
},
{
    path: "/record-expenses",
    name: "Record Expenses",
    icon: "nc-icon nc-box",
    component: expense,
    layout: "/admin",
    enabled: true,
},
{
    path: "/floor",
    name: "Floor",
    icon: "nc-icon nc-single-02",
    component: floor,
    layout: "/admin",
    enabled: false,
},
{
  path: "/room",
  name: "Room",
  icon: "nc-icon nc-single-02",
  component: room,
  layout: "/admin",
  enabled: false,
},
{
    path: "/collect-payment",
    name: "Collect Payment",
    icon: "nc-icon nc-credit-card",
    component: rentRecieptView,
    layout: "/admin",
    enabled: true,
},
{
    path: "/alottment",
    name: "Alottment",
    icon: "nc-icon nc-single-02",
    component: alottmentView,
    layout: "/admin",
    enabled: false,
},
{
    path: "/bed",
    name: "Bed",
    icon: "nc-icon nc-single-02",
    component: bed,
    layout: "/admin",
    enabled: false,
},
{
    path: "/visitor",
    name: "Visitor Log Book",
    icon: "nc-icon nc-spaceship",
    component: visitorLogView,
    layout: "/admin",
    enabled: true,
}, 
{
    path: "/allottee-profile/:id",
    name: "Allottee Profile",
    icon: "nc-icon nc-single-02",
    component: UserProfile,
    layout: "/admin",
    enabled: false,
},
{
    path: "/meal",
    name: "Meal Log Book",
    icon: "nc-icon nc-atom",
    component: Meal,
    layout: "/admin",
    enabled: true,
},
{
  path: "/manage-admin",
  name: "Admin Management",
  icon: "nc-icon nc-briefcase-24",
  component: ManageAdmin,
  layout: "/admin",
  enabled: true,
},
{
  path: "/login",
  name: "Login",
  icon: "nc-icon nc-atom",
  component: Login,
  layout: "/auth",
  enabled: false,
},
];

export default routes;
