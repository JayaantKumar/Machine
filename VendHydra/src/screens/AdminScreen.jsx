import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Safe access to API_URL
const API_URL = (import.meta && import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:3000/api';

const AdminScreen = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0 });

  const [newAd, setNewAd] = useState({ 
    mediaUrl: '', 
    mediaType: 'image', 
    duration: 10, 
    machineId: 'ALL' 
  });

  // ✅ ADD — Vendor form state
  const [vendorForm, setVendorForm] = useState({
    vendorId: '',
    name: '',
    machineId: '',
    cashfreeVendorId: ''
  });

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); 
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders`);
      setOrders(res.data);
      calculateStats(res.data);
    } catch (err) {
      console.error("Admin fetch error", err);
    }
  };

  const calculateStats = (data) => {
    const revenue = data.reduce((acc, order) => 
      order.status === 'COMPLETED' || order.status === 'PAID' ? acc + order.totalAmount : acc, 0);
    setStats({ totalRevenue: revenue, totalOrders: data.length });
  };

  // ✅ ADD — Vendor handlers
  const handleVendorChange = e => setVendorForm({ ...vendorForm, [e.target.name]: e.target.value });

  const submitVendor = async () => {
    try {
      await axios.post(`${API_URL}/admin/vendors`, vendorForm);
      alert('Vendor linked successfully');
      setVendorForm({ vendorId:'', name:'', machineId:'', cashfreeVendorId:'' });
    } catch (err) {
      alert(err.response?.data?.error || 'Error linking vendor');
    }
  };

  const handleAddAd = async () => {
    if (!newAd.mediaUrl) return alert("Please enter a URL");
    try {
      await axios.post(`${API_URL}/promotions`, newAd);
      alert('Ad Added Successfully!');
      setNewAd({ mediaUrl: '', mediaType: 'image', duration: 10, machineId: 'ALL' }); 
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      alert(`Failed to add ad. Error: ${errorMessage}`);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'COMPLETED': return 'text-green-500';
      case 'PAID': return 'text-blue-500';
      case 'PENDING': return 'text-yellow-500';
      case 'FAILED': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
      <div className="p-6 bg-gray-800 shadow-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold">VendHydra Admin</h1>
        <div className="flex gap-6 text-xl">
          <div>Revenue: <span className="text-primary font-bold">₹{stats.totalRevenue}</span></div>
          <div>Orders: <span className="font-bold">{stats.totalOrders}</span></div>
        </div>
      </div>

      <main className="flex-1 p-8 overflow-y-auto">

        {/* ✅ ADD — Vendor Mapping Panel */}
        <div className="bg-gray-800 p-6 rounded-xl mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-primary">Link Machine to Vendor</h2>
          <div className="grid grid-cols-2 gap-4">
            <input className="p-3 rounded bg-gray-700 border border-gray-600" placeholder="Vendor ID" name="vendorId" value={vendorForm.vendorId} onChange={handleVendorChange}/>
            <input className="p-3 rounded bg-gray-700 border border-gray-600" placeholder="Vendor Name" name="name" value={vendorForm.name} onChange={handleVendorChange}/>
            <input className="p-3 rounded bg-gray-700 border border-gray-600" placeholder="Machine ID" name="machineId" value={vendorForm.machineId} onChange={handleVendorChange}/>
            <input className="p-3 rounded bg-gray-700 border border-gray-600" placeholder="Cashfree Vendor ID" name="cashfreeVendorId" value={vendorForm.cashfreeVendorId} onChange={handleVendorChange}/>
          </div>
          <button onClick={submitVendor} className="mt-4 bg-primary hover:bg-green-600 text-white px-8 py-2 rounded font-bold shadow-lg">
            Save Vendor Mapping
          </button>
        </div>

        {/* Existing Ad Upload */}
        <div className="bg-gray-800 p-6 rounded-xl mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-primary">Upload Screensaver Ad</h2>
          <div className="flex flex-col gap-4">
            <input 
              className="p-3 rounded bg-gray-700 text-white w-full border border-gray-600"
              placeholder="Paste URL (Image or Video)..."
              value={newAd.mediaUrl}
              onChange={e => setNewAd({...newAd, mediaUrl: e.target.value})}
            />
            <div className="flex gap-4">
              <select value={newAd.mediaType} onChange={e => setNewAd({...newAd, mediaType: e.target.value})} className="p-3 rounded bg-gray-700">
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>

              <select value={newAd.machineId} onChange={e => setNewAd({...newAd, machineId: e.target.value})} className="p-3 rounded bg-gray-700 flex-1">
                <option value="ALL">All Machines</option>
                <option value="vm_001">Machine 001 (Gym)</option>
                <option value="vm_002">Machine 002 (Mall)</option>
              </select>

              <input type="number" value={newAd.duration} onChange={e => setNewAd({...newAd, duration: parseInt(e.target.value)})} className="p-3 w-20 rounded bg-gray-700 text-center"/>

              <button onClick={handleAddAd} className="bg-primary px-8 py-2 rounded font-bold ml-auto">Add Ad</button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 bg-gray-900/50">
                <th className="p-4">Order ID</th>
                <th className="p-4">Product</th>
                <th className="p-4">Slot</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.orderId} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="p-4 font-mono text-sm">{order.orderId}</td>
                  <td className="p-4">{order.items?.[0]?.name}</td>
                  <td className="p-4">{order.items?.[0]?.slot}</td>
                  <td className="p-4 text-primary font-bold">₹{order.totalAmount || order.price}</td>
                  <td className={`p-4 font-bold ${getStatusColor(order.status)}`}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
};

export default AdminScreen;