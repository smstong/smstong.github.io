**CSS FAQ**
# How to make a flex column not stretch if other columns exists, but stretch if it's the only column in a row? 
This can be achived by setting its ***flex*** value to a very small number compared to other flexible children.

HTML
```html
<div id="flex-container">
    <div id="sidebar"></div>
    <div id="content"></div>
</div>
```
CSS
```css
#flex-container {
    display: flex;
    flex-wrap: wrap;
}
#sidebar {
    flex: 1;
}
#content {
    flex: 1000;
}
```
**Note**: 1 is a very small number compared to 1000, while 0.01 is a very small number compared to 1. However, for most browsers, 0.001 doesn't work. So it's better to use integers (1,1000) than (0.01, 1).