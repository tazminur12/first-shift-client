import { useQuery } from "@tanstack/react-query";
import { startOfDay, startOfWeek, startOfMonth, startOfYear, isAfter } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaMoneyBillWave, FaWallet, FaClock, FaChartLine, FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaCalendar } from 'react-icons/fa';

const MyEarnings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const email = user?.email;

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["completedDeliveries", email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/completed-parcels?email=${email}`);
            return res.data;
        },
    });

    const calculateEarning = (parcel) => {
        const cost = Number(parcel.cost);
        return parcel.sender_center === parcel.receiver_center ? cost * 0.8 : cost * 0.3;
    };

    // Filtered earnings
    const now = new Date();
    const todayStart = startOfDay(now);
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const monthStart = startOfMonth(now);
    const yearStart = startOfYear(now);

    let total = 0,
        totalCashedOut = 0,
        totalPending = 0,
        today = 0,
        week = 0,
        month = 0,
        year = 0;

    parcels.forEach((p) => {
        const earning = calculateEarning(p);
        const deliveredAt = new Date(p.delivered_at);
        total += earning;
        if (p.cashout_status === "cashed_out") totalCashedOut += earning;
        else totalPending += earning;

        if (isAfter(deliveredAt, todayStart)) today += earning;
        if (isAfter(deliveredAt, weekStart)) week += earning;
        if (isAfter(deliveredAt, monthStart)) month += earning;
        if (isAfter(deliveredAt, yearStart)) year += earning;
    });

    const StatCard = ({ title, value, icon: Icon, color, bgColor, delay = 0 }) => (
        <div 
            className={`${bgColor} p-6 rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-500 hover:scale-105 hover:shadow-xl`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                    <Icon className={`text-2xl ${color}`} />
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                </div>
            </div>
            <p className={`text-3xl font-bold ${color} mb-2`}>৳{value.toFixed(2)}</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                    className={`h-2 rounded-full ${color} transition-all duration-1000 ease-out`}
                    style={{ width: `${Math.min((value / Math.max(total, 1)) * 100, 100)}%` }}
                ></div>
            </div>
        </div>
    );

    const TimeCard = ({ title, value, icon: Icon, period }) => (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="text-xl text-blue-600" />
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {period}
                </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-800">৳{value.toFixed(2)}</p>
        </div>
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded-lg w-64 mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-32 bg-gray-300 rounded-2xl"></div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-24 bg-gray-300 rounded-xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">My Earnings Dashboard</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Track your delivery earnings, cashouts, and performance across different time periods
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
                </div>

                {/* Main Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Earnings"
                        value={total}
                        icon={FaMoneyBillWave}
                        color="text-green-600"
                        bgColor="bg-white"
                        delay={0}
                    />
                    <StatCard
                        title="Cashed Out"
                        value={totalCashedOut}
                        icon={FaWallet}
                        color="text-blue-600"
                        bgColor="bg-white"
                        delay={100}
                    />
                    <StatCard
                        title="Pending"
                        value={totalPending}
                        icon={FaClock}
                        color="text-yellow-600"
                        bgColor="bg-white"
                        delay={200}
                    />
                </div>

                {/* Time Period Cards */}
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Earnings by Time Period</h2>
                        <p className="text-gray-600">Your earnings breakdown across different time frames</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <TimeCard
                            title="Today"
                            value={today}
                            icon={FaCalendarDay}
                            period="24h"
                        />
                        <TimeCard
                            title="This Week"
                            value={week}
                            icon={FaCalendarWeek}
                            period="7d"
                        />
                        <TimeCard
                            title="This Month"
                            value={month}
                            icon={FaCalendarAlt}
                            period="30d"
                        />
                        <TimeCard
                            title="This Year"
                            value={year}
                            icon={FaCalendar}
                            period="365d"
                        />
                    </div>
                </div>

                {/* Summary Section */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-6">
                        <FaChartLine className="text-2xl text-blue-600 mr-3" />
                        <h3 className="text-xl font-bold text-gray-800">Performance Summary</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Total Deliveries</span>
                                <span className="font-bold text-gray-800">{parcels.length}</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Average per Delivery</span>
                                <span className="font-bold text-gray-800">
                                    ৳{parcels.length > 0 ? (total / parcels.length).toFixed(2) : '0.00'}
                                </span>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Cashout Rate</span>
                                <span className="font-bold text-gray-800">
                                    {total > 0 ? ((totalCashedOut / total) * 100).toFixed(1) : '0'}%
                                </span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">Pending Rate</span>
                                <span className="font-bold text-gray-800">
                                    {total > 0 ? ((totalPending / total) * 100).toFixed(1) : '0'}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyEarnings;