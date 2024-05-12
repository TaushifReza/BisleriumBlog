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
import { Link } from "react-router-dom";
import AdminNavs from "./AdminNavs";

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
                  {" "}
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
                  <a href="index.html" className="waves-effect">
                    <i className="mdi mdi-home-analytics"></i>
                    <span>Dashboard</span>
                  </a>
                </li>

                <li>
                  <a href="javascript: void(0);" className="waves-effect">
                    <i className="fas fa-user"></i>
                    <span>Profile</span>
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
              </ul>
            </div>
          </div>
        </div>

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
                      <canvas id="pieChart" Style="max-height:300px;"></canvas>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Top 10 Bloggers</h4>
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
                          <tr>
                            <td className="table-user">
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Bicky Yadav
                              </a>
                            </td>
                            <td>yadavbicky99@gmail.com</td>
                            <td>Test title 1</td>
                            <td>07/07/2024</td>
                          </tr>

                          <tr>
                            <td className="table-user">
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Hrishik Sangroula
                              </a>
                            </td>
                            <td>hrishiksangrou@gmail.com</td>
                            <td>Test title 12</td>
                            <td>07/04/2024</td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Mohammad Taushif Reza
                              </a>
                            </td>
                            <td>taushif1teza@gmail.com</td>
                            <td>Test title 3</td>
                            <td>06/30/2024</td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Himani Acharya
                              </a>
                            </td>
                            <td>himaniacharya@gmail.com</td>
                            <td>Title 4</td>
                            <td>09/08/2024</td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Suyasha Adhikari
                              </a>
                            </td>
                            <td>suyashaadhikari@gmail.com</td>
                            <td>Title 4</td>
                            <td>07/15/2018</td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Aarav Gurung
                              </a>
                            </td>
                            <td>aaravgurung@gmail.com</td>
                            <td>Title 6</td>
                            <td>11/22/2024</td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Anaya Thapa
                              </a>
                            </td>
                            <td>anayathapa@gmail.com</td>
                            <td>Title 7</td>
                            <td>10/15/2024</td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Pranav Joshi
                              </a>
                            </td>
                            <td>pranavjoshi@gmail.com</td>
                            <td>Title 8</td>
                            <td>09/30/2024</td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Ishita Rai
                              </a>
                            </td>
                            <td>ishitarai@gmail.com</td>
                            <td>Title 9</td>
                            <td>08/18/2024</td>
                          </tr>
                          <tr>
                            <td className="table-user">
                              <a
                                href="javascript:void(0);"
                                className="text-body font-weight-semibold"
                              >
                                Aarush Shahi
                              </a>
                            </td>
                            <td>aarushshahi@gmail.com</td>
                            <td>Title 10</td>
                            <td>07/03/2024</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Top 10 Blogs</h4>
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
                          <tr>
                            <td>Test title 1</td>
                            <td>Category 1</td>
                            <td>10</td>
                            <td>2</td>
                            <td>07/07/2024</td>
                          </tr>
                          <tr>
                            <td>Test title 12</td>
                            <td>Category 2</td>
                            <td>15</td>
                            <td>3</td>
                            <td>07/04/2024</td>
                          </tr>
                          <tr>
                            <td>Test title 3</td>
                            <td>Category 3</td>
                            <td>20</td>
                            <td>5</td>
                            <td>06/30/2024</td>
                          </tr>
                          <tr>
                            <td>Title 4</td>
                            <td>Category 4</td>
                            <td>8</td>
                            <td>1</td>
                            <td>09/08/2024</td>
                          </tr>
                          <tr>
                            <td>Title 4</td>
                            <td>Category 5</td>
                            <td>5</td>
                            <td>0</td>
                            <td>07/15/2018</td>
                          </tr>
                          <tr>
                            <td>Title 6</td>
                            <td>Category 6</td>
                            <td>12</td>
                            <td>4</td>
                            <td>11/22/2024</td>
                          </tr>
                          <tr>
                            <td>Title 7</td>
                            <td>Category 7</td>
                            <td>18</td>
                            <td>2</td>
                            <td>10/15/2024</td>
                          </tr>
                          <tr>
                            <td>Title 8</td>
                            <td>Category 8</td>
                            <td>25</td>
                            <td>7</td>
                            <td>09/30/2024</td>
                          </tr>
                          <tr>
                            <td>Title 9</td>
                            <td>Category 9</td>
                            <td>14</td>
                            <td>3</td>
                            <td>08/18/2024</td>
                          </tr>
                          <tr>
                            <td>Title 10</td>
                            <td>Category 10</td>
                            <td>9</td>
                            <td>1</td>
                            <td>07/03/2024</td>
                          </tr>
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
      </div>
      <div className="menu-overlay"></div>
    </>
  );
}

export default AdminDashboard;
