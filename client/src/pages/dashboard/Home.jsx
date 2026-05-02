import React, { useEffect, useState } from "react";
import DasbhoardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../utils/helper";
import InfoCard from "../../components/cards/InfoCard";
import PageLoader from "../../components/PageLoader";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import FinanceOverview from "../../components/dashboard/FinanceOverview";
import { IoMdCard } from "react-icons/io";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/dashboard/RecentIncome";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      ccnsole.log("Something went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboardData();
    return;
  }, []);
  if (!dashboardData) {
    return <PageLoader title="Loading." />;
  }
  return (
    <DasbhoardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 align-center">
          <InfoCard
            icon={
              <GiTakeMyMoney className="text-white bg-deep rounded-full p-1 h-10 w-10" />
            }
            label="Total Balance"
            value={formatNumber(dashboardData.totalBalance)}
          />
          <InfoCard
            icon={
              <GiReceiveMoney className="text-white bg-deep rounded-full p-1 h-10 w-10" />
            }
            label="Total Income"
            value={formatNumber(dashboardData.totalIncome)}
          />
          <InfoCard
            icon={
              <GiPayMoney className="text-white bg-deep rounded-full p-1 h-10 w-10" />
            }
            label="Total Expense"
            value={formatNumber(dashboardData.totalExpense)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:justify-items-end gap-x-5">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance}
            totalIncome={dashboardData?.totalIncome}
            totalExpense={dashboardData?.totalExpense}
          />
          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpense?.transactions}
            onSeeMore={() => navigate("/expense")}
          />
          <Last30DaysExpenses
            transactions={dashboardData?.last30DaysExpense?.transactions}
          />
          <RecentIncomeWithChart
            transactions={dashboardData?.last60DaysIncome?.transactions}
          />
          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DasbhoardLayout>
  );
}
