// script.js
document.getElementById('calculate-btn').addEventListener('click', () => {
    // 입력값 가져오기
    const 설비위치 = parseFloat(document.getElementById('설비위치').value);
    const 지연시간 = parseFloat(document.getElementById('지연시간').value);
    const 검사종료거리 = parseFloat(document.getElementById('검사종료거리').value);
    const 설비속도 = parseFloat(document.getElementById('설비속도').value);

    // 속도 변환
    const 속도분당 = 설비속도 / 60.0;

    // 계산
    const 검사시작지연시간 = (설비위치 / 속도분당) + 지연시간;
    const 검사종료지연시간 = (설비위치 / 속도분당) - (검사종료거리 / 속도분당) - 지연시간;

    // 결과 표시
    document.getElementById('검사시작지연시간').value = 검사시작지연시간.toFixed(2);
    document.getElementById('검사종료지연시간').value = 검사종료지연시간.toFixed(2);
});
