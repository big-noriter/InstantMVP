# 트러블슈팅 가이드

## 🚨 자주 발생하는 문제들

### 1. `404 Not Found` 에러 (예: forgot-password?_rsc=16djb)

**문제**: Next.js App Router에서 특정 경로에 대한 페이지가 없음

**원인**:
- 해당 경로에 대응하는 `page.tsx` 파일이 없음
- URL에 `?_rsc=...` 파라미터는 React Server Components의 프리패칭 관련 헤더

**해결방법**:
1. `app/[경로]/page.tsx` 파일 생성
2. 올바른 Next.js App Router 구조 확인

**예시**:
```
app/
  forgot-password/
    page.tsx  ✅ 올바른 구조
```

### 2. `ERR_CONNECTION_REFUSED` 에러

**문제**: 프론트엔드에서 백엔드 서버에 연결할 수 없음

**원인**:
- 백엔드 서버가 실행되지 않음
- 잘못된 URL 사용 (localhost vs 배포 도메인)
- 하드코딩된 URL 문제

**해결방법**:

#### 로컬 개발 환경:
```bash
# 백엔드 서버 실행
cd backend
npm run dev
```

#### 배포 환경:
- 환경변수나 설정 파일에서 올바른 도메인 사용
- `localhost:3001` → `https://your-app.up.railway.app`

### 3. 하드코딩된 URL 문제

**문제**: 코드에 `localhost:3001` 등이 하드코딩되어 배포 시 오류

**해결방법**:
1. 설정 파일 사용 (`frontend/src/utils/config.ts`)
2. 환경변수 활용

**Before**:
```typescript
fetch('http://localhost:3001/api/auth/login')
```

**After**:
```typescript
import { apiUrl, API_CONFIG } from '@/utils/config';
fetch(apiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN))
```

## 🔧 개발 환경 설정

### 백엔드 서버 실행
```bash
cd backend
npm install
npm run dev  # http://localhost:3001
```

### 프론트엔드 서버 실행
```bash
cd frontend
npm install
npm run dev  # http://localhost:3000
```

### 환경변수 설정

**프론트엔드** (`.env.local`):
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

**백엔드** (`.env`):
```
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## 📋 배포 체크리스트

### Railway 배포 전 확인사항:
1. [ ] 환경변수 올바르게 설정
2. [ ] 하드코딩된 URL 제거
3. [ ] CORS 설정 확인
4. [ ] 포트 설정 (`process.env.PORT`)
5. [ ] 빌드 스크립트 동작 확인

### 배포 후 확인사항:
1. [ ] 백엔드 health check 엔드포인트 접근 가능
2. [ ] 프론트엔드에서 백엔드 API 호출 성공
3. [ ] 모든 라우트 페이지 정상 로드

## 🐛 디버깅 팁

### API 요청 실패 시:
1. 브라우저 개발자 도구 Network 탭 확인
2. 백엔드 서버 로그 확인
3. CORS 에러 여부 확인
4. URL이 올바른지 확인

### Next.js 라우팅 문제:
1. 파일 구조가 App Router 규칙에 맞는지 확인
2. `page.tsx` 파일명 정확한지 확인
3. `export default` 존재 여부 확인

### 서버 연결 문제:
```bash
# 포트 사용 여부 확인
netstat -an | grep :3001

# 프로세스 종료
lsof -ti:3001 | xargs kill -9
```

## 📞 추가 지원

문제가 지속되면 다음 정보와 함께 문의:
1. 정확한 에러 메시지
2. 브라우저 콘솔 로그
3. 백엔드 서버 로그
4. 재현 단계 