import React from "react";
import { Bar } from "react-chartjs-2";

export const TodoChart = ({ board }) => {
  const getChecklistData = () => {
    let todos = 0;
    let doneTodos = 0;
    let checklists = 0;
    let doneChecklists = 0;
    board?.groups.forEach((group) => {
      if (!group?.tasks.length) {
        return;
      }
      group.tasks.forEach((task) => {
        if (task.checklists) {
          checklists += task.checklists.length;
          task.checklists.forEach((checklist) => {
            let inTodos = checklist.todos.length;
            let inDoneTodos = 0;
            todos += checklist.todos.length;
            checklist.todos.forEach((todo) => {
              if (todo.isDone) {
                doneTodos += 1;
                inDoneTodos += 1;
              }
            });
            console.log(inTodos, inDoneTodos);
            if (inTodos === inDoneTodos) doneChecklists += 1;
          });
        }
      });
    });
    return [
      [todos, doneTodos],
      [checklists, doneChecklists],
    ];
  };
  const totalData = getChecklistData();
  const data = {
    labels: ["Total", "Completed"],
    datasets: [
      {
        label: "Amount",
        data: [...totalData[1]],
        backgroundColor: ["#c277e0", "#61bd4f"],
        borderColor: ["#c277e0", "darkgreen"],
        borderWidth: 1,
      },
    ],
  };
  const data2 = {
    labels: ["Total", "Completed"],
    datasets: [
      {
        label: "Amount",
        data: [...totalData[0]],
        backgroundColor: ["#f2d600", "#b3bac5"],
        borderColor: ["#f2d600", "#b3bac5"],
        borderWidth: 1,
      },
    ],
  };

  const options1 = {
    indexAxis: "y",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Checklist Stats:",
        color: "rgba(255, 255, 255, 0.897)",
        font: {
          size: "30",
          family: "Segoe UI",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 0.897)",
          font: {
            family: "Segoe UI",
            size: 15,
          },
        },
      },
      y: {
        ticks: {
          color: "rgba(255, 255, 255, 0.897)",
          font: {
            family: "Segoe UI",
            size: 15,
          },
        },
      },
    },
    grid: {
      color: "rgba(255, 255, 255, 0.897)",
    },
  };
  const options2 = {
    indexAxis: "x",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Todo Stats:",
        color: "rgba(255, 255, 255, 0.897)",
        font: {
          size: 30,
          family: "Segoe UI",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 0.897)",
          font: {
            family: "Segoe UI",
            size: 15,
          },
        },
      },
      y: {
        ticks: {
          color: "rgba(255, 255, 255, 0.897)",
          font: {
            family: "Segoe UI",
            size: 15,
          },
        },
      },
    },
    grid: {
      color: "rgba(255, 255, 255, 0.897)",
    },
  };
  return (
    <div className="chart-todo">
      <div className="chart-1">
        <Bar data={data} options={options1} width={250} height={150}/>
        <Bar data={data2} options={options2} width={300} height={300} />
      </div>
    </div>
  );
};
