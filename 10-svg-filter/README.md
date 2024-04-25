# Пример перекрашивания иконок в цвет текста (currentColor) помощью набора svg фильтров

- Иконка перекрасится в соответствием с цветом текста родителя (цвет со значением currentColor)
- У каждого фильтра должен быть уникальный id для примененя в текущем месте и текущим цветом текста родителя
- Не стабильно работает в некоторых версиях сафари в связи с багом. Исправлено в версии 16.4 [пруфы](https://developer.apple.com/documentation/safari-release-notes/safari-16_4-release-notes)


```html
<svg width="40" height="40">
    <filter id="filterID">
        <feFlood flood-color="currentColor" />
        <feComposite in2="SourceAlpha" operator="in" />
    </filter>
    <image width="40" height="40" href="./heart-icon.svg" filter="url(#filterID)" />
</svg>
```
