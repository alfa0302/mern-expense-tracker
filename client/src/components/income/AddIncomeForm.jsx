import React, { useState } from "react";
import FormInput from "../inputs/FormInput";
import EmojiPickerPopUp from "../inputs/EmojiPickerPopUp";

export default function AddIncomeForm({
  formData,
  setFormData,
  handleChange,
  error,
  onSubmit,
}) {
  return (
    <div className="mt-5">
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <EmojiPickerPopUp
          icon={formData.icon}
          onSelect={(value) =>
            setFormData((prev) => ({
              ...prev,
              icon: value,
            }))
          }
        />
        <FormInput
          type="text"
          name="source"
          placeholder="Freelance, Salary etc"
          value={formData.source}
          onChange={handleChange}
        />
        <FormInput
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <FormInput
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="text-sm btn-primary" type="submit">
          Add Income
        </button>
      </form>
    </div>
  );
}
