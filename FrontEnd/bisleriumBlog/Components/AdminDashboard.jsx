import React, { useContext, useEffect , useState } from 'react';
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
import AdminNavs from './AdminNavs';
import Charts from './Charts';



function AdminDashboard() {
    const [topBlogs, setTopBlogs] = useState([]);

    useEffect(() => {
        const fetchTopBlogs = async () => {
            try {
                const response = await axios.get(`https://localhost:7094/api/Admin/PopularMonthBlog?year=${2024}&month=${5}`);
                console.log(response);
                setTopBlogs(response.data.result.top10Blog);
            } catch (error) {
                console.error('Error fetching top blogs:', error);
            }
        };

        fetchTopBlogs();
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
                        <AdminNavs></AdminNavs>
                        <div class="row">
                        <Charts></Charts>

                    </div>
                        <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">

                                        <h4 class="card-title">Top 10 Blogs</h4>
                                        <div class="table-responsive">
                                            <table className="table table-centered table-striped table-nowrap mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>User</th>
                                                        <th>Email</th>
                                                        <th>Blog Title</th>
                                                        <th>Create Date</th>
                                                        <th>Popularity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {topBlogs.map(blog => (
                                                        <tr key={blog.id}>
                                                            <td className="table-user">
                                                                <a className="text-body font-weight-semibold">{blog.user}</a>
                                                            </td>
                                                            <td>{blog.userEmail}</td>
                                                            <td>{blog.title}</td>
                                                            <td>{blog.createdAt}</td>
                                                            <td>{blog.blogPopularity}</td>
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