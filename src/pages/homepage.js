import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import "../css/homepage.css";
import Header from "../component/header";
import Detail from "../component/detail";

function Homepage() {
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // ข้อความค้นหา
  const { keycloak, initialized } = useKeycloak();
  const [apiData, setApiData] = useState(null);
  const [user, setUser] = useState(null);
  const [detailData, setDetailData] = useState(null);

  // ดึงข้อมูลผู้ใช้เมื่อ login แล้ว
  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }

    if (keycloak.authenticated) {
      const email = keycloak.tokenParsed.email;
      axios
        .get("http://localhost:8080/client", {
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
            "X-Email": email,
          },
        })
        .then((response) => {
          setUser(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching client data:", error);
        });
    }
  }, [initialized, keycloak]);

  // เรียก fetchData เมื่อ user มีค่าแล้ว
  useEffect(() => {
    if (user && user.api_key) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/data", {
        headers: {
          Authorization: `${user.api_key}`,
        },
      });

      const result = await response.json();
      setApiData(result);
    } catch (error) {
      console.error("Error fetching data from /data:", error);
    }
  };

  if (!initialized) {
    return <div>Loading...</div>;
  }

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      const res = await axios.get("http://localhost:8080/search", {
        params: { keyword: searchTerm },
        headers: { Authorization: `${user.api_key}` },
      });
      setApiData(res.data); // ใช้ res.data แทน res.json()
      console.log(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const goToDetailPage = (id) => {
    setSelectedId(id);
    console.log(id);
  };

  const handleDetail = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/data/${id}`, {
        headers: { Authorization: `${user.api_key}` },
      });
      setDetailData(res.data); // บันทึกข้อมูลไว้
      setSelectedId(id); // ตั้งค่า id เพื่อส่งให้ Detail component ด้วย (ถ้าใช้)
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching detail:", err);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleClickLog = async (item) => {
    const clickLog = {
      title: item.title,
      timestamp: new Date().toISOString(),
      referrer: window.location.href,
      user: user?.email || "anonymous", // ถ้ามี keycloak
    };
  
    try {
      await axios.post("http://localhost:8080/log", clickLog);
      console.log("Log sent:", clickLog);
      // ไปหน้า detail
      window.location.href = `/detail/${item.id}`;
    } catch (err) {
      console.error("Error logging click:", err);
    }
  };
  

  return (
    <div className="bg-homepage">
      {keycloak.authenticated ? (
        <div>
          <div className="row" id="row-container">
            <div className="col-4" id="left">
              <div className="square-logo">
                <h2 onClick={handleReload} className="clickable-title">JOBJAB group</h2>
              </div>
              <div id="line-logo"></div>
              <div className="data-API">
                <div className="btn-dataAPI">
                  <div className="search-box">
                    <input
                      type="text"
                      placeholder="ค้นหาข้อมูล..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <button onClick={handleSearch} className="btn-search">
                    <span>ค้นหา</span>
                  </button>
                </div>
                {apiData ? (
                  <div className="data-API">
                    {apiData.map((item) => (
                      <div className="detail" key={item.id}>
                        <p id="p-api">
                          <strong>{item.content}</strong>
                        </p>
                        {/* คลิกเพื่อไปหน้ารายละเอียด */}
                        <button
                          onClick={() => handleDetail(item.id)}
                          id="btn-detail"
                        >
                          <span>ดูรายละเอียด</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>ไม่มีข้อมูลที่เกี่ยวข้อง</p>
                )}
              </div>
            </div>
            <div className="col-8" id="right">
              <Header />
              <h1>ยินดีต้อนรับ, {keycloak.tokenParsed?.preferred_username}</h1>
              {detailData && (
                <div>
                  <h3>รายละเอียดข้อมูล</h3>
                  <p>
                    <strong>เนื้อหา:</strong> {detailData.content}
                  </p>
                  <p>
                    <strong>รายละเอียดเพิ่มเติม:</strong> {detailData.detail}
                  </p>
                  {/* เพิ่ม field อื่นๆ ตามที่มีใน API */}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>กำลังไปหน้า Login...</div>
      )}
    </div>
  );
}

export default Homepage;
