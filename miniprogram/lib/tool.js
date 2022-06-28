function strSort(str) {
	if (str.length == 1) {
		return str
	} else {
		let arr = str.split('')
		arr.sort((s1, s2) => {
			s1 = s1.toUpperCase();
			s2 = s2.toUpperCase();
			if (s1 < s2) {
				return -1;
			}
			if (s1 > s2) {
				return 1;
			}
			return 0;
		})
		return arr.join('')
	}
}

module.exports = {
	strSort: strSort
}