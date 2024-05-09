import React, { useContext, useEffect } from 'react';
import Layout from './Layout'
import '../style/AdminDashboard/css/bootstrap.css';
import '../style/AdminDashboard/css/bootstrap.min.css';
import '../style/AdminDashboard/css/theme.css';
import '../style/AdminDashboard/css/theme.min.css';
import '../style/AdminDashboard/css/icons.min.css';
import Chart from 'chart.js/auto'; //this showed error so suyasha comented this line (happened after blogdetailpage uploaded)
import myContext from "../context/myContext";
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const DummyData = {
    lineChartData: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Blogs',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    barChartData: {
      labels: ['Category1', 'Category2', 'Category3', 'Category4', 'Category5'],
      datasets: [{
        label: 'Total Categories',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    areaChartData: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }]
    },
    pieChartData: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100, 40, 120, 30],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    }
  };
  

function AdminDashboard() {
    useEffect(() => {
        const lineCtx = document.getElementById('lineChart').getContext('2d');
        let lineChartInstance = new Chart(lineCtx, {
            type: 'line',
            data: DummyData.lineChartData,
        });
    
        const barCtx = document.getElementById('barChart').getContext('2d');
        let barChartInstance = new Chart(barCtx, {
            type: 'bar',
            data: DummyData.barChartData,
        });
    
        const areaCtx = document.getElementById('areaChart').getContext('2d');
        let areaChartInstance = new Chart(areaCtx, {
            type: 'line',
            data: DummyData.areaChartData,
        });
    
        const pieCtx = document.getElementById('pieChart').getContext('2d');
        pieCtx.canvas.width = 80;
        pieCtx.canvas.height = 80;

        let pieChartInstance = new Chart(pieCtx, {
            type: 'pie',
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
            <div class="header-border"></div>
            <header id="page-topbar">
                <div class="navbar-header">

                    <div class="d-flex align-items-left">
                        <button type="button" class="btn btn-sm mr-2 d-lg-none px-3 font-size-16 header-item waves-effect"
                            id="vertical-menu-btn">
                            <i class="fa fa-fw fa-bars"></i>
                        </button>

                        <div class="dropdown d-none d-sm-inline-block">
                            <button type="button" class="btn header-item waves-effect"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <div class="vertical-menu">

                <div data-simplebar class="h-100">

                    <div class="navbar-brand-box">
                        <a href="index.html" class="logo">
                            <span>
                                <b>Bislerium Blog</b>
                            </span>
                        </a>
                    </div>
                    <div id="sidebar-menu">
                        <ul class="metismenu list-unStyled" id="side-menu">
                            <li class="menu-title">Menu</li>

                            <li>
                                <a href="index.html" class="waves-effect"><i class="mdi mdi-home-analytics"></i><span>Dashboard</span></a>
                            </li>

                            <li>
                                <a href="javascript: void(0);" class="waves-effect"><i
                                        class="fas fa-user"></i><span>Profile</span></a>
                                
                            </li>

                            <li>
                                <a href="javascript: void(0);" class="waves-effect"><i
                                        class="fas fa-cog"></i><span>Setting</span></a>
                               
                            </li>

                            <li>
                                <a href="javascript: void(0);" class="waves-effect"><i
                                        class="fas fa-blog"></i><span>Blogs</span></a>
                            </li>

                            <li>
                                <a href="javascript: void(0);" class="waves-effect"><i
                                        class="fas fa-user"></i><span>Bloggers</span></a>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>

            <div class="main-content">
                <div class="page-content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-6 col-xl-3">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="mb-4">
                                            <span class="badge badge-soft-primary float-right">Daily</span>
                                            <h5 class="card-title mb-0">Blog Posts</h5>
                                        </div>
                                        <div class="row d-flex align-items-center mb-4">
                                            <div class="col-8">
                                                <h2 class="d-flex align-items-center mb-0">
                                                    123
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div class="col-md-6 col-xl-3">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="mb-4">
                                            <span class="badge badge-soft-primary float-right">Daily</span>
                                            <h5 class="card-title mb-0">Comments</h5>
                                        </div>
                                        <div class="row d-flex align-items-center mb-4">
                                            <div class="col-8">
                                                <h2 class="d-flex align-items-center mb-0">
                                                    100
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-xl-3">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="mb-4">
                                            <span class="badge badge-soft-primary float-right">Daily</span>
                                            <h5 class="card-title mb-0">Upvotes</h5>
                                        </div>
                                        <div class="row d-flex align-items-center mb-4">
                                            <div class="col-8">
                                                <h2 class="d-flex align-items-center mb-0">
                                                    122
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-xl-3">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="mb-4">
                                            <span class="badge badge-soft-primary float-right">All Time</span>
                                            <h5 class="card-title mb-0">Down Votes</h5>
                                        </div>
                                        <div class="row d-flex align-items-center mb-4">
                                            <div class="col-8">
                                                <h2 class="d-flex align-items-center mb-0">
                                                    123
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                        <div class="col-xl-6">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Line Chart</h4>
                                    <canvas id="lineChart"></canvas>
                                </div>
                            </div> 
                        </div> 
                    
                        <div class="col-xl-6">
                            <div class="card">
                                <div class="card-body">
                    
                                    <h4 class="card-title">Bar Chart</h4>
                                    <canvas id="barChart"></canvas>
                    
                                </div> 
                            </div> 
                        </div> 
                        <div class="col-xl-6">
                            <div class="card">
                                <div class="card-body" Style="height:400px; width:600px;">
                    
                                    <h4 class="card-title">Area chart</h4>
                                    <canvas id="areaChart"></canvas>
                    
                                </div> 
                            </div> 
                        </div> 
                    
                        <div class="col-xl-6">
                            <div class="card">
                                <div class="card-body" Style="height:400px; width:600px;">
                    
                                    <h4 class="card-title">Pie chart</h4>
                                    <canvas id="pieChart" Style="max-height:300px;"></canvas>
                    
                                </div> 
                            </div> 
                        </div> 
                 
                    </div>
                        <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">

                                        <h4 class="card-title">Top 10 Blogs</h4>
                                        <div class="table-responsive">
                                            <table class="table table-centered table-striped table-nowrap mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>User</th>
                                                        <th>Email</th>
                                                        <th>Blog title</th>
                                                        <th>Create Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td class="table-user">
                                                            <a href="javascript:void(0);" class="text-body font-weight-semibold">Paul J. Friend</a>
                                                        </td>
                                                        <td>
                                                            pauljfrnd@jourrapide.com
                                                        </td>
                                                        <td>
                                                            Title 1
                                                        </td>
                                                        <td>
                                                            07/07/2018
                                                        </td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td class="table-user">
                                                            <a href="javascript:void(0);" class="text-body font-weight-semibold">Bryan J. Luellen</a>
                                                        </td>
                                                        <td>
                                                            bryuellen@dayrep.com
                                                        </td>
                                                        <td>
                                                            Title 2
                                                        </td>
                                                        <td>
                                                            09/12/2018
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="table-user">
                                                            <a href="javascript:void(0);" class="text-body font-weight-semibold">Kathryn S. Collier</a>
                                                        </td>
                                                        <td>
                                                            collier@jourrapide.com
                                                        </td>
                                                        <td>
                                                            Title 3
                                                        </td>
                                                        <td>
                                                            06/30/2018
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="table-user">
                                                            <a href="javascript:void(0);" class="text-body font-weight-semibold">Timothy Kauper</a>
                                                        </td>
                                                        <td>
                                                            thykauper@rhyta.com
                                                        </td>
                                                        <td>
                                                            Title 4
                                                        </td>
                                                        <td>
                                                            09/08/2018
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="table-user">
                                                            <a href="javascript:void(0);" class="text-body font-weight-semibold">Zara Raws</a>
                                                        </td>
                                                        <td>
                                                            austin@dayrep.com
                                                        </td>
                                                        <td>
                                                            Germany
                                                        </td>
                                                        <td>
                                                            07/15/2018
                                                        </td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <footer class="footer">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-sm-6">
                                2024 © BisleriumBlog.
                            </div>
                            <div class="col-sm-6">
                                <div class="text-sm-right d-none d-sm-block">
                                    Design & Develop by Hero Devs
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>

            





        </div>
        <div class="menu-overlay"></div>
        </>


        
    )
}

export default AdminDashboard