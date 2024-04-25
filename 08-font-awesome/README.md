# Пример иконки в варианте шрифта Font-awesome

- Для выбора иконки используются глифы
- Для работы данного варинта требуется подключение шрифта на странице сайта
- Размер иконок выбирается с помощью свойства `font-size`
- FontAwesome дает возможность скачать иконки как в виде шрифта так и в других вариантах
- Выбор иконки происходит за счет явного указания иконки чере ее кодировку в css свойстве content: `content: "\f007"`

### Подключение шрифта
```html
    <link rel="stylesheet" href="./fontawesome.css"
```

```css
@font-face {
    font-family: "Font Awesome 6 Free";
    font-weight: normal;
    font-style : normal;
    src : url("./webfonts/fa-regular-400.woff2");
}
```

### Применение шрифта и выбор иконок
```html
<span class="fa fa-heart"></span>
<span class="fa fa-user"></span>
```