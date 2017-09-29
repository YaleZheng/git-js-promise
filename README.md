# git-js-promise
promise version of project [git-js](https://github.com/steveukx/git-js)

# Installation
`npm install yale-simple-git-promise`

# Usage
```javascript
const {Git} = require('yale-simple-git-promise')

const workdir = 'path/to/your/workdir'
const client = new Git(workdir)
const logs = await client.log()
```

# Document
all document could be found on [git-js](https://github.com/steveukx/git-js)
