# Пример иконки в варианте png-sprite

- Все иконки лежат в одним файле `icons-sprite.png`
- PNG спрайт применяется в качестве фона иконки
- Для отображение янужной иконки применяется свойство `background-position` для смещения фона

```html
<div class="icon icon-heart"></div>
<div class="icon icon-user"></div>
```

```css
.icon {
    height: 40px;
    width: 40px;
    background: url("./icons-sprite.png");
}

.icon-heart {
    background-position: 0 0;
}

.icon-user {
    background-position: -60px 0;
}
```