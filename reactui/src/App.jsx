import { useState } from "react";

function App() {
  const [excelData, setExcelData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data);
    await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setExcelData(data);
        console.log(excelData);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-2xl">
          Name
        </label>
        <input
          name="file"
          type="file"
          id="name"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
        <button>Submit</button>
      </form>
      {excelData ? (
        <>
          <div>
            <div class="flex flex-col">
              <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                  <div class="overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200 ">
                      <thead>
                        <tr>
                          {Object.keys(excelData[0]).map((key, i) => (
                            <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                              key={i}
                            >
                              {key}
                            </th>
                          ))}

                          <th
                            scope="col"
                            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {excelData.map((data, i) => (
                          <tr
                            class={`odd:bg-white even:bg-gray-100 ${
                              i % 2 === 0 ? "bg-gray-100" : "bg-white"
                            }`}
                            key={i}
                          >
                            {Object.values(data).map((value, i) => (
                              <td
                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 "
                                key={i}
                              >
                                {value}
                              </td>
                            ))}
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a
                                class="text-blue-500 hover:text-blue-700"
                                href={"#"}
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        ))}

                        {/* <tr class="odd:bg-white even:bg-gray-100  ">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                            John Brown
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                            45
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                            New York No. 1 Lake Park
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              class="text-blue-500 hover:text-blue-700"
                              href={"#"}
                            >
                              Delete
                            </a>
                          </td>
                        </tr> */}
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
      <br />
      <br />
    </div>
  );
}

export default App;