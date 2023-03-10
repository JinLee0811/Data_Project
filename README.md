1. 개인 작업 :
`add , commit`
로컬의 feature 브랜치에서 작업을 진행.
`git checkout dev`
dev 브랜치로 이동한다
`git merge feature`
로컬의 feature 브랜치를 dev 브랜치에 병합함

2. 팀 레포 병합 전 충돌 해결 : 
`git fetch upstream`
팀 back 레포를 로컬 dev에 fetch한다.
`git merge upstream/dev`
그 후 팀 레포의 dev 브랜치를 로컬의 dev에 병합하여 
발생하는 충돌을 해결한다

3. 개인 레포에 로컬 dev 브랜치를 push한다
`git push origin dev`

4. Merge Request 신청 : 깃랩
개인 레포 dev 브랜치 → 팀 back 레포 dev 브랜치에 merge request를 생성한다.

<br>

## Commit Guide
- 제목
    - `Feat : 2023-01-31 member name Add Login`
- 본문 내용 
    - `로그인 기능을 추가했습니다.`   

<br>

- **Commit Message Type**
    - Feat : 새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정
    - Fix : 기능에 대한 버그 수정
    - Build : 빌드 관련 수정
    - Chore : 패키지 매니저 수정, 그 외 기타 수정
    - Ci : CI 관련 설정 수정
    - Docs : 문서, 주석 수정
    - Style : 코드 스타일, 포맷팅에 대한 수정
    - Refactor : 기능의 변화가 아닌 코드 리팩터링
    - Test : 테스트 코드 추가, 수정
    - Release : 버전 릴리즈

- **Commit Message Guide**
    1. **제목과 본문**은 **한 줄 띄고 구분**한다. → 한줄 띄면 제목과 본문이 구분된다. 
    2. **제목**은 **50글자 이내**로 작성한다. → 너무 길면 코드창이 지저분해진다. 
    3. **제목** 첫 글자는 **대문자로 표기**한다. 
    4. **제목 끝**에 **마침표는 찍지 않는다.**
    5. **제목**은 **명령문**으로, **과거형으로 작성하지 않는다.**
    6. **본문** 각행은 **72행 이내,** **줄바꿈**을 사용해 작성한다.
    7. **본문**은 어떻게 보다는 **무엇을, 왜**에 대하여 설명한다.
        - 제목은 git GUI에서 bold로 표시되고, 터미널 여러 상황에서 자주 노출된다.