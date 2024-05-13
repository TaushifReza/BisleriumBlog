import React, { useContext, useEffect } from "react";
import Layout from "./Layout";
import "../style/AdminDashboard/css/bootstrap.css";
import "../style/AdminDashboard/css/bootstrap.min.css";
import "../style/AdminDashboard/css/theme.css";
import "../style/AdminDashboard/css/theme.min.css";
import "../style/AdminDashboard/css/icons.min.css";
import Chart from "chart.js/auto"; //this showed error so suyasha comented this line (happened after blogdetailpage uploaded)
import myContext from "../context/myContext";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import AdminNavs from "./AdminNavs";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import AddAdmin from "./Addadmin";
import { signIn } from "../Features/SignIn/SignInSlice";
const DummyData = {
  lineChartData: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Total Blogs Per Month",
        data: [30, 20, 10, 18, 22, 21, 5],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  },
  barChartData: {
    labels: ["Technology", "LifeStyle", "Economisc", "Science", "Movie"],
    datasets: [
      {
        label: "Total Blogs Per Category",
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  areaChartData: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Total Views Per Month",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  },
  pieChartData: {
    labels: ["Week1", "Week2", "Week3", "Week4"],
    datasets: [
      {
        label: "Number of Blogs This Month",
        data: [3, 5, 10, 7],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
};

function AdminDashboard() {
  const Logout = () => {
    {
      dispatch(signIn({ token: "", userData: {} }));
    }
    navigate("/signin");
  };

  const token = useSelector((state) => state.signin.token);
  const [topblogs, settopblogs] = useState([]);
  const [topbloggers, settopbloggers] = useState([]);
  const [date, setdate] = useState("");
  const [date2, setdate2] = useState("");
  const [addAdmin, setaddAdmin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const lineCtx = document.getElementById("lineChart").getContext("2d");
    let lineChartInstance = new Chart(lineCtx, {
      type: "line",
      data: DummyData.lineChartData,
    });

    const barCtx = document.getElementById("barChart").getContext("2d");
    let barChartInstance = new Chart(barCtx, {
      type: "bar",
      data: DummyData.barChartData,
    });

    const areaCtx = document.getElementById("areaChart").getContext("2d");
    let areaChartInstance = new Chart(areaCtx, {
      type: "line",
      data: DummyData.areaChartData,
    });

    const pieCtx = document.getElementById("pieChart").getContext("2d");
    pieCtx.canvas.width = 80;
    pieCtx.canvas.height = 80;

    let pieChartInstance = new Chart(pieCtx, {
      type: "pie",
      data: DummyData.pieChartData,
    });

    // Clean up function to destroy Chart instances
    return () => {
      lineChartInstance.destroy();
      barChartInstance.destroy();
      areaChartInstance.destroy();
      pieChartInstance.destroy();
    };
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://localhost:7094/api/Admin/PopularBlog?pageSize=${10}&pageNumber=${1}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        settopblogs(response.data.result.top10Blog);
      })
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://localhost:7094/api/Admin/PopularMonthBlog?year=${+date.split(
          "-"
        )[0]}&month=${+date.split("-")[1]}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        settopblogs(response.data.result.top10Blog);
      })
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, [date]);

  useEffect(() => {
    axios
      .get(`https://localhost:7094/api/Admin/TopBloggers`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        settopbloggers(response.data.result.top10Blog);
      })
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, []);

  const context = useContext(myContext);
  const { mode } = context;
  return (
    <>
      <div id="layout-wrapper">
        <div className="header-border"></div>
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex align-items-left">
              <button
                type="button"
                className="btn btn-sm mr-2 d-lg-none px-3 font-size-16 header-item waves-effect"
                id="vertical-menu-btn"
              >
                <i className="fa fa-fw fa-bars"></i>
              </button>

              <div className="dropdown d-none d-sm-inline-block">
                <button
                  type="button"
                  className="btn header-item waves-effect"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dashboard
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className="vertical-menu">
          <div data-simplebar className="h-100">
            <div className="navbar-brand-box">
              <a href="index.html" className="logo">
                <span>
                  <b>Bislerium Blog</b>
                </span>
              </a>
            </div>
            <div id="sidebar-menu">
              <ul className="metismenu list-unStyled" id="side-menu">
                <li className="menu-title">Menu</li>

                <li>
                  <Link
                    onClick={() => {
                      setaddAdmin(false);
                    }}
                    className="waves-effect"
                  >
                    <i className="mdi mdi-home-analytics"></i>
                    <span>Dashboard</span>
                  </Link>
                </li>

                <li>
                  <a
                    onClick={() => {
                      setaddAdmin(true);
                    }}
                    className="waves-effect"
                  >
                    <i className="fas fa-user"></i>
                    <span>Resgister Admin</span>
                  </a>
                </li>

                <li>
                  <a href="javascript: void(0);" className="waves-effect">
                    <i className="fas fa-cog"></i>
                    <span>Setting</span>
                  </a>
                </li>

                <li>
                  <a href="javascript: void(0);" className="waves-effect">
                    <i className="fas fa-blog"></i>
                    <span>Blogs</span>
                  </a>
                </li>

                <li>
                  <a href="javascript: void(0);" className="waves-effect">
                    <i className="fas fa-user"></i>
                    <span>Bloggers</span>
                  </a>
                </li>
                <li>
                  <a onClick={Logout} className="waves-effect">
                    <i className="fas fa-user"></i>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {addAdmin ? (
          <AddAdmin></AddAdmin>
        ) : (
          <>
            <div className="main-content">
              <div className="page-content">
                <div className="container-fluid">
                  <AdminNavs></AdminNavs>
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title">Line Chart</h4>
                          <canvas id="lineChart"></canvas>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title">Bar Chart</h4>
                          <canvas id="barChart"></canvas>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="card">
                        <div
                          className="card-body"
                          Style="height:400px; width:600px;"
                        >
                          <h4 className="card-title">Area chart</h4>
                          <canvas id="areaChart"></canvas>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6">
                      <div className="card">
                        <div
                          className="card-body"
                          Style="height:400px; width:600px;"
                        >
                          <h4 className="card-title">Pie chart</h4>
                          <canvas
                            id="pieChart"
                            Style="max-height:300px;"
                          ></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="flex justify-between mb-3 ">
                          <h4 className="card-title ">Top 10 Blogger</h4>
                          <input
                            type="month"
                            name=""
                            id=""
                            value={date2}
                            onChange={(e) => {
                              setdate2(e.target.value);
                            }}
                          />
                        </div>
                        <div className="table-responsive">
                          <table className="table table-centered table-striped table-nowrap mb-50">
                            <thead>
                              <tr>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Blog title</th>
                                <th>Create Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* {topbloggers.map((bloggers) => (
                                <tr>
                                  <td className="table-user">
                                    <a
                                      href="javascript:void(0);"
                                      className="text-body font-weight-semibold"
                                    >{bloggers}
                                    </a>
                                  </td>
                                  <td>{bloggers}</td>
                                  <td>{bloggers}</td>
                                  <td>{bloggers}</td>
                                </tr>
                              ))} */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body ">
                        <div className="flex justify-between mb-3 ">
                          <h4 className="card-title ">Top 10 Blogs</h4>
                          <input
                            type="month"
                            name=""
                            id=""
                            value={date}
                            onChange={(e) => {
                              setdate(e.target.value);
                            }}
                          />
                        </div>

                        <div className="table-responsive">
                          <table className="table table-centered table-striped table-nowrap mb-0">
                            <thead>
                              <tr>
                                <th>Blog Title</th>
                                <th>Category</th>
                                <th>Upvotes</th>
                                <th>Downvotes</th>
                                <th>Created At</th>
                              </tr>
                            </thead>
                            <tbody>
                              {topblogs.map((blog) => (
                                <tr>
                                  <td>{blog.title}</td>
                                  <td>{blog.category.name}</td>
                                  <td>{blog.upVoteCount}</td>
                                  <td>{blog.downVoteCount}</td>
                                  <td>
                                    {new Date(
                                      blog.createdAt
                                    ).toLocaleDateString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="footer">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-sm-6">2024 © BisleriumBlog.</div>
                    <div className="col-sm-6">
                      <div className="text-sm-right d-none d-sm-block">
                        Design & Develop by Hero Devs
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
            <div className="menu-overlay"></div>
          </>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
