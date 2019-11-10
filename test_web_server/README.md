# vue_spa_tutorial test server using Express

### Project setup
Initial project setup. 
```
$ npm init -y
$ npm --save install express
$ cat > index.js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

$ node index.js
```
### Reference site

[Hello world example](https://expressjs.com/en/starter/hello-world.html)
