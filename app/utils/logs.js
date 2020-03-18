const chalk = require("chalk");
const { bullet, cross , tick, warning, info} = require('figures')


module.exports = {
  error: (...args) => {
    console.log(chalk.red(cross, ...args));
  },
  warn: (...args) => {
    console.log(chalk.yellow(warning, ...args));
  },
  info: (...args) => {
    console.log(chalk.blueBright(info, ...args));
  },
  success: (...args) => {
    console.log(chalk.greenBright(tick , ...args));
  }
};
