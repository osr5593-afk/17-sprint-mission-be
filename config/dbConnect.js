const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("DB connected");
  } catch (err) {
    console.log(err);
    process.exit(1); // 연결 실패 시 서버 종료
  }
};

module.exports = dbConnect;
