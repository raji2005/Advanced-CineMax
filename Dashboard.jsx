import React, { useState } from 'react';
import {
  Users,
  Ticket,
  DollarSign,
  TrendingUp,
  Eye,
  Star,
  AlertCircle
} from 'lucide-react';
import StatCard from '../components/StatCard';
import RevenueChart from '../components/RevenueChart';
import RecentBookings from '../components/RecentBookings';

export default function Dashboard() {
  const stats = [
    {
      icon: Users,
      title: 'Total Users',
      value: '12,458',
      change: 12.5,
      isPositive: true,
      bgColor: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Ticket,
      title: 'Tickets Sold',
      value: '8,234',
      change: 8.2,
      isPositive: true,
      bgColor: 'from-purple-500 to-pink-500'
    },
    {
      icon: DollarSign,
      title: 'Total Revenue',
      value: '$125,430',
      change: 15.3,
      isPositive: true,
      bgColor: 'from-green-500 to-emerald-500'
    },
    {
      icon: Eye,
      title: 'Page Views',
      value: '94,562',
      change: 6.8,
      isPositive: true,
      bgColor: 'from-orange-500 to-red-500'
    },
  ];

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8">📊 Dashboard</h1>
      <p className="text-slate-300 text-lg">Dashboard is loading...</p>
      <div className="mt-8 p-6 bg-slate-800 rounded-lg border border-slate-600">
        <h2 className="text-2xl font-semibold mb-4">Welcome to CineMax!</h2>
        <p className="text-slate-400">Your admin dashboard is ready.</p>
      </div>
    </div>
  );
}