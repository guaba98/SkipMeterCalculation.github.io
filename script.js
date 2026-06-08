const translations = {
    ko: {
        pageTitle: 'Skip 계산기',
        title: 'Skip 계산기',
        helpButton: '도움말 열기',
        closeButton: '도움말 닫기',
        helpImageAlt: 'Skip 계산 설명 이미지',
        helpEquipmentPosition: '- 설비 위치: 코팅 다이부터 슬라이딩 설비까지의 거리값',
        helpDelayTime: '- 지연 시간: 거리값에 오차가 있을 때 임의로 보정할 수 있도록 하는 값',
        helpInspectStopDistance: '- 검사구간 정지거리: 검사 종료에 영향을 주는 거리값',
        helpStartFormula: '- 검사 시작 지연 시간 = (설비 위치 / 분당 속도) + 지연 시간',
        helpEndFormula: '- 검사 종료 지연 시간 = (설비 위치 / 분당 속도) - (검사구간 정지거리 / 분당 속도) - 지연 시간',
        equipmentPosition: '설비 위치(M)',
        delayTime: '지연 시간(Sec)',
        inspectStopDistance: '검사구간 정지거리(M)',
        equipmentSpeed: '설비 속도(M/Min)',
        calculateButton: '계산하기',
        startDelayTime: '검사 시작 지연 시간(Sec)',
        endDelayTime: '검사 종료 지연 시간(Sec)',
        requiredError: '모든 입력값을 숫자로 입력해 주세요.',
        speedError: '설비 속도는 0보다 커야 합니다.'
    },
    en: {
        pageTitle: 'Skip Calculator',
        title: 'Skip Calculator',
        helpButton: 'Open help',
        closeButton: 'Close help',
        helpImageAlt: 'Skip calculation reference image',
        helpEquipmentPosition: '- Equipment Position: Distance from the coating die to the sliding equipment',
        helpDelayTime: '- Delay time: Manual correction time used when the distance value has an offset',
        helpInspectStopDistance: '- Inspect Stop Distance: Distance value that affects inspection end timing',
        helpStartFormula: '- Inspection start delay time = (Equipment Position / Speed per minute) + Delay time',
        helpEndFormula: '- Inspection end delay time = (Equipment Position / Speed per minute) - (Inspect Stop Distance / Speed per minute) - Delay time',
        equipmentPosition: 'Equipment Position(M)',
        delayTime: 'Delay time(Sec)',
        inspectStopDistance: 'Inspect Stop Distance(M)',
        equipmentSpeed: 'Equipment Speed(M/Min)',
        calculateButton: 'Calculate',
        startDelayTime: 'Inspection Start Delay Time(Sec)',
        endDelayTime: 'Inspection End Delay Time(Sec)',
        requiredError: 'Please enter numeric values for every field.',
        speedError: 'Equipment speed must be greater than 0.'
    }
};

const languageStorageKey = 'skipCalculatorLanguage';
const supportedLanguages = Object.keys(translations);

const elements = {
    calculateButton: document.getElementById('calculate-btn'),
    equipmentPosition: document.getElementById('equipmentPosition'),
    delayTime: document.getElementById('delayTime'),
    inspectStopDistance: document.getElementById('inspectStopDistance'),
    equipmentSpeed: document.getElementById('equipmentSpeed'),
    startDelayTime: document.getElementById('startDelayTime'),
    endDelayTime: document.getElementById('endDelayTime'),
    errorMessage: document.getElementById('error-message'),
    infoIcon: document.querySelector('.info-icon'),
    tooltip: document.querySelector('.tooltip'),
    closeButton: document.querySelector('.close-btn'),
    languageInputs: document.querySelectorAll('input[name="language"]')
};

let currentLanguage = getInitialLanguage();

function getInitialLanguage() {
    const savedLanguage = localStorage.getItem(languageStorageKey);
    return supportedLanguages.includes(savedLanguage) ? savedLanguage : 'ko';
}

function applyLanguage(language) {
    currentLanguage = supportedLanguages.includes(language) ? language : 'ko';
    const dictionary = translations[currentLanguage];

    document.documentElement.lang = currentLanguage;
    document.title = dictionary.pageTitle;

    document.querySelectorAll('[data-i18n]').forEach((node) => {
        const key = node.dataset.i18n;
        node.textContent = dictionary[key] || '';
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((node) => {
        node.dataset.i18nAttr.split(',').forEach((mapping) => {
            const [attribute, key] = mapping.split(':');
            if (attribute && key && dictionary[key]) {
                node.setAttribute(attribute, dictionary[key]);
            }
        });
    });

    elements.languageInputs.forEach((input) => {
        input.checked = input.value === currentLanguage;
    });

    if (!elements.errorMessage.hidden) {
        validateInputs();
    }

    localStorage.setItem(languageStorageKey, currentLanguage);
}

function getNumericValue(input) {
    const value = Number.parseFloat(input.value);
    return Number.isFinite(value) ? value : null;
}

function showError(messageKey) {
    elements.errorMessage.textContent = translations[currentLanguage][messageKey];
    elements.errorMessage.hidden = false;
    elements.startDelayTime.value = '';
    elements.endDelayTime.value = '';
}

function clearError() {
    elements.errorMessage.textContent = '';
    elements.errorMessage.hidden = true;
}

function validateInputs() {
    const values = {
        equipmentPosition: getNumericValue(elements.equipmentPosition),
        delayTime: getNumericValue(elements.delayTime),
        inspectStopDistance: getNumericValue(elements.inspectStopDistance),
        equipmentSpeed: getNumericValue(elements.equipmentSpeed)
    };

    if (Object.values(values).some((value) => value === null)) {
        showError('requiredError');
        return null;
    }

    if (values.equipmentSpeed <= 0) {
        showError('speedError');
        return null;
    }

    clearError();
    return values;
}

function calculateDelayTimes() {
    const values = validateInputs();
    if (!values) {
        return;
    }

    const speedPerMinute = values.equipmentSpeed / 60.0;
    const startDelayTime = (values.equipmentPosition / speedPerMinute) + values.delayTime;
    const endDelayTime = (values.equipmentPosition / speedPerMinute) - (values.inspectStopDistance / speedPerMinute) - values.delayTime;

    elements.startDelayTime.value = startDelayTime.toFixed(2);
    elements.endDelayTime.value = endDelayTime.toFixed(2);
}

function setTooltipVisibility(isVisible) {
    elements.tooltip.classList.toggle('is-visible', isVisible);
    elements.tooltip.setAttribute('aria-hidden', String(!isVisible));
    elements.infoIcon.setAttribute('aria-expanded', String(isVisible));
}

elements.calculateButton.addEventListener('click', calculateDelayTimes);

elements.languageInputs.forEach((input) => {
    input.addEventListener('change', (event) => {
        applyLanguage(event.target.value);
    });
});

elements.infoIcon.addEventListener('click', () => {
    setTooltipVisibility(!elements.tooltip.classList.contains('is-visible'));
});

elements.closeButton.addEventListener('click', () => {
    setTooltipVisibility(false);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        setTooltipVisibility(false);
    }
});

applyLanguage(currentLanguage);
