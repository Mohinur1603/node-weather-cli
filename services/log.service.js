import chalk from "chalk";
const error = chalk.bold.red;
const success = chalk.bold.bgBlue;
const help = chalk.bgCyan;
const printError = (err) => {
	console.log(error("ERROR" + " " + err));
};
const printSuccess = (msg) => {
	console.log(success("SUCCESS" + " " + msg));
};
const printHelp = () => {
	console.log(`
${help("HELP")}
-s [CiTY] for install city
-h for help
-t [API_KEY] for saving token
  `);
};
const printWeather = (response, icon) => {
	console.log(`
		${chalk.bgYellowBright("WEATHER")} City weather ${response.name}
		${icon}  ${response.weather[0].description}
		Temperature: ${response.main.temp} (feels like ${response.main.feels_like})
		Humidity: ${response.main.humidity}%
		Wind speed: ${response.wind.speed}
	`);
};
export { printError, printSuccess, printHelp, printWeather };
