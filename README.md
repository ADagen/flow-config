Just my Flow config
====================

# INTEGRATION:  
* PyCharm https://www.jetbrains.com/help/pycharm/2016.3/using-the-flow-type-checker.html  
* Atom: https://github.com/flowtype/ide-flowtype  

# USAGE  
As we added Glow, we should update `package.json` scripts as noticed [here](https://github.com/thejameskyle/glow#usage).  
This package enhanced with auto-added pre-commit hook, so you need just to install it:  
```
yarn add -D @dagen/flow-config
```
or
```
npm i -SD @dagen/flow-config
```

For flow coverage report just add command to package.json scripts:
```
yarn flow-coverage-report -i 'src/**/*.js' -t html -t text
```

# CHANGELOG

All notable changes to this project will be documented in this file.  
This project adheres to [Semantic Versioning](http://semver.org/).  
This change log adheres to standards from [Keep a CHANGELOG](http://keepachangelog.com).

### [0.1.2] - 2018-05-03
* fix typo

### [0.1.1] - 2018-05-03
* move jsonfile from peerDeps

### [0.1.0] - 2018-05-02
* add flow-bin [0.70.0](https://github.com/facebook/flow/releases/tag/v0.70.0)
* add flow-coverage-report [0.5.0](https://github.com/rpl/flow-coverage-report/tree/master#050)
* add glow v1.2.2 (see https://medium.freecodecamp.org/3d469931eabb)
* start with precommit hook checks only changed files (and all dependencies)
* changelog whipped into shape (теперь всё как у взрослых)
