# Пример иконки в варианте svg-sprite с подключаемым файлом-спрайтом

- SVG спрайт подключается из файла svg-sprite.svg
- В html иконки подключаются из файла-спрайта с помощью тега use

```html
<svg width="40" height="40" viewBox="0 0 512 512">
    <use xlink:href="./svg-sprite.svg#icon-heart" />
</svg>

<svg width="40" height="40" viewBox="0 0 512 512">
    <use xlink:href="./svg-sprite.svg#icon-user" />
</svg>
```