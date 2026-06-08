# SkipMeterCalculation

입력값에 따라 검사 시작/종료 지연 시간을 계산하는 정적 웹 계산기입니다.

[사이트 바로가기](https://guaba98.github.io/SkipMeterCalculation.github.io/)

## 주요 기능

- 한국어/English 언어 전환
- 설비 위치, 지연 시간, 검사구간 정지거리, 설비 속도 기반 계산
- 입력값 오류 안내
- 계산식과 참고 이미지를 확인할 수 있는 도움말

## 계산 방식

- 검사 시작 지연 시간 = `(설비 위치 / 분당 속도) + 지연 시간`
- 검사 종료 지연 시간 = `(설비 위치 / 분당 속도) - (검사구간 정지거리 / 분당 속도) - 지연 시간`

## English Summary

This is a static web calculator that calculates inspection start/end delay times from equipment position, delay time, inspect stop distance, and equipment speed.
