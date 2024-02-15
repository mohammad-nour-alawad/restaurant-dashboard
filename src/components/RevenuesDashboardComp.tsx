import React, { useEffect, useMemo, useState } from 'react';
import { getOrders } from '../services/orderService';
import { CartProduct, Order } from '../models/order';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, ArcElement, ChartData } from 'chart.js';

import 'bootstrap/dist/css/bootstrap.min.css';

ChartJS.register(CategoryScale, BarElement, LinearScale, PointElement, Title, Tooltip, Legend, ArcElement);


const RevenuesDashboardComp = () => {

  const [orders, serOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{key: string; direction: string} | null>(null)

  const [barChartData, setBarChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: []
  });

  const [pieChartData, setPieChartData] = useState<ChartData<'pie'>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchOrders = async () => {
      const ords = await getOrders();
      serOrders(ords);
      processChartData(ords);
    };
    fetchOrders();

  }, []);


  const processChartData = (orders: Order[]) => {
    const revenuesByDate: { [key: string]: number } = {};
    const productQuantities: { [key: string]: number } = {};

    orders.forEach((order) => {

      console.log(order.date);
      const date = new Date(order.date).toLocaleDateString();
      revenuesByDate[date] = (revenuesByDate[date] || 0) + order.total;

      order.products.forEach((cardProd: CartProduct) => {
        productQuantities[cardProd.product.name] = (productQuantities[cardProd.product.name] || 0) + cardProd.quantity;
      });
    })

    const sortedDates = Object.keys(revenuesByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    setBarChartData({
      labels: sortedDates,
      datasets: [
        {
          label: 'Revenue',
          data: sortedDates.map(date => revenuesByDate[date]),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    });

    const pieChartLabels = Object.keys(productQuantities);
    setPieChartData({
      labels: pieChartLabels,
      datasets: [
        {
          label: 'Product Quantity',
          data: pieChartLabels.map(label => productQuantities[label]),
          backgroundColor: pieChartLabels.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`), // random colors for each product
          hoverOffset: 4
        }
      ]
    });
  };

  
const sortedAndFilteredOrders = useMemo(() => {
  let filteredOrders = orders;

  if (searchTerm) {
    filteredOrders = orders.filter(order =>
      order.products.some(p => 
        p.product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  if (!sortConfig) return filteredOrders;

  return [...filteredOrders].sort((a, b) => {
    // For sorting dates, convert them to timestamps
    if (sortConfig.key === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return (sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA);
    }

    // For sorting numbers (like total)
    if (sortConfig.key === 'total') {
      return (sortConfig.direction === 'ascending' ? a.total - b.total : b.total - a.total);
    }

    return 0;
  });
}, [orders, searchTerm, sortConfig]);

  // Sort function
  const requestSort = (key :string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-6 mb-4">
          <div className="chart-container">
            <Bar data={barChartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: { y: { beginAtZero: true } }
            }} />
          </div>
        </div>
        <div className="col-12 col-lg-6 mb-4">
          <div className="chart-container">
            <Pie data={pieChartData} options={{
              responsive: true,
              maintainAspectRatio: false
            }} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="table-responsive">
            <h2>Order History</h2><input
              type="text"
              className="form-control mb-3"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                <th>
                  <button onClick={() => requestSort('date')} className="sort-button">
                    Date {sortConfig?.key === 'date' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                  </button>
                </th>
                <th>
                  <button onClick={() => requestSort('total')} className="sort-button">
                    Total {sortConfig?.key === 'total' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                  </button>
                </th>
                  <th>Products</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {sortedAndFilteredOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>{order.total.toFixed(2)}</td>
                    <td>{order.products.map(p => p.product.name).join(', ')}</td>
                    <td>{order.products.map(p => p.quantity).join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  );
};

export default RevenuesDashboardComp;
