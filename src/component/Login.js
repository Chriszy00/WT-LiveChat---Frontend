import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../util/index";
const { Item } = Form;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const loginRequest = { ...values };
    login(loginRequest)
      .then((response) => {
        localStorage.setItem("accessToken", response.accessToken);
        navigate("/home", { replace: true });
      })
      .catch((error) => {
        console.error("Login error:", error); // Log the entire error object
      
        if (error.response && error.response.status === 401) {
          notification.error({
            message: "VCLC App",
            description: "Your Email or Password is incorrect. Please try again!",
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
              Sign In
            </p>
          </div>
          <Form form={form} onFinish={handleSubmit} className="m-2 d-grid">
            {/* Email input */}
            <div className="form-outline mb-4">
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

            {/* Password input */}
            <div className="form-outline mb-4">
              <Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  size="large"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </Item>
            </div>

            {/* Button container */}
            <div className="btn-container">
              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-primary btn-md btn-block col-12 col-md-12"
              >
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
