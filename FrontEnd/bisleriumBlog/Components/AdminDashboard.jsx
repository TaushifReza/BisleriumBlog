import React, { useContext } from 'react'
import Layout from './Layout'
import '../style/AdminDashboard/css/bootstrap.css';
import '../style/AdminDashboard/css/bootstrap.min.css';
import '../style/AdminDashboard/css/theme.css';
import '../style/AdminDashboard/css/theme.min.css';
import '../style/AdminDashboard/css/icons.min.css';
import myContext from "../context/myContext";
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
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
                                        class="mdi mdi-diamond-stone"></i><span>UI Elements</span></a>
                                
                            </li>

                            <li>
                                <a href="javascript: void(0);" class="waves-effect"><i
                                        class="mdi mdi-table-merge-cells"></i><span>Tables</span></a>
                               
                            </li>

                            <li>
                                <a href="javascript: void(0);" class="waves-effect"><i
                                        class="mdi mdi-poll"></i><span>Charts</span></a>
                               
                            </li>

                            <li>
                                <a href="javascript: void(0);" class="waves-effect"><i
                                        class="mdi mdi-format-list-bulleted-type"></i><span>Forms</span></a>

                            </li>

                            <li>
                                <a href="javascript: void(0);" class="waves-effect"><i
                                        class="mdi mdi-black-mesa"></i><span>Icons</span></a>
                               
                            </li>

                            <li class="menu-title">More</li>

                            <li>
                                <a href="javascript: void(0);" class="waves-effect"><i
                                        class="mdi mdi-format-page-break"></i><span>Pages</span></a>
                            </li>

                            <li><a href="calendar.html" class=" waves-effect"><i
                                        class="mdi mdi-calendar-range-outline"></i><span>Calendar</span></a></li>
                            <li>
                                <a href="javascript: void(0);" class="waves-effect"><i
                                        class="mdi mdi-map-marker-radius"></i><span>Maps</span></a>
                            </li>
                            <li>
                                <a href="javascript: void(0);" class="waves-effect"><i
                                        class="mdi mdi-share-variant"></i><span>Multi Level</span></a>
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