const AdminNavs = () => {
    return (
        <>
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
                                            <h5 class="card-title mb-0">Categories</h5>
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

        </>
        
    )
}

export default AdminNavs