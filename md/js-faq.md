**JavaScript FAQ**

# How to upload file with "fetch()" API?

"FormData" type support uploading files. Fetch API will automcatically set HTTP header 'Content-Type: multipart/formdata;boundary="....."'.

HTML
```html
<input id="msg" type="text" name="msg" />
<input id="myfile" type="file" name="myfile" />
```

JS
```javascript
async function uploadFile(url) {
    const formData = new FormData;
    const fileE = document.getElementById("myfile");
    const msgE = document.getElementById("msg");
    formData.append(msgE.name, msgE.value);
    formData.append(fileE.name,  fileE.files[0]); // "File" type

    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        body: formData,
    });

    // here assuming returning a binary http body
    const r = await response.blob();
    return r;
}
```

# What's new of ES6(2015)?

- block scoped "let" and "const" to replace non-block scoped "var"
- ESM (EcmaScriptModule)
- Arrow functions
- template string
- classes
- Promises

# When asyn/await was introduced into JS?

Introduced by ECMAScript 2017, async/await are the syntax sugar to use Promises.