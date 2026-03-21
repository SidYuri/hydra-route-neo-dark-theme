// ==UserScript==
// @name         Hydra Route Neo — Keenetic Dark Theme
// @namespace    http://tampermonkey.net/
// @version      0.03
// @description  Тёмная тема для Hydra Route Neo в стиле Keenetic. Beta.
// @author       SidYuri
// @include      http://192.168.*:2000/*
// @updateURL    https://raw.githubusercontent.com/SidYuri/hydra-route-neo-dark-theme/main/hydra-route-neo-dark-theme.user.js
// @downloadURL  https://raw.githubusercontent.com/SidYuri/hydra-route-neo-dark-theme/main/hydra-route-neo-dark-theme.user.js
// @supportURL   https://github.com/SidYuri/hydra-route-neo-dark-theme/issues
// @homepageURL  https://github.com/SidYuri/hydra-route-neo-dark-theme
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
    'use strict';

    if (location.port !== '2000') return;

    // ─── Основная тёмная тема ────────────────────────────────────────────────
    const DARK_CSS = `
        :root {
            --color-text-primary:   #c2c2c2 !important;
            --color-text-secondary: #949b9f !important;
            --color-text-tertiary:  #6f737b !important;
            --color-text-muted:     #6f737b !important;
            --color-bg-primary:     #1b2434 !important;
            --color-bg-secondary:   #161c27 !important;
            --color-bg-tertiary:    #2e3d57 !important;
            --color-border-light:   #4d545f !important;
            --color-border-medium:  #4d545f !important;
            --color-primary:        #0097dc !important;
            --color-primary-hover:  #007ab3 !important;
            --color-primary-light:  rgba(0,151,220,0.15) !important;
            --color-shadow:         rgba(0,0,0,0.4) !important;
            --color-shadow-medium:  rgba(0,0,0,0.5) !important;
            --color-overlay:        rgba(0,0,0,0.7) !important;
            --color-error:          #de3d3d !important;
            --color-error-light:    rgba(222,61,61,0.12) !important;
            --color-success:        #25c47a !important;
            --color-success-light:  rgba(37,196,120,0.12) !important;
        }

        header {
            background-color: #161c27 !important;
            box-shadow: rgb(6, 8, 11) 0px 0px 18px 0px !important;
            z-index: 10 !important;
            position: relative !important;
        }

        .sidebar { background-color: #161c27 !important; opacity: 1 !important; }
        .sidebar .icon {
            border-bottom: 1px solid rgba(77,84,95,0.4) !important;
            position: relative !important;
            opacity: 1 !important;
        }
        .sidebar .icon:not(.active) { opacity: 0.75 !important; color: #949b9f !important; }
        .sidebar .icon:not(.active):hover {
            opacity: 1 !important;
            color: #c2c2c2 !important;
            background-color: rgba(0,151,220,0.08) !important;
        }
        .sidebar .icon.active {
            background-color: rgba(0,151,220,0.12) !important;
            opacity: 1 !important;
            color: #0097dc !important;
        }
        .sidebar .icon.active::before {
            content: '' !important;
            position: absolute !important;
            left: 0 !important; top: 0 !important; bottom: 0 !important;
            width: 3px !important;
            background-color: #0097dc !important;
            border-radius: 0 2px 2px 0 !important;
        }
        .sidebar .icon.active svg path,
        .sidebar .icon.active svg rect,
        .sidebar .icon.active svg circle { fill: #0097dc !important; }

        /* ── Поля ввода ── */
        textarea, input, input.description,
        .geo-time-input, .geoip-file-input, .geosite-file-input {
            background-color: #1b2434 !important;
            color: #c2c2c2 !important;
            border: 1px solid #4d545f !important;
            border-radius: 4px !important;
        }
        textarea { resize: none !important; }
        textarea:focus, input:focus {
            border-color: #0097dc !important;
            outline: none !important;
        }
        textarea::placeholder, input::placeholder { color: #6f737b !important; }

        /* ── Material Design плавающий лейбл ── */
        /* По умолчанию — фон основного контента */
        .LABEL-1 {
            background-color: #1b2434 !important;
            color: #949b9f !important;
            font-size: 11px !important;
        }
        /* В секциях (sidebar-colored) — тёмный фон секции */
        .config-field .LABEL-1,
        .config-field-full .LABEL-1,
        .settings-section .LABEL-1,
        .donors-plain-wrap .LABEL-1 {
            background-color: #161c27 !important;
        }
        /* Фокус — голубой акцент */
        input:focus ~ .LABEL-1,
        input:focus + .LABEL-1 {
            color: #0097dc !important;
        }

        /* ── Остальные элементы ── */
        select, .geo-tz-select {
            background-color: #1b2434 !important;
            color: #c2c2c2 !important;
            border: 1px solid #4d545f !important;
        }
        select option { background-color: #2e3d57 !important; color: #c2c2c2 !important; }

        .dashboard-policy-btn, .dashboard-policy-btn--policy,
        .create-policy-btn, .add-field-btn, .dashboard-button, .proxy-tab {
            background-color: #2e3d57 !important;
            color: #c2c2c2 !important;
            border-color: #4d545f !important;
        }
        .dashboard-policy-btn:hover, .create-policy-btn:hover,
        .add-field-btn:hover, .dashboard-button:hover, .proxy-tab:hover {
            background-color: #3d5073 !important;
        }

        /* ── Кнопки-действия с акцентом (Сохранить) ── */
        #dashboard-save, .btn-primary {
            background-color: #0097dc !important;
            border-color: #0097dc !important;
            color: #ffffff !important;
        }
        #dashboard-save:hover, .btn-primary:hover {
            background-color: #007ab3 !important;
            border-color: #007ab3 !important;
        }
        .btn-secondary {
            background-color: #2e3d57 !important;
            border-color: #4d545f !important;
            color: #c2c2c2 !important;
        }
        .btn-secondary:hover { background-color: #3d5073 !important; }

        .config-field, .config-field-full, .settings-section, .donors-plain-wrap {
            background-color: #161c27 !important;
            color: #c2c2c2 !important;
            border-color: #4d545f !important;
        }
        .danger-zone {
            background-color: rgba(222,61,61,0.08) !important;
            border-color: rgba(222,61,61,0.3) !important;
        }
        .dashboard-actions-sticky {
            background: linear-gradient(to top, #1b2434 85%, rgba(27,36,52,0) 100%) !important;
            box-shadow: 0 -2px 8px rgba(0,0,0,0.4) !important;
        }

        /* ── Предупреждения/подсказки ── */
        .settings-warning {
            background-color: rgba(180,140,0,0.1) !important;
            border: 1px solid rgba(180,140,0,0.25) !important;
            border-radius: 6px !important;
            color: #c2c2c2 !important;
        }

        /* ── Прокси: карточки интерфейсов ── */
        .proxy-interface-tile {
            background-color: #1b2434 !important;
            border: 1px solid #4d545f !important;
            color: #c2c2c2 !important;
        }
        .proxy-interface-tile .interface-name {
            color: #c2c2c2 !important;
        }
        .proxy-interface-tile img {
            filter: invert(0.7) !important;
        }

        /* ── Прокси: JSON редактор ── */
        .proxy-json-editor-container {
            background-color: #161c27 !important;
        }
        .json-editor-lines {
            background-color: #161c27 !important;
        }
        .json-line-number {
            color: #4d545f !important;
        }
        .json-bracket-match {
            background-color: rgba(0,151,220,0.45) !important;
            outline: 1px solid rgba(0,151,220,1) !important;
        }
        .json-editor-textarea {
            caret-color: #c2c2c2 !important;
            color: #c2c2c2 !important;
            background: transparent !important;
        }
        .json-editor-textarea::selection {
            background-color: rgba(0,151,220,0.4) !important;
            color: #ffffff !important;
        }

        /* ── Прокси: JSON вкладки ── */
        .proxy-json-tab {
            background-color: #2e3d57 !important;
            color: #949b9f !important;
            border-color: #4d545f !important;
        }
        .proxy-json-tab.active {
            background-color: #0097dc !important;
            color: #ffffff !important;
            border-color: #0097dc !important;
        }

        /* ── Страница информации ── */
        .info-content h2,
        .info-content h3 {
            color: #c8d0d8 !important;
            font-weight: 600 !important;
        }
        .info-content li,
        .info-content p {
            color: #8d97a5 !important;
        }
        .info-content code {
            background: rgba(0,151,220,0.12) !important;
            color: #7ec8e3 !important;
            padding: 1px 5px !important;
            border-radius: 3px !important;
        }
        .info-content pre {
            background: #0d1520 !important;
            color: #8d97a5 !important;
            border: 1px solid #2e3d57 !important;
            border-radius: 4px !important;
            padding: 10px 14px !important;
        }
        .diag-command {
            background: #0d1520 !important;
            color: #7ec8e3 !important;
            border: 1px solid #2e3d57 !important;
            border-radius: 4px !important;
            padding: 4px 10px !important;
        }
        .info-content a {
            color: #5b9bd5 !important;
            text-decoration: none !important;
        }
        .info-content a:hover {
            color: #7eb8f0 !important;
            text-decoration: underline !important;
        }
        .info-content summary {
            color: #8d97a5 !important;
            cursor: pointer !important;
        }
        .info-content details {
            color: #8d97a5 !important;
        }
        .info-content summary:hover {
            color: #a8b2bd !important;
        }

        /* ── Переключатели ── */
        /* OFF-состояние: тёмный нейтральный вместо светло-серого */
        .domain-checkbox {
            background-color: #3d4a5a !important;
        }
        /* ON-состояние: синий акцент */
        .domain-entry input:checked ~ .domain-checkbox {
            background-color: #0097dc !important;
        }
        /* geo-toggle (авто-обновление) */
        .geo-toggle-slider {
            background-color: #3d4a5a !important;
        }
        .geo-toggle input:checked ~ .geo-toggle-slider {
            background-color: #0097dc !important;
        }

        /* ── Логотип в шапке ── */
        header h1 a.header-link {
            color: #ffffff !important;
            font-size: 20px !important;
            font-weight: 700 !important;
            letter-spacing: 0.5px !important;
            text-decoration: none !important;
        }
        header h1 a.header-link .neo-glow {
            color: #00d4ff !important;
            font-style: italic !important;
            text-shadow:
                0 0 6px rgba(0,212,255,1),
                0 0 14px rgba(0,212,255,0.7),
                0 0 28px rgba(0,212,255,0.4) !important;
        }

        /* ── Футер-кнопки (GitHub, версия, Donate) ── */
        .button-container button {
            background-color: #2e3d57 !important;
            color: #c2c2c2 !important;
            border: 1px solid #4d545f !important;
            border-radius: 8px !important;
        }
        .button-container button .icon,
        .button-container button img {
            filter: invert(1) brightness(0.8) !important;
        }

        /* ── Скроллбары ── */
        textarea { scrollbar-width: thin; scrollbar-color: #3d5073 transparent; }
        textarea::-webkit-scrollbar { width: 4px; }
        textarea::-webkit-scrollbar-track { background: transparent; margin: 4px 0; }
        textarea::-webkit-scrollbar-thumb { background: #3d5073; border-radius: 10px; }
        textarea::-webkit-scrollbar-thumb:hover { background: #0097dc; }

        html, body, .main-content { scrollbar-width: thin; scrollbar-color: #3d5073 #1b2434; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #1b2434; }
        ::-webkit-scrollbar-thumb { background: #3d5073; border-radius: 10px; border: 1px solid #1b2434; }
        ::-webkit-scrollbar-thumb:hover { background: #0097dc; }
        ::-webkit-scrollbar-corner { background: #1b2434; }

        /* ── Autofill override ── */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 9999px #1b2434 inset !important;
            box-shadow: 0 0 0 9999px #1b2434 inset !important;
            -webkit-text-fill-color: #c2c2c2 !important;
            transition: background-color 9999s ease-in-out 0s !important;
            caret-color: #c2c2c2 !important;
        }
    `;

    // ─── CSS страницы логина ─────────────────────────────────────────────────
    const LOGIN_CSS = `
        body {
            background: linear-gradient(to right, #1b2434 50%, #0097dc 50%) !important;
            min-height: 100vh !important;
            display: flex !important;
            align-items: center !important;
        }
        body::after {
            content: 'HYDRA ROUTE NEO';
            position: fixed;
            right: 0; top: 50%;
            transform: translateY(-50%);
            width: 50%; text-align: center;
            font-size: 28px; font-weight: 300;
            letter-spacing: 6px;
            color: rgba(255,255,255,0.75);
            pointer-events: none; z-index: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* Карточка */
        .DIV-0 {
            background-color: #1d2940 !important;
            border: 1px solid rgba(255,255,255,0.09) !important;
            border-radius: 8px !important;
            box-shadow: none !important;
            position: relative !important;
            z-index: 1 !important;
            margin-left: calc(25vw - 191px) !important;
        }

        /* Лейбл на странице логина — фон карточки */
        .LABEL-1 {
            background-color: #1d2940 !important;
            color: #949b9f !important;
            font-size: 11px !important;
        }

        /* Поля ввода + autofill */
        #login, #password, .INPUT-1,
        input[type="text"], input[type="password"] {
            background: #1b2434 !important;
            background-color: #1b2434 !important;
            color: #c2c2c2 !important;
            border-color: #4d545f !important;
            -webkit-box-shadow: 0 0 0 9999px #1b2434 inset !important;
            box-shadow: 0 0 0 9999px #1b2434 inset !important;
            -webkit-text-fill-color: #c2c2c2 !important;
            transition: background-color 9999s ease-in-out 0s !important;
            caret-color: #c2c2c2 !important;
        }
        #login:focus, #password:focus, .INPUT-1:focus {
            border-color: #0097dc !important;
            outline: none !important;
        }
        #login:-webkit-autofill, #password:-webkit-autofill,
        .INPUT-1:-webkit-autofill, input:-webkit-autofill,
        input:-webkit-autofill:hover, input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 9999px #1b2434 inset !important;
            box-shadow: 0 0 0 9999px #1b2434 inset !important;
            -webkit-text-fill-color: #c2c2c2 !important;
            transition: background-color 9999s ease-in-out 0s !important;
            caret-color: #c2c2c2 !important;
        }
    `;

    // ─── Применение темы ─────────────────────────────────────────────────────
    let darkEnabled = GM_getValue('darkEnabled', true);

    function applyTheme() {
        document.getElementById('keenetic-dark-theme')?.remove();
        document.getElementById('login-autofill-fix')?.remove();

        if (!darkEnabled) return;

        const isLogin = window.location.pathname.startsWith('/login');
        const style = document.createElement('style');
        style.id = 'keenetic-dark-theme';
        style.textContent = isLogin ? DARK_CSS + LOGIN_CSS : DARK_CSS;
        document.head.appendChild(style);

        if (isLogin) applyLoginJS();
    }

    function applyLoginJS() {
        const tryFix = () => {
            const inputs = document.querySelectorAll('input');
            if (!inputs.length) { setTimeout(tryFix, 100); return; }

            inputs.forEach(inp => {
                inp.setAttribute('autocomplete', 'new-password');
                inp.style.setProperty('-webkit-box-shadow', '0 0 0 9999px #1b2434 inset', 'important');
                inp.style.setProperty('box-shadow', '0 0 0 9999px #1b2434 inset', 'important');
                inp.style.setProperty('-webkit-text-fill-color', '#c2c2c2', 'important');
                inp.style.setProperty('transition', 'background-color 9999s ease-in-out 0s', 'important');
                inp.style.setProperty('caret-color', '#c2c2c2', 'important');
            });

            // Дополнительный блок в конце body — максимальный приоритет
            const bodyStyle = document.createElement('style');
            bodyStyle.id = 'login-autofill-fix';
            bodyStyle.textContent = `
                #login, #password, .INPUT-1 {
                    -webkit-box-shadow: 0 0 0 9999px #1b2434 inset !important;
                    box-shadow: 0 0 0 9999px #1b2434 inset !important;
                    -webkit-text-fill-color: #c2c2c2 !important;
                    background: #1b2434 !important;
                    color: #c2c2c2 !important;
                    transition: background-color 9999s ease-in-out 0s !important;
                    caret-color: #c2c2c2 !important;
                }
                .LABEL-1 {
                    background-color: #161c27 !important;
                    color: #949b9f !important;
                }
                #login:-webkit-autofill, #password:-webkit-autofill,
                .INPUT-1:-webkit-autofill, input:-webkit-autofill,
                input:-webkit-autofill:hover, input:-webkit-autofill:focus,
                input:-webkit-autofill:active {
                    -webkit-box-shadow: 0 0 0 9999px #1b2434 inset !important;
                    box-shadow: 0 0 0 9999px #1b2434 inset !important;
                    -webkit-text-fill-color: #c2c2c2 !important;
                    transition: background-color 9999s ease-in-out 0s !important;
                    caret-color: #c2c2c2 !important;
                }
            `;
            document.body.appendChild(bodyStyle);
        };
        setTimeout(tryFix, 300);
    }

    // ─── Стилизация логотипа в шапке ─────────────────────────────────────────
    function styleHeaderLogo() {
        const link = document.querySelector('header h1 a.header-link');
        if (!link || link.querySelector('.neo-glow')) return;
        link.innerHTML = link.innerHTML.replace('Neo', '<span class="neo-glow">Neo</span>');
    }

    // ─── Кнопка переключения (верхний правый угол) ───────────────────────────
    function addToggleButton() {
        if (document.getElementById('theme-toggle-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'theme-toggle-btn';
        btn.style.cssText = `
            position: fixed;
            top: 12px;
            right: 16px;
            z-index: 999999;
            background: #2e3d57;
            color: #c2c2c2;
            border: 1px solid #4d545f;
            border-radius: 20px;
            padding: 6px 14px;
            cursor: pointer;
            font-size: 12px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            box-shadow: 0 2px 8px rgba(0,0,0,0.5);
            transition: background 0.2s, border-color 0.2s;
            line-height: 1.4;
        `;

        const updateBtn = () => {
            btn.innerHTML = darkEnabled
                ? `<span style="margin-right:5px;font-size:11px">☀️</span>Светлая тема`
                : `<span style="margin-right:5px;font-size:11px">🌑</span>Тёмная тема`;
        };
        updateBtn();

        btn.onmouseenter = () => {
            btn.style.background = '#3d5073';
            btn.style.borderColor = '#0097dc';
        };
        btn.onmouseleave = () => {
            btn.style.background = '#2e3d57';
            btn.style.borderColor = '#4d545f';
        };
        btn.onclick = () => {
            darkEnabled = !darkEnabled;
            GM_setValue('darkEnabled', darkEnabled);
            updateBtn();
            applyTheme();
        };

        document.body.appendChild(btn);
    }

    // ─── Инициализация ───────────────────────────────────────────────────────
    function init() {
        applyTheme();
        addToggleButton();
        styleHeaderLogo();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // SPA-навигация Angular (смена URL без перезагрузки страницы)
    let lastPath = location.pathname;
    const observer = new MutationObserver(() => {
        if (location.pathname !== lastPath) {
            lastPath = location.pathname;
            setTimeout(() => {
                applyTheme();
                addToggleButton();
                styleHeaderLogo();
            }, 200);
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

})();