import fs from 'fs'

const asciiCodes = fs.readFileSync('./encrypted.txt', 'utf-8')

export const splitWord = (str: string) => str.split(/\s/g)

export const decriptWord = (asciiCode: string) => {
	let word = ''
	for (let i = 0; i < asciiCode.length; i) {
		const number  = asciiCode[i]
		if (number > '1') {
			const secondNumber = asciiCode[i + 1]
			const letter = String.fromCharCode(Number(number + secondNumber))
			i += 2
			word += letter
		} else {
			const secondNumber = asciiCode[i + 1]
			const thirdNumber = asciiCode[i + 2]
			const letter = String.fromCharCode(Number(number + secondNumber + thirdNumber))
			i += 3
			word += letter
		}
	}

	return word
}

export const result = (messageToDecript: string) => {
	const words = splitWord(messageToDecript)
	const decripted = words.map((word) => decriptWord(word))
	return decripted.join(' ')
}

console.log(result(asciiCodes))
