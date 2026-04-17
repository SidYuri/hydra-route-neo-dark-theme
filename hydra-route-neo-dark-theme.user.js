// ==UserScript==
// @name         Hydra Route Neo — Keenetic Dark Theme
// @namespace    http://tampermonkey.net/
// @version      0.12
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
        /* ── v1.16: Keenetic palette через data-theme ── */
        [data-theme="dark"] {
            --color-text-primary:   #c2c2c2 !important;
            --color-text-secondary: #949b9f !important;
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

        /* ── v1.16: Стиль встроенного переключателя темы ── */
        #theme-toggle {
            border-color: #4d545f !important;
            color: #c2c2c2 !important;
        }
        #theme-toggle:hover {
            border-color: #0097dc !important;
            color: #0097dc !important;
        }

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

        body {
            color: #949b9f !important;
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

        /* ── v1.16: .neo-text (логотип, уже в DOM) ── */
        a.header-link .neo-text,
        .DIV-1 .neo-text {
            color: #00d4ff !important;
            font-style: italic !important;
            text-shadow:
                0 0 6px rgba(0,212,255,1),
                0 0 14px rgba(0,212,255,0.7),
                0 0 28px rgba(0,212,255,0.4) !important;
        }

        /* ── v1.16: Подзаголовок и метрики ── */
        .subtitle { color: #949b9f !important; }
        .metric-label { color: #6f737b !important; }
        .metric-value { color: #c2c2c2 !important; }
        .header-metrics { color: #949b9f !important; }

        /* ── v1.16: Карточки политик ── */
        .policy-card {
            background-color: #161c27 !important;
            border: 1px solid #4d545f !important;
            color: #c2c2c2 !important;
        }
        .policy-card-header {
            border-bottom: 1px solid #4d545f !important;
        }
        .policy-card-name,
        .policy-card-connection { color: #949b9f !important; }
        .policy-swap-btn {
            background-color: #2e3d57 !important;
            border-color: #4d545f !important;
            color: #c2c2c2 !important;
        }
        .policy-swap-btn:hover { background-color: #3d5073 !important; }

        /* ── v1.16: Кнопка опасного действия ── */
        .btn-danger, .btn.btn-danger {
            background-color: #de3d3d !important;
            border-color: #de3d3d !important;
            color: #ffffff !important;
        }
        .btn-danger:hover, .btn.btn-danger:hover {
            background-color: #b83030 !important;
            border-color: #b83030 !important;
        }

        /* ── v1.16: Вкладки типа прокси ── */
        .proxy-type-tab {
            background-color: #2e3d57 !important;
            color: #949b9f !important;
            border-color: #4d545f !important;
        }
        .proxy-type-tab.active {
            background-color: #0097dc !important;
            color: #ffffff !important;
            border-color: #0097dc !important;
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

        /* ── Иконки info ── */
        img.config-info-icon,
        .description-toggle img {
            filter: invert(1) opacity(0.5) !important;
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

        /* ── Мобильная версия ── */
        @media (max-width: 768px) {
            html, body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                overflow-x: hidden !important;
            }
            body {
                background: #161e2d !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: flex-start !important;
                padding-top: 15vh !important;
                box-sizing: border-box !important;
                height: 100vh !important;
                min-height: unset !important;
            }
            body::after { display: none !important; }
            body > div:nth-child(4) { display: none !important; }
            .DIV-0 {
                margin: 0 !important;
                position: relative !important;
            }
        }

        /* ── v1.16: Обёртка поля ввода (Material-style) ── */
        .NDW-INPUT-1 {
            border-bottom: 1px solid #4d545f !important;
        }
        .NDW-INPUT-1:focus-within {
            border-bottom-color: #0097dc !important;
        }

        /* ── v1.16: Поле пароля ── */
        .INPUT-PASSWORD {
            background: #1b2434 !important;
            background-color: #1b2434 !important;
            color: #c2c2c2 !important;
            border: 1px solid #4d545f !important;
            -webkit-box-shadow: 0 0 0 9999px #1b2434 inset !important;
            box-shadow: 0 0 0 9999px #1b2434 inset !important;
            -webkit-text-fill-color: #c2c2c2 !important;
            caret-color: #c2c2c2 !important;
        }
        .INPUT-PASSWORD:-webkit-autofill,
        .INPUT-PASSWORD:-webkit-autofill:hover,
        .INPUT-PASSWORD:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 9999px #1b2434 inset !important;
            box-shadow: 0 0 0 9999px #1b2434 inset !important;
            -webkit-text-fill-color: #c2c2c2 !important;
        }

        /* ── v1.16: Кнопка «Войти» ── */
        .BUTTON-0 {
            background-color: #0097dc !important;
            border-color: #0097dc !important;
            color: #ffffff !important;
            width: 100% !important;
        }
        .BUTTON-0:hover {
            background-color: #007ab3 !important;
            border-color: #007ab3 !important;
        }
    `;

    // ─── Лейаут: адаптивный грид (применяется всегда, независимо от темы) ────
    const LAYOUT_CSS = `
        /* Снимаем ограничение ширины */
        .dashboard-policies-list,
        .dashboard-create-buttons { max-width: none !important; }

        /* Адаптивный грид групп доменов */
        .policy-card-content-inner {
            display: grid !important;
            grid-template-columns: repeat(auto-fill, minmax(min(380px, 100%), 1fr)) !important;
            flex-direction: unset !important;
            align-items: start !important;
        }

        /* Карточка группы — на всю ширину ячейки */
        div.domain-entry {
            width: 100% !important;
            box-sizing: border-box !important;
            min-width: 0 !important;
        }

        /* Textarea группы — на всю ширину */
        div.domain-entry textarea {
            width: 100% !important;
            box-sizing: border-box !important;
        }

        /* Название группы — не обрезать */
        .domain-header > *:not(button) {
            min-width: max-content !important;
            overflow: visible !important;
            text-overflow: clip !important;
        }

        /* Кнопка «+ поле» — по верхнему краю ячейки */
        .add-field-btn { align-self: start !important; }

        /* Развёрнутая карточка — без ограничения высоты */
        .policy-card:not(.policy-card--collapsed) .policy-card-content {
            max-height: none !important;
            overflow: visible !important;
        }

        /* Адаптивный flex-грид страницы Настройки */
        .settings-content:not([style*="display: none"]) {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 16px !important;
            align-items: stretch !important;
        }
        .settings-content .description-container {
            flex: 0 0 100% !important;
        }
        .settings-section {
            flex: 1 1 480px !important;
            max-width: none !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
        }

        /* Прокси: контейнер плиток интерфейсов на всю ширину */
        div:has(> .proxy-interface-tile) {
            width: 100% !important;
            grid-template-columns: repeat(auto-fill, minmax(180px, 350px)) !important;
        }

        /* Страница Hydra Route: секции на всю ширину */
        /* v1.20: .hrneo-settings-section получил max-width:580px в стоке — снимаем */
        .hrneo-settings-section {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            max-width: none !important;
        }
        .geo-files-section,
        .danger-zone,
        .diag-section {
            width: 100% !important;
            max-width: none !important;
            box-sizing: border-box !important;
        }

        /* Основной контент: учитывать padding в ширине */
        .main-content {
            box-sizing: border-box !important;
            min-width: 0 !important;
        }

        /* GeoIP/GeoSite: одна колонка по умолчанию (мобильные) */
        .geo-files-content,
        .geo-files-content > div:first-child {
            display: block !important;
        }

        /* GeoIP/GeoSite: 2 колонки для строк и полей */
        @media (min-width: 700px) {
            .geo-files-content > div:first-child {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 8px !important;
            }
            .geo-files-content {
                display: grid !important;
                grid-template-columns: 1fr 1fr !important;
                gap: 12px !important;
                align-items: start !important;
            }
            .geo-files-content > div:first-child,
            .geo-autoupdate {
                grid-column: 1 / -1 !important;
            }
        }
        .geo-file-row { border-bottom: none !important; }
        .geo-autoupdate { border-top: none !important; }

        /* Danger Zone: адаптивный грид полей */
        .hrneo-config-form {
            width: 100% !important;
            max-width: none !important;
            grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr)) !important;
        }

        /* Скроллбары — светлая тема */
        *::-webkit-scrollbar { width: 6px; height: 6px; }
        *::-webkit-scrollbar-track { background: #ebebeb; border-radius: 3px; }
        *::-webkit-scrollbar-thumb { background: #c0c0c0; border-radius: 3px; }
        *::-webkit-scrollbar-thumb:hover { background: #2396da; }
        *::-webkit-scrollbar-corner { background: #ebebeb; }
    `;

    // ─── Применение темы ─────────────────────────────────────────────────────
    let darkEnabled = GM_getValue('darkEnabled', true);

    // Определяем v1.16+ по наличию data-theme на <html>, #theme-toggle или нового класса логина
    const isV116 = () =>
        document.documentElement.hasAttribute('data-theme') ||
        !!document.querySelector('#theme-toggle') ||
        !!document.querySelector('.NDW-FORM-0');

    function applyTheme() {
        document.getElementById('keenetic-dark-theme')?.remove();
        document.getElementById('keenetic-layout')?.remove();
        document.getElementById('login-autofill-fix')?.remove();

        // Лейаут — всегда, на любой странице кроме логина
        if (!window.location.pathname.startsWith('/login')) {
            const layout = document.createElement('style');
            layout.id = 'keenetic-layout';
            layout.textContent = LAYOUT_CSS;
            document.head.appendChild(layout);
        }

        if (isV116()) {
            // v1.16: синхронизируем data-theme с нашим сохранённым состоянием
            // (только если не совпадает, чтобы не зациклить MutationObserver)
            const wanted = darkEnabled ? 'dark' : 'light';
            if (document.documentElement.getAttribute('data-theme') !== wanted) {
                document.documentElement.setAttribute('data-theme', wanted);
            }
        }

        if (!darkEnabled) return;

        const isLogin = window.location.pathname.startsWith('/login');
        const style = document.createElement('style');
        style.id = 'keenetic-dark-theme';
        style.textContent = isLogin ? DARK_CSS + LOGIN_CSS : DARK_CSS;
        document.head.appendChild(style);

        if (isLogin) applyLoginJS();
    }

    // ─── v1.16: Синхронизация с встроенной кнопкой переключения ─────────────
    function watchV116Theme() {
        const htmlEl = document.documentElement;
        const observer = new MutationObserver(() => {
            const isDark = htmlEl.getAttribute('data-theme') === 'dark';
            if (isDark !== darkEnabled) {
                darkEnabled = isDark;
                GM_setValue('darkEnabled', darkEnabled);
                applyTheme();
            }
        });
        observer.observe(htmlEl, { attributes: true, attributeFilter: ['data-theme'] });
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
                #login, #password, .INPUT-1, .INPUT-PASSWORD {
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
                .INPUT-1:-webkit-autofill, .INPUT-PASSWORD:-webkit-autofill,
                input:-webkit-autofill,
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

    // ─── Заметка в настройках о чекбоксе «Две колонки» ──────────────────────
    function annotateColumnsCheckbox() {
        if (document.getElementById('keenetic-columns-note')) return;
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.includes('колонки групп')) break;
            node = null;
        }
        if (!node) return;
        const section = node.parentElement.closest('.settings-section');
        if (!section) return;

        const note = document.createElement('div');
        note.id = 'keenetic-columns-note';
        note.style.cssText = `
            margin-top: 8px;
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 12px;
            background: rgba(0,151,220,0.1);
            border: 1px solid rgba(0,151,220,0.3);
            color: #7ec8e3;
            line-height: 1.5;
        `;
        note.innerHTML = '⚡ При активной <a href="https://github.com/SidYuri/hydra-route-neo-dark-theme" target="_blank" '
            + 'style="color:#0097dc;text-decoration:none;">теме в стиле Keenetic</a> от '
            + '<a href="https://t.me/SidYuri" target="_blank" '
            + 'style="color:#0097dc;text-decoration:none;">@SidYuri</a>'
            + ' этот параметр не используется — применяется динамический адаптивный грид.';
        section.appendChild(note);
    }

    // ─── Стилизация логотипа в шапке ─────────────────────────────────────────
    function styleHeaderLogo() {
        // v1.16: .neo-text уже в DOM, стилизуется через CSS — ничего не нужно
        if (isV116()) return;
        // Старая версия: инжектируем .neo-glow вручную
        const link = document.querySelector('header h1 a.header-link');
        if (!link || link.querySelector('.neo-glow')) return;
        link.innerHTML = link.innerHTML.replace('Neo', '<span class="neo-glow">Neo</span>');
    }

    // ─── Кнопка переключения (верхний правый угол, только для старой версии) ──
    function addToggleButton() {
        if (isV116()) return; // v1.16 использует встроенную кнопку #theme-toggle
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
        if (isV116()) {
            watchV116Theme(); // v1.16: следим за встроенной кнопкой
        } else {
            addToggleButton(); // старая версия: своя кнопка
        }
        styleHeaderLogo();
        annotateColumnsCheckbox();
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
                if (!isV116()) addToggleButton();
                styleHeaderLogo();
                annotateColumnsCheckbox();
            }, 200);
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

})();