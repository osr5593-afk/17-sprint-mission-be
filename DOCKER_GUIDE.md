# Docker 실행 안내 (MongoDB Atlas)

1. Docker Desktop을 설치하고 실행합니다.
2. `.env.example`을 복사해 `.env`를 만듭니다.
3. `.env`의 `DB_CONNECT`에 MongoDB Atlas URI를 입력합니다. 실제 비밀번호를 Git에 올리지 마세요.
4. Atlas Network Access에서 **현재 실행 환경의 공인 IP**가 허용되었는지 확인합니다. 로컬 Docker Desktop에서는 보통 호스트 PC의 외부 IP를 사용합니다.
5. 프로젝트 폴더에서 `docker compose up --build -d`를 실행합니다.
6. `docker compose logs -f api`로 `DB connected` 및 서버 시작 로그를 확인합니다.
7. 브라우저에서 `http://localhost:3000/health`를 열어 `{"status":"ok"}` 응답을 확인합니다.
8. 종료: `docker compose down` (Atlas 데이터는 삭제되지 않음).

- 이 구성은 **Express 컨테이너만** 실행합니다. DB는 MongoDB Atlas를 사용합니다.
- `npm run seed`는 별도 명령이며, `ALLOW_SEED=true` 설정을 요구합니다. 컨테이너 시작 시 자동 실행하지 않습니다.
- 로컬에서 포트 3000이 이미 사용 중이면 `.env`의 `PORT=3001`로 바꾼 뒤 `http://localhost:3001/health`로 접속하세요.
- 프론트엔드 `.env`의 `VITE_API_URL`도 해당 호스트 포트에 맞춰야 합니다.
- 운영 배포에서는 Atlas 접속 IP 허용 정책, 자격증명, CORS_ORIGIN을 별도로 관리하세요.
