# Пример перекрашивания иконок в цвет текста (currentColor) помощью css свойства mask-image

- Иконка перекрасится в соответствием с цветом текста родителя (цвет со значением currentColor)
- Самое простое для понимания и поддержки решение


### HTML
```html
<div class="icon"></div>
```


### CSS
```css
.icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    background-color: currentColor;
    mask-image: url("./heart-icon.svg");
    mask-position: center center;
}
```
