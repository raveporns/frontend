import React, { useEffect, useState } from "react";
import "../css/header.css";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";

function Header() {
  const { keycloak, initialized } = useKeycloak();
  const [user, setUser] = useState(null);
  const [fetched, setFetched] = useState(false); 
  const emailFromKeycloak = keycloak?.tokenParsed?.email;

  useEffect(() => {
    if (initialized && keycloak.authenticated && !fetched) {
      setFetched(true); // เปลี่ยนสถานะเป็น "ดึงข้อมูลแล้ว"
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
  }, [initialized, keycloak.authenticated, fetched]); // เพิ่ม 'fetched' ใน dependency array

  const handleCreateApiKey = async () => {
    try {
      const name = keycloak.tokenParsed.name;
      const email = keycloak.tokenParsed.email;

      const response = await axios.post("http://localhost:8080/register", {
        name,
        email,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error creating API key:", error);
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="bar">
        {user && user.email === emailFromKeycloak && user.api_key ? (
          <div className="user-info">
            <p id="p-apikey">API Key: {user.api_key}</p>
          </div>
        ) : (
          <p id="p-apikey">กรุณาสร้าง API key</p>
        )}
        <button id="btn-api" onClick={handleCreateApiKey}>
          สร้าง API key
        </button>
        <button onClick={() => keycloak.logout()}>ออกจากระบบ</button>
      </div>
    </div>
  );
}

export default Header;
