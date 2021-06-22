
// import Buttons from "views/components/Buttons.js";
// import Calendar from "views/Calendar.js";
// import Charts from "views/Charts.js";
// import Dashboard from "views/Dashboard.js";
// import ExtendedForms from "views/forms/ExtendedForms.js";
// import ExtendedTables from "views/tables/ExtendedTables.js";
// import FullScreenMap from "views/maps/FullScreenMap.js";
// import GoogleMaps from "views/maps/GoogleMaps.js";
// import GridSystem from "views/components/GridSystem.js";
// import Icons from "views/components/Icons.js";
// import LockScreen from "views/pages/LockScreen.js";
// import Login from "views/pages/Login.js";
// import Notifications from "views/components/Notifications.js";
// import Panels from "views/components/Panels.js";
// import ReactTables from "views/tables/ReactTables.js";
// import Register from "views/pages/Register.js";
// import RegularForms from "views/forms/RegularForms.js";
// import RegularTables from "views/tables/RegularTables.js";
// import SweetAlert from "views/components/SweetAlert.js";
// import Timeline from "views/pages/Timeline.js";
// import Typography from "views/components/Typography.js";
// import UserProfile from "views/pages/UserProfile.js";
// import ValidationForms from "views/forms/ValidationForms.js";
// import VectorMap from "views/maps/VectorMap.js";
// import Widgets from "views/Widgets.js";
// import Wizard from "views/forms/Wizard.js";
//Mine 
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
  icon: "nc-icon nc-atom",
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
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-bank",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   collapse: true,
  //   name: "Pages",
  //   icon: "nc-icon nc-book-bookmark",
  //   state: "pagesCollapse",
  //   views: [
  //     {
  //       path: "/timeline",
  //       name: "Timeline",
  //       mini: "T",
  //       component: Timeline,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/login",
  //       name: "Login",
  //       mini: "L",
  //       component: Login,
  //       layout: "/auth",
  //     },
  //     {
  //       path: "/register",
  //       name: "Register",
  //       mini: "R",
  //       component: Register,
  //       layout: "/auth",
  //     },
  //     {
  //       path: "/lock-screen",
  //       name: "LockScreen",
  //       mini: "LS",
  //       component: LockScreen,
  //       layout: "/auth",
  //     },
  //     {
  //       path: "/user-profile",
  //       name: "UserProfile",
  //       mini: "UP",
  //       component: UserProfile,
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Components",
  //   icon: "nc-icon nc-layout-11",
  //   state: "componentsCollapse",
  //   views: [
  //     {
  //       path: "/buttons",
  //       name: "Buttons",
  //       mini: "B",
  //       component: Buttons,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/grid-system",
  //       name: "Grid System",
  //       mini: "GS",
  //       component: GridSystem,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/panels",
  //       name: "Panels",
  //       mini: "P",
  //       component: Panels,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/sweet-alert",
  //       name: "Sweet Alert",
  //       mini: "SA",
  //       component: SweetAlert,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/notifications",
  //       name: "Notifications",
  //       mini: "N",
  //       component: Notifications,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/icons",
  //       name: "Icons",
  //       mini: "I",
  //       component: Icons,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/typography",
  //       name: "Typography",
  //       mini: "T",
  //       component: Typography,
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Forms",
  //   icon: "nc-icon nc-ruler-pencil",
  //   state: "formsCollapse",
  //   views: [
  //     {
  //       path: "/regular-forms",
  //       name: "Regular Forms",
  //       mini: "RF",
  //       component: RegularForms,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/extended-forms",
  //       name: "Extended Forms",
  //       mini: "EF",
  //       component: ExtendedForms,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/validation-forms",
  //       name: "Validation Forms",
  //       mini: "VF",
  //       component: ValidationForms,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/wizard",
  //       name: "Wizard",
  //       mini: "W",
  //       component: Wizard,
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Tables",
  //   icon: "nc-icon nc-single-copy-04",
  //   state: "tablesCollapse",
  //   views: [
  //     {
  //       path: "/regular-tables",
  //       name: "Regular Tables",
  //       mini: "RT",
  //       component: RegularTables,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/extended-tables",
  //       name: "Extended Tables",
  //       mini: "ET",
  //       component: ExtendedTables,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/react-tables",
  //       name: "React Tables",
  //       mini: "RT",
  //       component: ReactTables,
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   state: "mapsCollapse",
  //   views: [
  //     {
  //       path: "/google-maps",
  //       name: "Google Maps",
  //       mini: "GM",
  //       component: GoogleMaps,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/full-screen-map",
  //       name: "Full Screen Map",
  //       mini: "FSM",
  //       component: FullScreenMap,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/vector-map",
  //       name: "Vector Map",
  //       mini: "VM",
  //       component: VectorMap,
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   path: "/widgets",
  //   name: "Widgets",
  //   icon: "nc-icon nc-box",
  //   component: Widgets,
  //   layout: "/admin",
  // },
  // {
  //   path: "/charts",
  //   name: "Charts",
  //   icon: "nc-icon nc-chart-bar-32",
  //   component: Charts,
  //   layout: "/admin",
  // },
  // {
  //   path: "/calendar",
  //   name: "Calendar",
  //   icon: "nc-icon nc-calendar-60",
  //   component: Calendar,
  //   layout: "/admin",
  // },
];

export default routes;
