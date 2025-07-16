/**
 * 애플리케이션 설정 파일
 * 환경에 따른 백엔드 URL 및 기타 설정을 관리합니다.
 */

// 환경 감지
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// 백엔드 URL 설정
export const API_CONFIG = {
  // 환경변수가 있으면 사용하고, 없으면 기본값 사용
  BASE_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 
           (isProduction 
             ? 'https://your-app.up.railway.app'  // 실제 배포 도메인으로 변경 필요
             : 'http://localhost:3001'
           ),
  
  // API 엔드포인트들
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout',
      REGISTER: '/api/auth/register',
      FORGOT_PASSWORD: '/api/auth/forgot-password',
      RESET_PASSWORD: '/api/auth/reset-password',
      GOOGLE: '/api/auth/google',
      GOOGLE_CALLBACK: '/api/auth/google/callback',
    },
    SCHEDULES: {
      PERSONAL: '/api/schedules/personal',
      DEPARTMENT: '/api/schedules/department',
      PROJECT: '/api/schedules/project',
      ALL: '/api/schedules/all',
    },
    ANALYTICS: {
      REPORTS: '/api/analytics/reports',
      GENERATE_REPORT: '/api/analytics/generateReport',
      PERSONAL_TASKS: '/api/analytics/personalTasks',
      DEPARTMENT_TASKS: '/api/analytics/departmentTasks',
      COMPANY_TASKS: '/api/analytics/companyTasks',
      PROJECT_TASKS: '/api/analytics/projectTasks',
    },
    CALENDAR: {
      EVENTS: '/api/calendar/events',
    },
    CONFLICTS: {
      ANALYSIS: '/api/conflicts/analysis',
    }
  }
};

// API 요청 헬퍼 함수
export const apiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// 환경 정보
export const ENV_INFO = {
  isProduction,
  isDevelopment,
  nodeEnv: process.env.NODE_ENV,
};

// 디버그 정보 (개발 환경에서만)
if (isDevelopment) {
  console.log('🔧 API Configuration:', {
    baseUrl: API_CONFIG.BASE_URL,
    environment: ENV_INFO.nodeEnv,
  });
} 