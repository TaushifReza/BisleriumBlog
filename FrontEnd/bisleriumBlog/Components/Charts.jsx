import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import AdminNavs from './AdminNavs';

function Charts() {
    const [chartData, setChartData] = useState(null);
    const [chartInstances, setChartInstances] = useState({});
    

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get('https://localhost:7094/api/Admin/AdminDashboardData');
                const data = response.data.result;
                setChartData(data);
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };
    
        fetchChartData();
    
        return () => {
             // Cleanup function to destroy Chart instances when component unmounts
        };
    }, []);

    

    useEffect(() => {
        if (chartData) {
            console.log(chartData)
           
            renderCharts();
        }
    }, [chartData]);

    
    

    const renderCharts = () => {
        if (!chartData) {
            return; // Exit the function if chartData is null or undefined
        }
    
        const lineCtx = document.getElementById('lineChart').getContext('2d');
        const barCtx = document.getElementById('barChart').getContext('2d');
        const areaCtx = document.getElementById('areaChart').getContext('2d');
        const pieCtx = document.getElementById('pieChart').getContext('2d');
    
        const lineChartInstance = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Blogs',
                    data: [10,20,40,50,10,7,15],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        });
    
        const barChartLabels = ['Blogs', 'Upvotes', 'Downvotes', 'Comments'];
    
        const barChartInstance = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: barChartLabels,
                datasets: [{
                    label: 'Total Categories',
                    data: [chartData.blogCount, chartData.upvotesCount, chartData.downvotesCount, chartData.commentsCount],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });
        
       
    };

    return (
        <div>
            <div className="row">
                <div className="col-xl-6">
                    <div className="card">
                        <div className="card-body" Style="height:400px; width:600px;">
                            <h4 className="card-title" Style="max-height:300px;">Line Chart</h4>
                            <canvas id="lineChart"></canvas>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="card">
                        <div className="card-body" Style="height:400px; width:600px;">
                            <h4 className="card-title">Bar Chart</h4>
                            <canvas id="barChart"></canvas>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="card">
                        <div className="card-body" Style="height:400px; width:600px;">
                            <h4 className="card-title">Area Chart</h4>
                            <canvas id="areaChart"></canvas>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="card">
                        <div className="card-body" Style="height:400px; width:600px;">
                            <h4 className="card-title">Pie Chart</h4>
                            <canvas id="pieChart" Style="max-height:300px;"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Charts;
