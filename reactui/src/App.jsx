import { useEffect, useState } from "react";

function App() {
  const [excelData, setExcelData] = useState();
  const [savedData, setSavedData] = useState();
  const [categorys, ___] = useState([
    "Standard Rate Type",
    "Reverse charge",
    "GAT tax",
  ]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:5000/get-excel-data", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.length > 0) {
            setSavedData(data);
          }
        })
        .catch((err) => {
          console.log({ err });
          alert(String(err));
        });
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);
    await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        let add_category = data.map((item) => {
          return { ...item, category: "" };
        });
        setExcelData(add_category);
        // console.log(excelData);
      })
      .catch((err) => {
        // console.log({ err });
        alert(String(err));
      });
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    console.log({ excelData });
    fetch("http://localhost:5000/save-excel-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(excelData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSavedData(data);
        setExcelData(null);
      })
      .catch((err) => {
        console.log({ err });
        alert(String(err));
      });
  };

  return (
    <div>
      <form className="p-5" onSubmit={handleSubmit}>
        <h1 className="text-2xl">Upload a excel file</h1>
        <br />
        <input
          name="file"
          type="file"
          id="name"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
        <button
          type="submit"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Upload
        </button>
      </form>
      {excelData ? (
        <>
          <div className="p-5">
            <div className=" flex flex-row justify-center py-5">
              <h1 className="text-2xl">Excel Data</h1>
            </div>
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 ">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                          >
                            SN
                          </th>

                          {Object.keys(excelData[0]).map((key, i) => (
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                              key={i}
                            >
                              {key}
                            </th>
                          ))}

                          <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {excelData.map((data, i) => (
                          <tr
                            className={`odd:bg-white even:bg-gray-100 ${
                              i % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                            key={i}
                          >
                            <td
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 "
                              key={i}
                            >
                              {i + 1}
                            </td>
                            {Object.values(data).map((value, i) => (
                              <td
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 "
                                key={i}
                              >
                                {value}
                              </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <select
                                name="category"
                                id="category"
                                onChange={(e) => {
                                  let new_data = [...excelData];
                                  new_data[i].category = e.target.value;
                                  setExcelData(new_data);
                                }}
                              >
                                <option disabled selected value="">
                                  Select Category
                                </option>
                                {categorys.map((category, i) => (
                                  <option value={category} key={i}>
                                    {category}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className=" flex flex-row justify-center p-5">
                      <button
                        onClick={handleSubmitData}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <br />
      <br />
      {savedData ? (
        <>
          <div className="p-5">
            <div className=" flex flex-row justify-center py-3">
              <h1 className="text-2xl">Saved Data</h1>
            </div>
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 ">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                          >
                            SN
                          </th>
                          {Object.keys(savedData[0]).map((key, i) => (
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                              key={i}
                            >
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {savedData.map((data, i) => (
                          <tr
                            className={`odd:bg-white even:bg-gray-100 ${
                              i % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                            key={i}
                          >
                            <td
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 "
                              key={i}
                            >
                              {i + 1}
                            </td>
                            {Object.values(data).map((value, i) => (
                              <td
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 "
                                key={i}
                              >
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
