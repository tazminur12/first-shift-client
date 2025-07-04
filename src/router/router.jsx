import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../Pages/Authentication/register";
import Login from "../Pages/Authentication/Login";
import Coverage from "../Pages/Coverage/Coverage";
import SentParcel from "../Pages/SentParcel/SentParcel";
import PrivateRoute from "../routes/PrivateRoute";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import TrackParcel from "../Pages/Dashboard/TrackParcel.jsx/TrackParcel";
import DashHome from "../Pages/Dashboard/DashHome/DashHome";
import BeARider from "../Pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRider from "../Pages/Dashboard/activeRider/activeRider";
import About from "../Pages/About";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import ForbiddenPage from "../Pages/Forbidden/ForbiddenPage";
import AdminRoute from "../routes/AdminRoute";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";
import AllUsers from "../Pages/Dashboard/Users/AllUsers";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile/UpdateProfile";
import RiderRoute from "../routes/RiderRoute";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries/PendingDeliveries";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import MyEarnings from "../Pages/Dashboard/MyEarnings/MyEarnings";
import Pricing from '../Pages/Pricing/Pricing';
import Service from '../Pages/Service/Service';

const router = createBrowserRouter(
    [
        {
            path: "/",
            Component: RootLayout,
            children: [
                {  
                    index: true,
                    Component: Home
                },
                {
                    path: "coverage",
                    Component: Coverage,
                    loader: () => fetch("/public/serviceCenter.json")
                },
                {
                    path: "forbidden",
                    Component: ForbiddenPage
                },
                {
                    path: 'be-rider',
                    element: <PrivateRoute><BeARider></BeARider></PrivateRoute>,
                    loader: () => fetch ("/public/serviceCenter.json")
                },
                {
                    path: "sentparcel",
                    element: (
                        <PrivateRoute>
                            <SentParcel />
                        </PrivateRoute>
                    ),
                    loader: () => fetch("/public/serviceCenter.json")
                },
                {
                    path: "about",
                    Component: About
                },
                {
                    path: '/pricing',
                    element: <Pricing />,
                },
                {
                    path: '/service',
                    element: <Service />,
                },
            ]
        },
        {
           path: "/",
           Component: AuthLayout,
              children: [
                {
                    path: "login",
                    Component: Login
                },
                {
                    path: "register",
                    Component: Register
                }
              ]
        },
        {
            path: "/dashboard",
            element: <PrivateRoute>
                <DashBoardLayout></DashBoardLayout>
            </PrivateRoute>,
            children: [

                {
                    path: "/dashboard",
                    Component: DashHome
                },
                {
                    path: "myParcels",
                    Component: MyParcels
                },
                {
                    path: "payment/:parcelId",
                    Component: Payment
                },
                {
                    path: "paymentHistory",
                    Component: PaymentHistory
                },
                {
                    path: "track",
                    Component: TrackParcel
                },
                {
                    path: "update-profile",
                    Component: UpdateProfile
                },
                {
                    path: "assign-rider",
                    element: <AdminRoute><AssignRider></AssignRider></AdminRoute>
                },
                {
                    path: "pending-riders",
                    element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>
                },
                {
                    path: "active-riders",
                    element: <AdminRoute><ActiveRider></ActiveRider></AdminRoute>
                },
                {
                    path: "makeAdmin",
                    element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
                },
                {
                    path: "users",
                    element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
                },
                {
                    path: "pending-deliveries",
                    element: <RiderRoute><PendingDeliveries></PendingDeliveries></RiderRoute>
                },
                {
                    path: "complete-deliveries",
                    element: <RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
                },
                {
                    path: "my-earnings",
                    element: <RiderRoute><MyEarnings></MyEarnings></RiderRoute>
                }
                ]
        }
    ]
)
export default router;