import {describe, expect, test} from '@jest/globals'
import { result, splitWord } from '..'

const asciiCode = '9911110010110998101114 109105100117'

describe('Challenge 2 Codember', () => {

	test('Should split the text in words', () => {
		const words = splitWord(asciiCode)
		expect(words).toEqual(['9911110010110998101114', '109105100117'])
	})

	test('Should decript the words', () => {
		const decripted = result(asciiCode)
		expect(decripted).toEqual('codember midu')
	})

})