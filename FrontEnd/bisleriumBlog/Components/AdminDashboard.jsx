import React, { useContext } from 'react'
import Layout from './Layout'
import '../style/AdminDashboard/css/bootstrap.css';
import '../style/AdminDashboard/css/bootstrap.min.css';
import '../style/AdminDashboard/css/theme.css';
import '../style/AdminDashboard/css/theme.min.css';
import myContext from "../context/myContext";
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    const context = useContext(myContext);
    const { mode } = context;
    return (
        <Layout>
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
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="mdi mdi-plus"></i> Create New
                                <i class="mdi mdi-chevron-down d-none d-sm-inline-block"></i>
                            </button>
                            <div class="dropdown-menu">
                                <a href="javascript:void(0);" class="dropdown-item notify-item">
                                    Application
                                </a>
                                <a href="javascript:void(0);" class="dropdown-item notify-item">
                                    Software
                                </a>
                                <a href="javascript:void(0);" class="dropdown-item notify-item">
                                    EMS System
                                </a>
                                <a href="javascript:void(0);" class="dropdown-item notify-item">
                                    CRM App
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex align-items-center">

                        <div class="dropdown d-none d-sm-inline-block ml-2">
                            <button type="button" class="btn header-item noti-icon waves-effect"
                                id="page-header-search-dropdown" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <i class="mdi mdi-magnify"></i>
                            </button>
                            
                        </div>
                        <div class="dropdown d-inline-block ml-2">
                            <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item d-flex align-items-center justify-content-between"
                                    href="javascript:void(0)">
                                    <span>Inbox</span>
                                    <span>
                                        <span class="badge badge-pill badge-info">3</span>
                                    </span>
                                </a>
                                <a class="dropdown-item d-flex align-items-center justify-content-between"
                                    href="javascript:void(0)">
                                    <span>Profile</span>
                                    <span>
                                        <span class="badge badge-pill badge-warning">1</span>
                                    </span>
                                </a>
                                <a class="dropdown-item d-flex align-items-center justify-content-between"
                                    href="javascript:void(0)">
                                    Settings
                                </a>
                                <a class="dropdown-item d-flex align-items-center justify-content-between"
                                    href="javascript:void(0)">
                                    <span>Lock Account</span>
                                </a>
                                <a class="dropdown-item d-flex align-items-center justify-content-between"
                                    href="javascript:void(0)">
                                    <span>Log Out</span>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </header>
            <div class="vertical-menu">

                <div data-simplebar class="h-100">

                    <div class="navbar-brand-box">
                        <a href="index.html" class="logo">
                            <i class="mdi mdi-album"></i>
                            <span>
                                Xeloro
                            </span>
                        </a>
                    </div>

                   
                    <div id="sidebar-menu">
                        <ul class="metismenu list-unStyled" id="side-menu">
                            <li class="menu-title">Menu</li>

                            <li>
                                <a href="index.html" class="waves-effect"><i class="mdi mdi-home-analytics"></i><span
                                        class="badge badge-pill badge-primary float-right">7</span><span>Dashboard</span></a>
                            </li>

                            <li>
                                <a href="javascript: void(0);" class="has-arrow waves-effect"><i
                                        class="mdi mdi-diamond-stone"></i><span>UI Elements</span></a>
                                
                            </li>

                            <li>
                                <a href="javascript: void(0);" class="has-arrow waves-effect"><i
                                        class="mdi mdi-table-merge-cells"></i><span>Tables</span></a>
                               
                            </li>

                            <li>
                                <a href="javascript: void(0);" class="has-arrow waves-effect"><i
                                        class="mdi mdi-poll"></i><span>Charts</span></a>
                               
                            </li>

                            <li>
                                <a href="javascript: void(0);" class="waves-effect"><i
                                        class="mdi mdi-format-list-bulleted-type"></i><span
                                        class="badge badge-pill badge-danger float-right">6</span><span>Forms</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="forms-elements.html">Elements</a></li>
                                    <li><a href="forms-plugins.html">Plugins</a></li>
                                    <li><a href="forms-validation.html">Validation</a></li>
                                    <li><a href="forms-mask.html">Masks</a></li>
                                    <li><a href="forms-quilljs.html">Quilljs</a></li>
                                    <li><a href="forms-uploads.html">File Uploads</a></li>
                                </ul>
                            </li>

                            <li>
                                <a href="javascript: void(0);" class="has-arrow waves-effect"><i
                                        class="mdi mdi-black-mesa"></i><span>Icons</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="icons-materialdesign.html">Material Design</a></li>
                                    <li><a href="icons-fontawesome.html">Font awesome</a></li>
                                    <li><a href="icons-dripicons.html">Dripicons</a></li>
                                    <li><a href="icons-feather.html">Feather Icons</a></li>
                                </ul>
                            </li>

                            <li class="menu-title">More</li>

                            <li>
                                <a href="javascript: void(0);" class="has-arrow waves-effect"><i
                                        class="mdi mdi-format-page-break"></i><span>Pages</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="pages-invoice.html">Invoice</a></li>
                                    <li><a href="pages-starter.html">Starter Page</a></li>
                                    <li><a href="pages-maintenance.html">Maintenance</a></li>
                                    <li><a href="pages-faqs.html">FAQs</a></li>
                                    <li><a href="pages-pricing.html">Pricing</a></li>
                                    <li><a href="pages-login.html">Login</a></li>
                                    <li><a href="pages-register.html">Register</a></li>
                                    <li><a href="pages-recoverpw.html">Recover Password</a></li>
                                    <li><a href="pages-lock-screen.html">Lock Screen</a></li>
                                    <li><a href="pages-404.html">Error 404</a></li>
                                    <li><a href="pages-500.html">Error 500</a></li>
                                </ul>
                            </li>

                            <li><a href="calendar.html" class=" waves-effect"><i
                                        class="mdi mdi-calendar-range-outline"></i><span>Calendar</span></a></li>

                            <li>
                                <a href="javascript: void(0);" class="has-arrow waves-effect"><i
                                        class="mdi mdi-map-marker-radius"></i><span>Maps</span></a>
                                <ul class="sub-menu" aria-expanded="false">
                                    <li><a href="maps-google.html">Google Maps</a></li>
                                    <li><a href="maps-vector.html">Vector Maps</a></li>
                                </ul>
                            </li>

                            <li>
                                <a href="javascript: void(0);" class="has-arrow waves-effect"><i
                                        class="mdi mdi-share-variant"></i><span>Multi Level</span></a>
                                <ul class="sub-menu" aria-expanded="true">
                                    <li><a href="javascript: void(0);">Level 1.1</a></li>
                                    <li><a href="javascript: void(0);" class="has-arrow">Level 1.2</a>
                                        <ul class="sub-menu" aria-expanded="true">
                                            <li><a href="javascript: void(0);">Level 2.1</a></li>
                                            <li><a href="javascript: void(0);">Level 2.2</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                    
                </div>
            </div>

            <div class="main-content">

                <div class="page-content">
                    <div class="container-fluid">

                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 class="mb-0 font-size-18">Dashboard</h4>

                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Xeloro</a></li>
                                            <li class="breadcrumb-item active">Dashboard</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-9">

                                <div class="card">
                                    <div class="card-body">

                                        <div class="row">
                                            <div class="col-lg-8">
                                                <h4 class="card-title">Sales Analytics</h4>
                                                <p class="card-subtitle mb-4">From date of 1st Jan 2020 to continue</p>
                                                <div id="morris-bar-example" class="morris-chart"></div>
                                            </div>

                                            <div class="col-lg-4">

                                                <h4 class="card-title">Stock</h4>
                                                <p class="card-subtitle mb-4">Recent Stock</p>

                                                <div class="text-center">
                                                    <input data-plugin="knob" data-width="165" data-height="165"/>
                                                    <h5 class="text-muted mt-3">Total sales made today</h5>


                                                    <p class="text-muted w-75 mx-auto sp-line-2">Traditional heading
                                                        elements are
                                                        designed to work best in the meat of your page content.</p>

                                                    <div class="row mt-3">
                                                        <div class="col-6">
                                                            <p class="text-muted font-15 mb-1 text-truncate">Target</p>
                                                            <h4><i class="fas fa-arrow-up text-success mr-1"></i>$7.8k</h4>

                                                        </div>
                                                        <div class="col-6">
                                                            <p class="text-muted font-15 mb-1 text-truncate">Last week</p>
                                                            <h4><i class="fas fa-arrow-down text-danger mr-1"></i>$1.4k</h4>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    
                                </div> 
                            </div> 

                            <div class="col-lg-3">

                                <div class="card">
                                    <div class="card-body">
                                        <div class="row align-items-center">
                                            <div class="col">
                                                <h4 class="card-title">Account Transactions</h4>
                                                <p class="card-subtitle mb-4">Transaction period from 21 July to
                                                    25 Aug</p>
                                                <h3>$7841.12 <span class="badge badge-soft-success float-right">+7.5%</span></h3>
                                            </div>
                                        </div> 

                                        <div id="sparkline1" class="mt-3"></div>
                                    </div>
                                    
                                </div>
                                

                            </div>

                        </div>
                        


                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="dropdown float-right position-relative">
                                            <a href="#" class="dropdown-toggle h4 text-muted" data-toggle="dropdown"
                                                aria-expanded="false">
                                                <i class="mdi mdi-dots-vertical"></i>
                                            </a>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li><a href="#" class="dropdown-item">Action</a></li>
                                                <li><a href="#" class="dropdown-item">Another action</a></li>
                                                <li><a href="#" class="dropdown-item">Something else here</a></li>
                                                <li class="dropdown-divider"></li>
                                                <li><a href="#" class="dropdown-item">Separated link</a></li>
                                            </ul>
                                        </div>
                                        <h4 class="card-title d-inline-block">Total Revenue</h4>

                                        <div id="morris-line-example" class="morris-chart" Style="{{height: 290px;}}"></div>

                                        <div class="row text-center mt-4">
                                            <div class="col-6">
                                                <h4>$7841.12</h4>
                                                <p class="text-muted mb-0">Total Revenue</p>
                                            </div>
                                            <div class="col-6">
                                                <h4>17</h4>
                                                <p class="text-muted mb-0">Open Compaign</p>
                                            </div>
                                        </div>

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
                                2020 © Xeloro.
                            </div>
                            <div class="col-sm-6">
                                <div class="text-sm-right d-none d-sm-block">
                                    Design & Develop by Myra
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>

        </div>
        <div class="menu-overlay"></div>

        </Layout>
    )
}

export default AdminDashboard