import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { signup } from "../util/index";
const { Item } = Form;

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSumbit = (values) => {
    const signupRequest = { ...values };
    signup(signupRequest)
      .then((response) => {
        localStorage.setItem("accessToken", response.accessToken);
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        if (error.status === 401) {
          notification.success({
            message: "VCLC App",
            description:
              "You're successfully registered. Please Login to continue!",
          });
        } else {
          notification.error({
            message: "VCLC App",
            description:
              error.response && error.response.data
                ? error.response.data.message
                : "Sorry! Something went wrong. Please try again!",
          });
        }
      });
  };

  return (
    <div
      className="align-items-center position-relative"
      style={{
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#242526",
      }}
    >
      <div
        className="container mt-3 p-5 pt-0 rounded"
        style={{
          width: "40%",
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(63, 64, 65, 0.5)",
        }}
      >
        <div className="container unauthenticated">
          <div className="row justify-content-evenly mt-5">
            <p
              type="button"
              className="col-4 py-2 mb-0 text-center text-white fw-bold"
              style={{ position: "relative", top: "-20px", fontSize: "30px" }}
            >
              Sign Up
            </p>
          </div>
          <Form form={form} onFinish={handleSumbit} className="m-2 d-grid">
            {/* First Name Input */}
            <div className="form-outline mb-3">
              <Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input size="large" name="firstName" placeholder="First Name" />
              </Item>
            </div>

            {/* Last Name Input */}
            <div className="form-outline mb-3">
              <Item
                name="lasttName"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
              >
                <Input size="large" name="lastName" placeholder="Last Name" />
              </Item>
            </div>

            {/* Email Input */}
            <div className="form-outline mb-3">
              <Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input size="large" name="email" placeholder="Email" />
              </Item>
            </div>

            {/* Password Input */}
            <div className="form-outline mb-3">
              <Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input size="large" name="password" type="password" placeholder="Password" />
              </Item>
            </div>

            {/* Button Container */}
            <div className="btn-container">
              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary btn-md btn-block col-12 col-md-12"
              >
                Sign Up
              </button>
              </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
