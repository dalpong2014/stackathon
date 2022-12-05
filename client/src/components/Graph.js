import React from "react";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement);

export default function graph(props) {
  const records = props.records;
  console.log("records in graph : ", records);
  function makeArray(array) {
    const expenseObj = {};
    array.forEach((record) => {
      if (!expenseObj[record.category]) {
        expenseObj[record.category] = Number(record.amount);
      } else {
        expenseObj[record.category] += Number(record.amount);
      }
    });
    const resultArray = [];
    for (let key in expenseObj) {
      resultArray.push(expenseObj[key]);
    }
    return resultArray;
  }
  //console.log(makeArray(records));
  const accumulatedExpenses = makeArray(records);

  function calculateTotal(array) {
    let result = 0;
    array.forEach((record) => {
      result += record;
    });
    return result;
  }

  const totalAmount = calculateTotal(accumulatedExpenses);

  const config = {
    data: {
      datasets: [
        {
          label: "My Expenses",
          data: accumulatedExpenses,
          backgroundColor: [
            "rgb(253, 127, 111)",
            "rgb(126, 176, 213)",
            "rgb(178, 224, 97)",
            "rgb(189, 126, 190)",
            "rgb(255, 181, 90)",
            "rgb(255, 238, 101)",
            "rgb(253, 204, 229)",
          ],
          hoverOffset: 4,
          borderRadius: 30,
        },
      ],
    },
    options: {
      cutout: 100,
    },
  };

  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative text-center m-20">
          <Doughnut {...config}></Doughnut>
          <h3 className="mb-4 font-bold title">
            Total
            <span className="block text-3xl text-emerald-400">
              ${totalAmount}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}
