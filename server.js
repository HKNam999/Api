const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

let sessionList = [];

app.post('/push', (req, res) => {
  const data = req.body;
  if (!data?.phien || !data?.tong) return res.status(400).send('Thiếu dữ liệu');

  sessionList.unshift({
    ...data,
    thoi_gian: new Date().toISOString()
  });

  if (sessionList.length > 100) sessionList.pop();

  console.log("📥 Nhận phiên:", data.phien);
  res.send("OK");
});

app.get('/api/latest', (req, res) => {
  res.json(sessionList[0] || {});
});

app.get('/api/all', (req, res) => {
  res.json(sessionList);
});

app.listen(PORT, () => {
  console.log(`✅ API đang chạy tại cổng ${PORT}`);
});