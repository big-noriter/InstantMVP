'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiUrl, API_CONFIG } from '@/utils/config';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(apiUrl(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
      } else {
        setError(data.error || '비밀번호 재설정 요청에 실패했습니다.');
      }
    } catch (err) {
      setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-600">
            비밀번호 찾기
          </h2>
          <p className="mt-2 text-secondary-600">
            가입하신 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.
          </p>
        </div>
        
        <div className="card">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-red-600 text-xs underline mt-1"
              >
                닫기
              </button>
            </div>
          )}

          {message && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <p className="text-green-600 text-sm">{message}</p>
              <div className="mt-3">
                <Link 
                  href="/login"
                  className="text-green-600 text-sm underline"
                >
                  로그인 페이지로 돌아가기
                </Link>
              </div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700">
                이메일 주소
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input-field mt-1"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div>
              <button 
                type="submit" 
                className="btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    전송 중...
                  </div>
                ) : (
                  '비밀번호 재설정 링크 전송'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center space-y-2">
            <Link 
              href="/login" 
              className="block text-sm text-primary-600 hover:text-primary-500"
            >
              로그인으로 돌아가기
            </Link>
            <Link 
              href="/signup" 
              className="block text-sm text-secondary-600 hover:text-secondary-500"
            >
              계정이 없으신가요? 회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 