# Mukho-Minor-Gallery

[묵호 마이너 갤러리](http://mukho.r-e.kr:2023/)(Ver 1.1.3)

- Mukstcamp Project 3

## 특징

1. 그 누구보다 불친절한 UI
   - 상남자는 삭제할 글을 올리지 않습니다.
2. 최소 기능 프로젝트
3. 더러운 코드
   - 내가 정리한 코드가 맞는건지 모르겠다.

## 기능

- 회원가입, 로그인, 로그아웃 및 세션을 통한 권한 확인
  - 유효성 검사에 정규표현식 사용
- `bcrypt`를 통한 비밀번호 암호화
- 글 목록 보기, 조회수
  - 조회수: 로컬 환경에서 1시간 이내에 재접속시 조회수 카운팅 안함
- 게시글 보기, 삭제
- 댓글 달기, 삭제
- 로그 기능
- HTTPS

## 확인된 버그

- 몰?루
