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
                const data = response.data.result.allTimeData;
                console.log(data)

                setChartData(data);
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchChartData();
    }, []);

    useEffect(() => {
        if (chartData) {
            destroyChartInstances();
            renderCharts();
        }
    }, [chartData]);

    const destroyChartInstances = () => {
        Object.values(chartInstances).forEach(chartInstance => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        });
    };

    const renderCharts = () => {
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
                    data: chartData ? chartData.monthSpecificData : [],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        });
        const barChartInstance = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Category1', 'Category2', 'Category3', 'Category4', 'Category5'],
                datasets: [{
                    label: 'Total Categories',
                    data: chartData ? chartData.allTimeData : [],
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
        });
        const areaChartInstance = new Chart(areaCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Sales',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1
                }]
            }
        });
        const pieChartInstance = new Chart(pieCtx, {
            type: 'pie',
            data: {
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
        });

        setChartInstances({
            lineChartInstance,
            barChartInstance,
            areaChartInstance,
            pieChartInstance
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
