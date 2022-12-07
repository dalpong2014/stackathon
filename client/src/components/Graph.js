import React, { useState } from "react";
import { ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { NavLink } from "react-router-dom";
import save from "./img/save.png";

Chart.register(ArcElement);

export default function Graph(props) {
  const records = props.records;
  const [chart, setChart] = useState(true);
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
    return { resultArray: resultArray, expenseObj: expenseObj };
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

  const totalAmount = calculateTotal(accumulatedExpenses.resultArray);

  const backgroundColorArray = [
    "rgb(253, 127, 111)",
    "rgb(126, 176, 213)",
    "rgb(178, 224, 97)",
    "rgb(189, 126, 190)",
    "rgb(255, 181, 90)",
    "rgb(255, 238, 101)",
    "rgb(253, 204, 229)",
    "rgb(255, 223, 211)",
    "rgb(70, 149, 151)",
    "rgb(136,138,138)",
    "rgb(209,5,42)",
    "rgb(238,246,176)",
  ];

  const DoughnutConfig = {
    data: {
      datasets: [
        {
          data: accumulatedExpenses.resultArray,
          backgroundColor: backgroundColorArray,
          hoverOffset: 4,
          borderRadius: 30,
        },
      ],
    },
    options: {
      cutout: 100,
    },
  };

  console.log(accumulatedExpenses.expenseObj);

  function makeList(obj) {
    const listOfCategories = [];
    for (let key in obj) {
      listOfCategories.push(key);
    }
    return listOfCategories;
  }
  const listForBar = makeList(accumulatedExpenses.expenseObj);

  const BarConfig = {
    data: {
      labels: listForBar,
      datasets: [
        {
          data: accumulatedExpenses.resultArray,
          backgroundColor: backgroundColorArray,
          borderColor: backgroundColorArray,
          borderWidth: 3,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };

  return (
    <div>
      <nav className="flex flex-row justify-evenly">
        <button onClick={() => setChart(true)} className="m-4">
          Doughnut Chart 🍩
        </button>
        <button onClick={() => setChart(false)}>Bar Chart 🍫</button>
      </nav>
      {chart ? (
        <div>
          <div className="text-center text-xl m-3">Doughnut Chart</div>
          <div className="flex justify-content max-w-xs mx-auto">
            <div className="item">
              <div className="chart relative text-center">
                <Doughnut {...DoughnutConfig}></Doughnut>
                <h3 className="mb-4 font-bold m-2">
                  Total Expenditure
                  <span className="block text-3xl text-red-500">
                    ${totalAmount.toFixed(2)}
                  </span>
                </h3>
                <div className="text-left">
                  {accumulatedExpenses.expenseObj
                    ? Object.keys(accumulatedExpenses.expenseObj).map(
                        (key, index) => {
                          return (
                            <div key={index}>
                              <span className=" flex flex-row">
                                <div
                                  className="w-4 h-1 rounded py-3"
                                  style={{
                                    background: backgroundColorArray[index],
                                  }}
                                ></div>
                                <div className="m-1">
                                  {key} : $
                                  {accumulatedExpenses.expenseObj[key].toFixed(
                                    2
                                  )}
                                </div>
                              </span>
                            </div>
                          );
                        }
                      )
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className="text-center text-xl m-5">Bar Chart</div>
            <div>
              <div>
                <div>
                  <Bar {...BarConfig}></Bar>
                  <h3 className="mb-4 font-bold title text-center">
                    Total Expenditure
                    <span className="block text-3xl text-red-500">
                      ${totalAmount}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="m-4 flex flex-row-reverse">
        <NavLink className="no-underline text-green-600" to="/date">
          <img src={save} alt="" className="h-4"></img>
          Save Your Expenditure for this month
        </NavLink>
      </div>
    </div>
  );
}
