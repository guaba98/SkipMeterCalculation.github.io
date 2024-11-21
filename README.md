# SkipMeterCalculation
설비 속도, 파라미터에 따른 검사 시작&amp;종료 계산기 입니다.
<br>[🔗사이트 바로가기](https://guaba98.github.io/SkipMeterCalculation.github.io/)

## 📃용어 설명
- 설비위치: 코팅다이부터 우리 설비까지의 거리값
- 지연시간: 거리값이 오차가 있을 수 있으니 일부 수정할 수 있도록 하는 부분
- 검사구간 정지거리: 검사 종료시 영향이 있음

## 🧮계산 방식
- 검사 시작 지연시간 = (설비위치 / 분당속도) + 지연시간;
- 검사 종료 지연시간 = (설비위치 / 분당속도) - (검사구간 정지거리 / 분당속도) - 지연시간

## 💻UI
![sliding_skip_example](https://github.com/user-attachments/assets/7520c8f9-5549-4b21-9a59-5e3fdc76f992)
