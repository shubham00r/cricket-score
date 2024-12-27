import React, { useEffect, useState } from "react";

const Cricket = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchData, setSearchData] = useState("");
  const fetchData = async () => {
    try {
      const responsive = await fetch(
        "https://api.cricapi.com/v1/cricScore?apikey=b34a8c3c-dbcd-4fb7-92db-ebbe1464b74a"
      );
      const data = await responsive.json();
      console.log(data.data);
      setData(data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSearch = () => {
    setSearchData(inputValue);
    // alert(inputValue);

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div style={{ textAlign: "center", margin: "20px" }}>
        <input
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#f2f2f2",
          }}
          type="text"
          placeholder="Enter your matchType"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          style={{
            padding: "10px",
            width: "100px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "red",
          }}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div>
        <p
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            color: "red",
          }}
        >
          Live Cricket Score
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {data ? (
            data.map((curVal) => {
              if (curVal.status != "Match not started") {
                // if (curVal.matchType.includes(searchData)) {
                // {
                //   console.log(curVal.series.includes(searchData));
                // }
                return (
                  <>
                    <div
                      key={curVal.id}
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "16px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#fff",
                      }}
                    >
                      <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>
                        {curVal.series}
                      </h3>
                      <h3
                        style={{
                          fontSize: "16px",
                          color: "#666",
                          marginBottom: "16px",
                        }}
                      >
                        {curVal.matchType}
                      </h3>
                      <div
                        className="img"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "16px",
                          alignItems: "center",
                          marginBottom: "16px",
                        }}
                      >
                        <div style={{ textAlign: "center" }}>
                          <img
                            src={curVal.t1img}
                            alt={curVal.t1}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                          <p
                            style={{
                              margin: "8px 0 4px",
                              fontWeight: "bold",
                            }}
                          >
                            {curVal.t1}
                          </p>
                          <p style={{ margin: 0, color: "#555" }}>
                            {curVal.t1s}
                          </p>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <img
                            src={curVal.t2img}
                            alt={curVal.t2}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                            }}
                          />
                          <p
                            style={{
                              margin: "8px 0 4px",
                              fontWeight: "bold",
                            }}
                          >
                            {curVal.t2}
                          </p>
                          <p style={{ margin: 0, color: "#555" }}>
                            {curVal.t2s}
                          </p>
                        </div>
                      </div>
                      <p style={{ fontSize: "14px", color: "#888" }}>
                        Status :{" "}
                        <span style={{ fontWeight: "bold", color: "#333" }}>
                          {curVal.status}
                        </span>
                      </p>
                    </div>
                  </>
                );
                // }
              }
            })
          ) : (
            <h1
              style={{
                textAlign: "center",
                color: "#888",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Data not Found
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cricket;
