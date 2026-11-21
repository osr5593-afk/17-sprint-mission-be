require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/product");

const samples = [
  [
    "아이폰 15",
    "깨끗하게 사용한 아이폰입니다. 정상 작동합니다.",
    650000,
    ["전자기기", "아이폰"],
  ],
  [
    "맥북 에어",
    "가벼운 맥북 에어입니다. 충전기도 포함합니다.",
    890000,
    ["노트북", "애플"],
  ],
  [
    "에어팟 프로",
    "충전 케이스 포함이며 사용감이 적습니다.",
    170000,
    ["이어폰"],
  ],
  ["아이패드", "필기와 영상 시청에 사용한 아이패드입니다.", 430000, ["태블릿"]],
  [
    "기계식 키보드",
    "타건감이 좋은 키보드이며 정상 작동합니다.",
    65000,
    ["키보드"],
  ],
  [
    "게이밍 마우스",
    "사용감이 적고 버튼 모두 잘 작동합니다.",
    32000,
    ["마우스"],
  ],
  [
    "27인치 모니터",
    "화면 이상 없고 전원 케이블 포함입니다.",
    140000,
    ["모니터"],
  ],
  [
    "블루투스 스피커",
    "소리가 선명하고 배터리 상태 양호합니다.",
    55000,
    ["스피커"],
  ],
  ["캠핑 의자", "접이식 캠핑 의자이며 보관 상태 좋습니다.", 23000, ["캠핑"]],
  [
    "원목 책상",
    "튼튼한 원목 책상입니다. 직접 가져가셔야 해요.",
    78000,
    ["가구"],
  ],
  [
    "무선 청소기",
    "흡입력이 좋고 충전 거치대도 함께 드립니다.",
    99000,
    ["생활"],
  ],
  ["닌텐도 스위치", "정상 작동하며 조이콘과 독 포함입니다.", 210000, ["게임"]],
  [
    "디지털 카메라",
    "사진 촬영 잘 되고 배터리도 포함합니다.",
    185000,
    ["카메라"],
  ],
  ["운동화", "몇 번 신지 않아 상태가 아주 깨끗합니다.", 42000, ["패션"]],
  ["후드 집업", "편하게 입기 좋은 후드 집업입니다.", 18000, ["의류"]],
  [
    "커피 머신",
    "가정에서 사용한 커피 머신입니다. 작동 양호해요.",
    85000,
    ["주방"],
  ],
  ["공기청정기", "필터 관리하며 사용한 공기청정기입니다.", 115000, ["가전"]],
  ["독서 스탠드", "밝기 조절 가능한 독서용 스탠드입니다.", 17000, ["조명"]],
  ["여행 캐리어", "바퀴와 손잡이 모두 정상인 캐리어입니다.", 38000, ["여행"]],
  ["전기 자전거", "주행 상태 좋고 충전기를 함께 드립니다.", 540000, ["자전거"]],
];

async function seed() {
  if (process.env.ALLOW_SEED !== "true") {
    throw new Error(
      "Seed 실행 전 ALLOW_SEED=true를 .env에 설정하세요. 실제 DB인지 확인하세요.",
    );
  }
  await mongoose.connect(process.env.DB_CONNECT);
  try {
    // 기존 데이터를 지우지 않고, 같은 이름의 상품이 없는 경우에만 추가
    let inserted = 0;
    for (let i = 0; i < samples.length; i++) {
      const [name, description, price, tags] = samples[i];
      const exists = await Product.exists({ name });
      if (!exists) {
        await Product.create({
          name,
          description,
          price,
          tags,
          createdAt: new Date(Date.now() - (samples.length - i) * 60000),
        });
        inserted++;
      }
    }
    console.log(`Seed 완료: ${inserted}개 추가, 기존 상품 유지`);
  } finally {
    await mongoose.disconnect();
  }
}
seed().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
