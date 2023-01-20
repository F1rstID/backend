<h2>핵심 기능</h2>

- **로그인, 회원가입**<br>
  ▶ JWT AcceessToken, RefreshToken을 이용하여 로그인 기능 구현.<br>
  ▶ ID, Nickname의 중복 확인 기능 구현.
  
- **Quiz CRUD**<br>
  ▶ JWT를 이용하여 회원의 권한을 분리하여 접근에 제한을 두는 기능 구현. <br>
  ▶ ex) 타인이 작성한 Quiz를 삭제할 권한을 주지 않음.
  
- **Comment CRUD**<br>
  ▶ JWT를 이용하여 회원의 권한을 분리하여 접근에 제한을 두는 기능 구현. <br>
  ▶ ex) 타인이 작성한 Quiz를 삭제할 권한을 주지 않음.

* 개발 기간 : 2023년 1월 13일 ~ 2023년 1월 20일

<h3>역할 분배</h3>

 * 신중완 : Quiz 게시글 CRUD + 좋아요 , 싫어요.
 * 송찬혁 : 댓글 CRUD + 좋아요, 싫어요.
 * 이준빈 : 로그인, 회원가입, 중복확인, JWT

<aside>
<h3>🗓️ 백엔드 Git 전략</h3>

</aside>

- **1.** main 브랜치에서 시작.
- **2.** 동일한 브랜치를 develop에도 생성하고 실제 개발은 이곳에서 진행한다.
- **3.** 개발을 하다가 로그인, 회원가입 등의 기능 구현이 필요할 경우, 각각의 개발자는 develop 브랜치에서 feature 브랜치를 생성하여 회원가입기능 구현하고, 다른 개발자는 feature 브랜치를 생성하여 로그인 기능을 구현한다.
- **4.** 개발이 끝난 feature 브랜치는 팀원들의 검토를 거친 후, develop 브랜치에 merge 합니다.
- **5.** 기능 구현이 끝났을때, release 브랜치를 생성하여 QA를 진행하고, 발견된 버그들은 모두 release 브랜치에서 수정합니다.
- **6.** QA과정이 모두 끝나면 release 브랜치를 main 브랜치와 develop 브랜치로 merge 합니다. 그리고 main 브랜치에 버전명시를 위한 태그를 생성 후 배포합니다.
- **7.** 배포가 진행된 후에도 버그가 발생했을떄 긴급하다면 hotfix 브랜치를 생성해 버그를 수정한 후에, main 브랜치와 develop 브랜치로 병합 후 버그 수정을 완료 했다는 태그를 추가합니다.

<h3>백엔드 Git 컨벤션 </h3>

- **feat:** 새로운 기능 추가
- **fix:** 버그 픽스
- **docs:** 문서 수정
- **style:** 포맷, 세미콜론 수정, Optimize import, Code clean up 등 코드가 아닌 스타일에 관련된 수정
- **refactor:** 코드 리펙토링
- **test:** 테스트 코드 추가
- **chore:** 빌드 관련 업무 수정(안드로이드의 경우 builde.gradle, manifest)

<h3>사용 기술<h3>

* JavaScript
* Express
* mysql
* Sequelize
* AWS EC2
