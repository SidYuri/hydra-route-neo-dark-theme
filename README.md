# Hydra Route Neo — Тёмная тема в стиле Keenetic

Пользовательский скрипт Tampermonkey для веб-интерфейса **Hydra Route Neo**, добавляющий тёмную тему в стиле Keenetic.

---

## Возможности

- Тёмная тема в палитре Keenetic с синим акцентом
- Поддержка **Hydra Route Neo v1.16+** и старых версий
- Адаптивный грид групп доменов — автоматически подстраивается под ширину окна
- Переключение темы через встроенную кнопку интерфейса (v1.16+) или собственную кнопку (старые версии)
- Выбор темы сохраняется между сессиями

---

## Установка

### 1. Установить Tampermonkey

Расширение доступно для всех популярных браузеров:

| Браузер | Ссылка |
|---------|--------|
| Chrome / Edge / Opera | [Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| Firefox | [Firefox Add-ons](https://addons.mozilla.org/ru/firefox/addon/tampermonkey/) |
| Safari | [App Store](https://apps.apple.com/app/tampermonkey/id1482490089) |

### 2. Установить скрипт

Нажми на кнопку ниже — Tampermonkey автоматически откроет диалог установки:

[![Установить скрипт](https://img.shields.io/badge/Установить-скрипт-blue?style=for-the-badge)](https://raw.githubusercontent.com/SidYuri/hydra-route-neo-dark-theme/main/hydra-route-neo-dark-theme.user.js)

Или вручную:
1. Открой Tampermonkey → **Создать новый скрипт**
2. Удали весь текст в редакторе
3. Вставь содержимое файла [`hydra-route-neo-dark-theme.user.js`](hydra-route-neo-dark-theme.user.js)
4. Нажми **Сохранить** (`Ctrl+S`)

### 3. Открыть интерфейс Hydra Route Neo

Перейди на веб-интерфейс — обычно это `http://192.168.X.X:2000/`. Тёмная тема применится автоматически.

---

## Использование

- **v1.16+** — переключение темы через встроенную кнопку в правом верхнем углу шапки.
- **Старые версии** — в правом верхнем углу появится кнопка **🌑 Тёмная тема / ☀️ Светлая тема**.
- Выбор сохраняется между сессиями.

---

## Совместимость

- Hydra Route Neo (порт `2000`)
- Браузеры: Chrome, Firefox, Edge, Opera, Safari (через Tampermonkey)

---

## Проблемы и предложения

Если что-то не работает или есть идеи по улучшению — [создай issue](https://github.com/SidYuri/hydra-route-neo-dark-theme/issues).
