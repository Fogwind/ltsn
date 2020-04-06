const axios = require('axios');
const color = require('cli-color');
const terminalLink = require('terminal-link');
const compareVersions = require('compare-versions');
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function
// async 函数返回一个promise对象
// 返回的Promise对象会运行执行(resolve)异步函数的返回结果，或者运行拒绝(reject)——如果异步函数抛出异常的话。
module.exports = async (v) => {
    const {data} = await axios.get('https://nodejs.org/dist/index.json');

    return data.filter(node => {
        const cp = v ? (compareVersions(node.version, 'v' + v + '.0.0') >= 0) : true;
        return node.lts && cp;
    }).map(it => {
        const {files, ...rest} = it;
        return {...rest};
    });
}