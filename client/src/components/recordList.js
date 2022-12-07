import React, { useEffect, useState } from "react";
import Graph from "./Graph";
import Record from "./Record";

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [income, setIncome] = useState("");
  const [saving, setSaving] = useState("");

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:8080/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:8080/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  function calculateTotal(arr) {
    let total = 0;
    arr.forEach((record) => (total += Number(record.amount)));
    return total;
  }
  const totalExpenditure = calculateTotal(records);

  console.log("totalExpenditure: ", totalExpenditure);

  function calculateSaving(e) {
    e.preventDefault();
    setSaving(Number(income) - totalExpenditure);
  }

  // This following section will display the table with the records of individuals.
  return (
    <div className="grid grid-cols-2 divide-x m-3">
      <div>
        <h3 className="text-center text-green-700">List of Expenses</h3>

        <table className="table table-striped" style={{ marginTop: 14 }}>
          <thead className="bg-green-700 text-white">
            <tr>
              <th>Description of Item</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{recordList()}</tbody>
        </table>
      </div>
      <div>
        <Graph records={records} />
      </div>
      {/* {console.log("totalexpenditure: ", totalExpenditure)}
      {console.log("records : ", typeof records[0].amount)} */}
      <div className="text-center">
        {" "}
        <form>
          <div>
            <div className="text-3xl text-green-700">Savings Calculator</div>
            <label htmlFor="income" className="text-green-700 text-xl">
              Enter Your Monthly Income ($)
            </label>
            <input
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="m-4 shadow appearance-none border rounded w-54 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="$"
            />
          </div>
          <button onClick={calculateSaving} className="text-green-700">
            Calculate Your Saving
          </button>
          <div className="text-xl">
            {" "}
            {saving ? (
              <div>Your Saving this Month is ${saving.toFixed(2)}</div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
