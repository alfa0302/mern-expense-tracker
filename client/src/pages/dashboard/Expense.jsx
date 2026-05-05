import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpenseOverview from "../../components/expense/ExpenseOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/expense/AddExpenseForm";
import ExpenseList from "../../components/expense/ExpenseList";
import toast from "react-hot-toast";

export default function Expense() {
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    source: "",
    amount: 0,
    date: "",
    icon: "",
  });
  const [error, setError] = useState(null);
  const fetchExpenseData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE,
      );
      setExpenseData(response.data.allExpense);
    } catch (error) {
      console.log(error, "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const addExpenseData = async (expense) => {
    if (!expense.source || !expense.amount || !expense.date) {
      return setError("All fields are required");
    }
    try {
      const response = await axiosInstance.post(
        API_PATHS.EXPENSE.ADD_EXPENSE,
        expense,
      );
      fetchExpenseData();
      setFormData({
        source: "",
        amount: 0,
        date: "",
        icon: "",
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
    } catch (error) {
      console.log(error, "Something went wrong");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addExpenseData(formData);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const deleteExpenseData = async (id) => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.EXPENSE.DELETE_EXPENSE(id),
      );
      fetchExpenseData();
      toast.success("Expense Successfully Deleted");
    } catch (error) {
      console.log(error, "Something went wrong");
    }
  };
  const downloadExpenseData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        { responseType: "blob" },
      );
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "expense_details.xlsx";
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Expense data downloaded.");
    } catch (error) {
      console.log(error, "Something went wrong");
    }
  };
  useEffect(() => {
    fetchExpenseData();
  }, []);
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="mx-auto mb-10">
        <div className="grid grid-cols-1 gap-6">
          <ExpenseOverview
            transactions={expenseData}
            addExpense={() => setOpenAddExpenseModal(true)}
          />
        </div>
        <ExpenseList
          transactions={expenseData}
          onDelete={(id) => deleteExpenseData(id)}
          onDownload={downloadExpenseData}
        />
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm
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
