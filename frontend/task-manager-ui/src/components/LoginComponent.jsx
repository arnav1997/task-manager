import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, saveLoggedInUser, storeToken } from "../services/AuthService";

const LoginComponent = () => {
  const navigator = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const userDetails = { usernameOrEmail, password };
    console.log(userDetails);
    await login(userDetails)
      .then((response) => {
        console.log(response);
        // const token = "Basic " + window.btoa(usernameOrEmail + ":" + password);
        const token = "Bearer " + response.data.accessToken;
        storeToken(token);
        saveLoggedInUser(usernameOrEmail);
        navigator("/tasks");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Error!");
      });
  };
  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Login</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label text-center mt-1">
                    Username or Email ID
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="usernameOrEmail"
                      className="form-control"
                      placeholder="Enter Username or Email ID"
                      value={usernameOrEmail}
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3 control-label text-center mt-1">
                    Password
                  </label>
                  <div className="col-md-9">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="text-center">
                  <button className="btn btn-success" onClick={handleLogin}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
