import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newExpense = { ...form };

    await fetch("http://localhost:8080/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpense),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ description: "", amount: "", category: "" });
    navigate("/");
  }

  const arrayOfCategories = [
    "Bills",
    "Subscription",
    "Entertainment",
    "Food&Drinks",
    "Grocery",
    "Health&Wellbeing",
    "Shopping",
    "Transportation",
    "Car",
    "Stocks&Saving",
    "Pet",
    "Misc",
  ];
  // This following section will display the form that takes the input from the user.
  return (
    <div className="m-14">
      <h3>Create New Expense</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            placeholder="$"
            className="form-control"
            id="amount"
            datatype="currency"
            value={form.amount}
            onChange={(e) => updateForm({ amount: e.target.value })}
          />
        </div>

        {arrayOfCategories.map((category) => {
          return (
            <div className="form-group">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="expenseOptions"
                  id={category}
                  value={category}
                  checked={form.category === category}
                  onChange={(e) => updateForm({ category: e.target.value })}
                />
                <label htmlFor={category} className="form-check-label">
                  {category}
                </label>
              </div>
            </div>
          );
        })}

        <div className="form-group">
          <input
            type="submit"
            value="Create Expense"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          />
        </div>
      </form>
    </div>
  );
}
