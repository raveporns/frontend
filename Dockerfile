# ใช้ Node.js image
FROM node:18

# ตั้ง environment เป็น development
ENV NODE_ENV=development

# ตั้ง working directory ใน container
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json (ถ้ามี)
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ทั้งหมดเข้าไปใน container
COPY . .

# เปิดพอร์ต (เช่น 3000 สำหรับ React, 8080 หรืออื่น ๆ สำหรับ Express)
EXPOSE 3000

# คำสั่งให้รันเมื่อ container เริ่ม
CMD ["npm", "start"]
