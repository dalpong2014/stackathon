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

  // This following section will display the form that takes the input from the user.
  return (
    <div>
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

        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="expenseOptions"
              id="housing"
              value="Housing"
              checked={form.category === "Housing"}
              onChange={(e) => updateForm({ category: e.target.value })}
            />
            <label htmlFor="housing" className="form-check-label">
              Housing
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="expenseOptions"
              id="transportation"
              value="Transportation"
              checked={form.category === "Transportation"}
              onChange={(e) => updateForm({ category: e.target.value })}
            />
            <label htmlFor="transportation" className="form-check-label">
              Transportation
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="expenseOptions"
              id="food"
              value="Food"
              checked={form.category === "Food"}
              onChange={(e) => updateForm({ category: e.target.value })}
            />
            <label htmlFor="food" className="form-check-label">
              Food
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="expenseOptions"
              id="utilities"
              value="Utilities"
              checked={form.category === "Utilities"}
              onChange={(e) => updateForm({ category: e.target.value })}
            />
            <label htmlFor="utilities" className="form-check-label">
              Utilities
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="expenseOptions"
              id="clothing"
              value="Clothing"
              checked={form.category === "Clothing"}
              onChange={(e) => updateForm({ category: e.target.value })}
            />
            <label htmlFor="clothing" className="form-check-label">
              Clothing
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="expenseOptions"
              id="insurance"
              value="Insurance"
              checked={form.category === "Insurance"}
              onChange={(e) => updateForm({ category: e.target.value })}
            />
            <label htmlFor="insurance" className="form-check-label">
              Insurance
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="expenseOptions"
              id="misc"
              value="Misc"
              checked={form.category === "Misc"}
              onChange={(e) => updateForm({ category: e.target.value })}
            />
            <label htmlFor="Misc" className="form-check-label">
              Misc
            </label>
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Expense"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
