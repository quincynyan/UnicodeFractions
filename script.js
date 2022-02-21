function setCharAt(str, index, chr) {
	if (index > str.length - 1) return str;
	return str.substr(0, index) + chr + str.substr(index + 1);
}

function reduce(num, den) {
	if (num.startsWith("+")) {
		num = num.substring(1);
	}
	if (den.startsWith("+")) {
		den = den.substring(1);
	}
	const neg = num < 0 != den < 0;
	num = Math.abs(num);
	den = Math.abs(den);
	var gcd = function gcd(a, b) {
		return !b ? a : gcd(b, a % b);
	};
	var g = gcd(num, den);
	return [neg ? "-" + num / g : num / g, den / g];
}

var superscript = {
	0: "⁰",
	1: "¹",
	2: "²",
	3: "³",
	4: "⁴",
	5: "⁵",
	6: "⁶",
	7: "⁷",
	8: "⁸",
	9: "⁹",
	"+": "⁺",
	"-": "⁻",
	"=": "⁼",
	"(": "⁽",
	")": "⁾",
	a: "ᵃ",
	b: "ᵇ",
	c: "ᶜ",
	d: "ᵈ",
	e: "ᵉ",
	f: "ᶠ",
	g: "ᵍ",
	h: "ʰ",
	i: "ⁱ",
	j: "ʲ",
	k: "ᵏ",
	l: "ˡ",
	m: "ᵐ",
	n: "ⁿ",
	o: "ᵒ",
	p: "ᵖ",
	r: "ʳ",
	s: "ˢ",
	t: "ᵗ",
	u: "ᵘ",
	v: "ᵛ",
	w: "ʷ",
	x: "ˣ",
	y: "ʸ",
	z: "ᶻ",
	" ": " "
};

var subscript = {
	0: "₀",
	1: "₁",
	2: "₂",
	3: "₃",
	4: "₄",
	5: "₅",
	6: "₆",
	7: "₇",
	8: "₈",
	9: "₉",
	"+": "₊",
	"-": "₋",
	"=": "₌",
	"(": "₍",
	")": "₎",
	a: "ₐ",
	e: "ₑ",
	h: "ₕ",
	i: "ᵢ",
	j: "ⱼ",
	k: "ₖ",
	l: "ₗ",
	m: "ₘ",
	n: "ₙ",
	o: "ₒ",
	p: "ₚ",
	r: "ᵣ",
	s: "ₛ",
	t: "ₜ",
	u: "ᵤ",
	v: "ᵥ",
	x: "ₓ",
	" ": " "
};

var fractions = {
	"1/2": "½",
	"1/3": "⅓",
	"2/3": "⅔",
	"1/4": "¼",
	"3/4": "¾",
	"1/5": "⅕",
	"2/5": "⅖",
	"3/5": "⅗",
	"4/5": "⅘",
	"1/6": "⅙",
	"5/6": "⅚",
	"1/7": "⅐",
	"1/8": "⅛",
	"3/8": "⅜",
	"5/8": "⅝",
	"7/8": "⅞",
	"1/9": "⅑",
	"1/10": "⅒"
};

var slash = "⁄";

function getFraction(numerator, denominator) {
	numerator = numerator.trim();
	denominator = denominator.trim();

	function map(num, den) {
		if (fractions[num + "/" + den]) return fractions[num + "/" + den];
		var numOut = "",
			denOut = "";
		num.split("").forEach(function (val) {
			var correspondingNum = superscript[val];
			if (!correspondingNum) throw new Error();
			numOut += correspondingNum;
		});
		console.log(den);
		den.split("").forEach(function (val) {
			var correspondingNum = subscript[val];
			if (!correspondingNum) throw new Error();
			denOut += correspondingNum;
		});
		return numOut + slash + denOut;
	}

	var orig = map(numerator, denominator);
	var simp = "";
	if (/^[+-]?\d+$/.test(numerator) && /^[+-]?\d+$/.test(denominator)) {
		simp = reduce(numerator, denominator);
		// console.log("reducing " + orig + " to " + simp);
		simp = map(simp[0].toString(), simp[1].toString());
	}
	if (simp === orig) simp = "";
	return [orig, simp];
}

function replaceFractionsInString(str) {
	var fractions = str.match(/(?<=\s|^)[-)(+0-9x]+\/[-)(+0-9x]+(?=\s|$)/g);
	if (!fractions) return str;
	fractions.forEach(function (fraction) {
		if (
			fraction.startsWith("(") &&
			fraction.endsWith(")") &&
			fraction.length !== 3
		) {
			var num = setCharAt(fraction.split("/")[0], 0, ""),
				den = setCharAt(
					fraction.split("/")[1],
					fraction.split("/")[1].length - 1,
					""
				);
			var replacement = getFraction(num, den);
			if (replacement[0].charAt(0) == "⁻") {
				replacement[0] = setCharAt(replacement[0], 0, "-");
			}
			if (replacement[1].charAt(0) == "⁻") {
				replacement[1] = setCharAt(replacement[1], 0, "-");
			}
			str = str.replace(fraction, replacement[1] || replacement[0]);
		} else {
			var num = fraction.split("/")[0],
				den = fraction.split("/")[1];
			var replacement = getFraction(num, den);
			str = str.replace(fraction, replacement[0]);
			if (replacement[1])
				str = str.replace(replacement[1], replacement[0]);
		}
	});
	return str;
}

module.exports = { replaceFractionsInString };
