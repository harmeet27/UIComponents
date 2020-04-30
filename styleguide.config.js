const path = require('path');
const pkg = require('./package.json');
const defaultWebpackConfig = require('./webpack.config.js')();

module.exports = {
    title: 'UI Components',
    serverPort: 6060,
    sections:[{ name: 'Components', components: 'src/components/*/[A-Z]*.js'}],
    exampleMode: 'collapse',
    usageMode: 'expand',
    getComponentPathLine(componentPath){
        const name = path.basename(componentPath, '.js');
        return `import { ${name} } from '${pkg.name}'`
    },
    webpackConfig: {...defaultWebpackConfig, mode: 'development'}
  };
