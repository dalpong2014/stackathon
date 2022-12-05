import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:8080/record/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      description: form.description,
      amount: form.amount,
      category: form.category,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:8080/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount: </label>
          <input
            type="number"
            className="form-control"
            id="position"
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
            <label htmlFor="Clothing" className="form-check-label">
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
            <label htmlFor="misc" className="form-check-label">
              Misc
            </label>
          </div>
        </div>
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
