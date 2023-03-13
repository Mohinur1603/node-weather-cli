//bu function esa bizga obj qaytaradi, process.argv ning boshidan 2 ta parametrni olib tashlab qolganini ...rest ga olib, ularni tekshiradi: minus bilan boshlanyaptimi yo'qmi shunga qarab malumotlarni taxlaydi...
const getArgs = (args) => {
	const res = {};
	const [e, file, ...rest] = args;
	rest.forEach((v, i, arr) => {
		if (v.charAt(0) == "-") {
			if (i == arr.length - 1) {
				res[v.substring(1)] = true;
			} else if (arr[i + 1].charAt(0) != "-") {
				res[v.substring(1)] = arr[i + 1];
			} else res[v.substring(1)] = true;
		}
	});
	return res;
};
export default getArgs;
