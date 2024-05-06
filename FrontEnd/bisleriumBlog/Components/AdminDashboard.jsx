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