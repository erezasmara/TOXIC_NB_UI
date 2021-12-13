# Toxic Comments Classification Naive base UI
Project Structure:
```
Toxic_nb_UI
├─ README.md
├─ package-lock.json
├─ package.json
├─ public
│  ├─ css
│  │  ├─ form.css
│  │  ├─ loader.css
│  │  ├─ nav.css
│  │  ├─ popup.css
│  │  └─ style.css
│  ├─ img
│  │  ├─ bad.png
│  │  ├─ guru.png
│  │  ├─ ok.png
│  │  └─ profile_pic.jpeg
│  └─ js
│     └─ app.js
├─ src
│  ├─ app.js
│  └─ utils
│     └─ toxic.js
├─ templates
│  ├─ partials
│  │  ├─ footer.hbs
│  │  └─ header.hbs
│  └─ views
│     ├─ 404.hbs
│     ├─ about.hbs
│     ├─ help.hbs
│     ├─ home.hbs
│     └─ index.hbs



```
Description:
TOXIC application can detect if your comment is toxic, the process done by ML (written with python) ,
for more information visit github projects link.

Requirement:
- node.js 12 +
- "express": "^4.17.1",
- "hbs": "^4.1.2",
- "nodemon": "^2.0.14",
- "request": "^2.88.2"

Start:
- npm install
- npm run start
