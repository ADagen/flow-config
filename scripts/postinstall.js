const jsonfile = require('jsonfile');
const fs = require('fs');
const process = require('process');

const FLOW = 'flow';
const FLOW_PRE = 'flow-precommit';
const FLOW_TYPED = 'flow-typed';
const PRE_COMMIT = 'pre-commit';

try {
    process.chdir('../../');
    const packaged = jsonfile.readFileSync('package.json');
    console.log(`Opened: ${packaged.name}@${packaged.version}`);

    /**
     * Добавляем в scripts
     */
    if (!packaged.scripts) packaged.scripts = {};
    if (packaged.scripts[FLOW]) {
        console.log(`Что-то уже добавлено в scripts.${FLOW}`);
    } else {
        packaged.scripts[FLOW] = './node_modules/flow-config/node_modules/.bin/flow';
    }
    if (packaged.scripts[FLOW_TYPED]) {
        console.log(`Что-то уже добавлено в scripts.${FLOW_TYPED}`);
    } else {
        packaged.scripts[FLOW_TYPED] = './node_modules/.bin/flow-typed';
    }
    if (packaged.scripts[FLOW_PRE]) {
        console.log(`Что-то уже добавлено в scripts.${FLOW_PRE}`);
    } else {
        packaged.scripts[FLOW_PRE] = 'bash ./node_modules/flow-config/scripts/pre-commit';
    }

    /**
     * Регистрируем для пакета pre-commit
     */
    if (!(packaged[PRE_COMMIT] instanceof Array)) {
        packaged[PRE_COMMIT] = [];
    }
    if (!packaged[PRE_COMMIT].includes(FLOW_PRE)) {
        packaged[PRE_COMMIT].push(FLOW_PRE);
    }

    jsonfile.writeFileSync('package.json', packaged, {spaces: 2});
    console.log('flow-config successfully added to package.json');

    /**
     * Создаю файл .flowconfig, если его ещё нет
     */
    if (!fs.existsSync('.flowconfig')) {
        var rd = fs.createReadStream('./node_modules/flow-config/.flowconfig');
        rd.on("error", function (err) {
            console.log(err);
        });
        var wr = fs.createWriteStream('.flowconfig');
        wr.on("error", function (err) {
            console.log(err);
        });
        wr.on("close", function (ex) {
            console.log('.flowconfig was created');
        });
        rd.pipe(wr);

    } else {
        console.log('.flowconfig already exists');
    }

} catch (error) {
    if (error.message === 'ENOENT, no such file or directory \'package.json\'') {
        throw new Error('Нет доступа или нет package.json, прекоммит хук не добавлен');
    } else {
        console.log('Невалидный package.json, прекоммит хук не добавлен');
    }
}
