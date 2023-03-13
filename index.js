import getArgs from "./helpers/args.js";
import getWeather from "./services/api.service.js";
import {
	printError,
	printSuccess,
	printHelp,
	printWeather,
} from "./services/log.service.js";
import {
	getIcon,
	getKeyValue,
	saveKeyValue,
	TOKEN_DICTIONARY,
} from "./services/storage.service.js";

//bu funksiya
const saveToken = async (token) => {
	//agar token berilmasa bu funksiya ishlamiydi va to'xtaydi
	if (!token.length) {
		printError("Token dosn't exist");
		return;
	}
	//agar berilsa davom etadi
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess("Token was saved");
	} catch (error) {
		printError(error.message);
	}
};
//bu funktion save qiladi
const saveCity = async (city) => {
	//agar token berilmasa bu funksiya ishlamiydi va to'xtaydi
	if (!city.length) {
		printError("City dosn't exist");
		return;
	}
	//agar berilsa davom etadi
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess("City was saved");
	} catch (error) {
		printError(error.message);
	}
};

//bu funksiya response da eror bo'lganda ularni aniqlab xatolik xabari chiqaradi
const getForcast = async () => {
	try {
		const city = process.env.city ?? (await getKeyValue(TOKEN_DICTIONARY.city));
		const res = await getWeather(city);
		printWeather(res, getIcon(res.weather[0].icon));
	} catch (error) {
		if (error?.response?.status == 404) {
			printError("City not found");
		} else if (error?.response?.status == 401) {
			printError("Token is invalid");
		} else printError(error);
	}
};

const startCli = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		//help
		return printHelp();
	}
	if (args.s) {
		//saving citycls
		return saveCity(args.s);
	}
	if (args.t) {
		//save token
		return saveToken(args.t);
	}
	//result
	return getForcast();
};
startCli();
