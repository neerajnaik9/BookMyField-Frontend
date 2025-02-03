import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WelcomeNavbar from "./components/Navbar";
import CustomerNavbar from "./components/CustomerNavbar";
import FieldOwnerNavbar from "./components/FieldOwnerNavbar";
import AdminNavbar from "./components/AdminNavbar";

import AdminDashboard from "./dashboards/Admin/AdminDashboard";
import TurfOwners from "./dashboards/Admin/TurfOwners";
import PendingApprovals from "./dashboards/Admin/PendingApprovals";
import CustomersInfo from "./dashboards/Admin/CustomersInfo";

import FieldOwnerDashboard from "./dashboards/FieldOwner/FieldOwnerDashboard";
import AddField from "./dashboards/FieldOwner/AddField";
import MyFields from "./dashboards/FieldOwner/MyFields";
import AdminApproval from "./dashboards/FieldOwner/AdminApproval";

import CustomerDashboard from "./dashboards/Customer/CustomerDashboard";
import FieldListings from "./dashboards/Customer/FieldListings";
import BookingHistory from "./dashboards/Customer/BookingHistory";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import TurfGroundList from "./pages/TurfGroundList";
import TurfDescription from "./pages/TurfDescription"; // Added
import PaymentPage from "./pages/PaymentPage";         // Added

function App() {
  const getDashboardRoute = () => {
    const userRole = localStorage.getItem("userRole");

    if (userRole === "admin") return "/admin";
    if (userRole === "field-owner") return "/field-owner";
    if (userRole === "customer") return "/customer/homepage";

    return "/login";
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow main-content">
          <Routes>
            {/* Public Pages */}
            <Route
              path="/"
              element={
                <>
                  <WelcomeNavbar />
                  <Home />
                </>
              }
            />
            <Route
              path="/about-us"
              element={
                <>
                  <WelcomeNavbar />
                  <AboutUs />
                </>
              }
            />
            <Route
              path="/contact-us"
              element={
                <>
                  <WelcomeNavbar />
                  <ContactUs />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <WelcomeNavbar />
                  <Signup />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <WelcomeNavbar />
                  <Login />
                </>
              }
            />

            {/* Redirect to the correct dashboard */}
            <Route
              path="/dashboard"
              element={<Navigate to={getDashboardRoute()} replace />}
            />

            {/* Admin Dashboard */}
            <Route
              path="/admin"
              element={
                <>
                  <AdminNavbar />
                  <AdminDashboard />
                </>
              }
            />
            <Route
              path="/admin/turf-owners"
              element={
                <>
                  <AdminNavbar />
                  <TurfOwners />
                </>
              }
            />
            <Route
              path="/admin/pending-approvals"
              element={
                <>
                  <AdminNavbar />
                  <PendingApprovals />
                </>
              }
            />
            <Route
              path="/admin/customers-info"
              element={
                <>
                  <AdminNavbar />
                  <CustomersInfo />
                </>
              }
            />

            {/* Field Owner Dashboard */}
            <Route
              path="/field-owner"
              element={
                <>
                  <FieldOwnerNavbar />
                  <FieldOwnerDashboard />
                </>
              }
            />
            <Route
              path="/field-owner/add-field"
              element={
                <>
                  <FieldOwnerNavbar />
                  <AddField />
                </>
              }
            />
            <Route
              path="/field-owner/my-fields"
              element={
                <>
                  <FieldOwnerNavbar />
                  <MyFields />
                </>
              }
            />
            <Route
              path="/field-owner/admin-approval"
              element={
                <>
                  <FieldOwnerNavbar />
                  <AdminApproval />
                </>
              }
            />

            {/* Customer Dashboard */}
            <Route
              path="/customer/homepage"
              element={
                <>
                  <CustomerNavbar />
                  <CustomerDashboard />
                </>
              }
            />
            <Route
              path="/customer/field-listings"
              element={
                <>
                  <CustomerNavbar />
                  <FieldListings />
                </>
              }
            />
            <Route
              path="/customer/booking-history"
              element={
                <>
                  <CustomerNavbar />
                  <BookingHistory />
                </>
              }
            />
            <Route
              path="/customer/contact-us"
              element={
                <>
                  <CustomerNavbar />
                  <ContactUs />
                </>
              }
            />

            {/* Turf Categories */}
            <Route path="/cricket-turfs" element={<TurfGroundList sport="Cricket" />} />
            <Route path="/football-turfs" element={<TurfGroundList sport="Football" />} />
            <Route path="/basketball-turfs" element={<TurfGroundList sport="Basketball" />} />
            <Route path="/badminton-turfs" element={<TurfGroundList sport="Badminton" />} />

            {/* Turf Description */}
            <Route
              path="/turfdescription"
              element={
                <>
                  <CustomerNavbar />
                  <TurfDescription />
                </>
              }
            />

            {/* Payment Page */}
            <Route
              path="/payment"
              element={
                <>
                  <CustomerNavbar />
                  <PaymentPage />
                </>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;