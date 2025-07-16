import express from 'express';
const router = express.Router();

// === 일반 로그인(이메일/비밀번호) 라우터 ===
router.post('/login', async (req, res) => {
  const { id, password } = req.body;
  // 하드코딩 어드민 계정
  if (id === 'admin123@email.com' && password === 'admin123') {
    return res.json({
      success: true,
      user: {
        id: 'admin123@email.com',
        role: 'admin',
        name: '관리자',
      },
      token: 'test-admin-token', // 실제 서비스는 JWT 등 발급
      message: '어드민 계정 로그인 성공'
    });
  }
  // 실제 사용자 인증 로직(DB 등) 추가 가능
  return res.status(401).json({
    success: false,
    error: '아이디 또는 비밀번호가 올바르지 않습니다.'
  });
});

// === 비밀번호 찾기 라우터 ===
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: '이메일 주소를 입력해주세요.'
      });
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: '올바른 이메일 형식이 아닙니다.'
      });
    }

    // TODO: 실제 구현에서는 다음 단계들을 포함해야 합니다:
    // 1. 사용자 DB에서 이메일 존재 여부 확인
    // 2. 비밀번호 재설정 토큰 생성
    // 3. 이메일 발송 (Nodemailer, SendGrid 등 사용)
    // 4. 토큰을 DB에 저장 (만료시간 포함)
    
    // 현재는 시뮬레이션된 응답
    console.log(`비밀번호 재설정 요청: ${email}`);
    
    return res.status(200).json({
      success: true,
      message: '비밀번호 재설정 링크가 이메일로 전송되었습니다.',
      data: {
        email: email,
        instruction: '이메일을 확인하여 비밀번호를 재설정해주세요.'
      }
    });
    
  } catch (error) {
    console.error('비밀번호 찾기 처리 오류:', error);
    return res.status(500).json({
      success: false,
      error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
    });
  }
});

// === 비밀번호 재설정 라우터 ===
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        error: '토큰과 새 비밀번호를 모두 입력해주세요.'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: '비밀번호는 8자 이상이어야 합니다.'
      });
    }

    // TODO: 실제 구현에서는 다음 단계들을 포함해야 합니다:
    // 1. 토큰 유효성 검증
    // 2. 토큰 만료 확인
    // 3. 새 비밀번호 해싱
    // 4. DB에 비밀번호 업데이트
    // 5. 토큰 삭제/무효화
    
    return res.status(200).json({
      success: true,
      message: '비밀번호가 성공적으로 재설정되었습니다.'
    });
    
  } catch (error) {
    console.error('비밀번호 재설정 처리 오류:', error);
    return res.status(500).json({
      success: false,
      error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
    });
  }
});

export default router; 