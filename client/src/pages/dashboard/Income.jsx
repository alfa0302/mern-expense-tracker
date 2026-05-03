import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import toast from "react-hot-toast";

export default function Income() {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [formData, setFormData] = useState({
    source: "",
    amount: 0,
    date: "",
    icon: "",
  });
  const [error, setError] = useState(null);
  const fetchIncomeData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      setIncomeData(response.data);
    } catch (error) {
      console.log(error, "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const addIncomeData = async (income) => {
    if (!income.source || !income.amount || !income.date) {
      return setError("All fields are required");
    }
    try {
      const response = await axiosInstance.post(
        API_PATHS.INCOME.ADD_INCOME,
        income,
      );
      fetchIncomeData();
      setFormData({
        source: "",
        amount: 0,
        date: "",
        icon: "",
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
    } catch (error) {
      console.log(error, "Something went wrong");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addIncomeData(formData);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const deleteIncomeData = async () => {};
  const downloadIncomeData = async () => {
    try {
    } catch (error) {}
  };
  useEffect(() => {
    fetchIncomeData();
  }, []);
  return (
    <DashboardLayout activeMenu="Income">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <IncomeOverview
            transactions={incomeData?.allIncome}
            addIncome={() => setOpenAddIncomeModal(true)}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm
            formData={formData}
            setFormData={setFormData}
            error={error}
            handleChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}
