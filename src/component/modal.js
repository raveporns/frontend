import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function APIKeyModal({ show, onHide }) {
  const [apiKey, setApiKey] = useState(""); // ใช้ useState ในฟังก์ชันคอมโพเนนต์

  const handleSave = () => {
    console.log("API Key:", apiKey); // แสดงค่า API Key ในคอนโซล
    onHide(); // ปิด Modal
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>กรอก API Key</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="apiKey" className="form-label">API Key</label>
            <input 
              type="text" 
              id="apiKey" 
              className="form-control" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)} // อัพเดต state เมื่อมีการพิมพ์
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>ปิด</Button>
        <Button variant="primary" onClick={handleSave}>บันทึก</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default APIKeyModal;
