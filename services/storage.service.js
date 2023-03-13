import os from "os";
import fs from "fs";
import path from "path";

const filePath = path.join(os.homedir(), "weather-data.json");

export const TOKEN_DICTIONARY = {
	token: "token",
	city: "city",
};

//bu funksiya bizga node.js da file create qilib storage malumotlarni saqlaydi
export const saveKeyValue = async (key, value) => {
	//1)funksiya ishga tushganda data obyekti create bo'ladi va tekshiradi
	let data = {};
	//3)agarda bor bo'lsa filePath gadi malumotni data ga berib qo'yadi
	if (await isExist(filePath)) {
		const file = await fs.promises.readFile(filePath);
		data = JSON.parse(file);
	}
	data[key] = value;
	//promises
	await fs.promises.writeFile(filePath, JSON.stringify(data));
};
//2)bu funksiya bzi serverdagi faylimiz bormi yoki yo'qmi shuni tekshirberadi
const isExist = async (path) => {
	try {
		await fs.promises.stat(path);
		return true;
	} catch (error) {
		return false;
	}
};

//
export const getKeyValue = async (key) => {
	if (await isExist(filePath)) {
		const file = await fs.promises.readFile(filePath);
		const data = JSON.parse(file);
		return data[key];
	}
	return undefined;
};
//Iconlarni chiqazish uchun
export const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case "01":
			return "☀️";
		case "02":
			return "🌤️";
		case "03":
			return "☁️";
		case "04":
			return "☁️";
		case "09":
			return "🌧️";
		case "10":
			return "🌦️";
		case "11":
			return "🌩️";
		case "13":
			return "❄️";
		case "50":
			return "🌫️";
		default:
			return "☁️";
	}
};
