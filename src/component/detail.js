import React, { useEffect, useState } from "react";
import axios from "axios";

function Detail({ id, user }) {
  const [detailData, setDetailData] = useState(null);

  useEffect(() => {
    if (!id || !user?.api_key) return;

    const fetchDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/data/${id}`, {
          headers: {
            Authorization: `${user.api_key}`,
          },
        });
        setDetailData(res.data);
      } catch (error) {
        console.error("Error fetching detail:", error);
      }
    };

    fetchDetail();
  }, [id, user]);

  if (!id) return <p>กรุณาเลือกข้อมูลทางซ้าย</p>;
  if (!detailData) return <p>กำลังโหลดข้อมูล...</p>;

  return (
    <div>
      <h3>รายละเอียดข้อมูล</h3>
      <p><strong>เนื้อหา:</strong> {detailData.content}</p>
      <p><strong>รายละเอียดเพิ่มเติม:</strong> {detailData.detail}</p>
      {/* เพิ่ม field อื่นๆ ตามที่มีใน API */}
    </div>
  );
}

export default Detail;
