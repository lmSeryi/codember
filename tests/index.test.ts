import {describe, expect, test} from '@jest/globals'
import { getUsers, toObject, removeSpaces, detectValidUsers, result } from '..'
import type { User } from '../index'


const textUsers = 'usr:@midudev eme:mi@gmail.com psw:123456 age:22 loc:bcn\nfll:82\n\nfll:111 eme:yrfa@gmail.com usr:@codember psw:123456 age:21 loc:World\n\npsw:11133 loc:Canary fll:333 usr:@pheralb eme:pheralb@gmail.com\n\nusr:@itziar age:19 loc:isle psw:aaa fll:222 eme:itzi@gmail.com'

describe('Challenge 1 Codember', () => {

	test('Input should be a string', () => {
		expect(typeof textUsers).toBe('string')
	})

	test('Should have at least one user', () => {
		expect(getUsers(textUsers).length).toBeGreaterThanOrEqual(1)
	})

	test('should get string properties', () => {
		const users = getUsers(textUsers)
		const usersWithoutSpaces = removeSpaces(users)
		expect(usersWithoutSpaces[0].length).toBeGreaterThanOrEqual(6)
	})

	test('should convert to object', () => {
		const users = getUsers(textUsers)
		const usersWithoutSpaces = removeSpaces(users)
		const usersAsObject = toObject(usersWithoutSpaces)
		expect(typeof usersAsObject[0]).toBe('object')
	})

	test('Should contains the all the valid properties', () => {
		const users = getUsers(textUsers)
		const usersWithoutSpaces = removeSpaces(users)
		const usersAsObject = toObject(usersWithoutSpaces) as User[]
		expect.arrayContaining(usersAsObject)
		usersAsObject.forEach((user: User) => {
			expect(user).toHaveProperty('usr')
			expect(user).toHaveProperty('eme')
			expect(user).toHaveProperty('psw')
			expect(user).toHaveProperty('loc')
			expect(user).toHaveProperty('fll')
			// expect(user).toHaveProperty('age')
		})
	})

	test('Should return the valid users', () => {
		const users = getUsers(textUsers)
		const usersWithoutSpaces = removeSpaces(users)
		const usersAsObject = toObject(usersWithoutSpaces) as User[]
		const validUsers = detectValidUsers(usersAsObject)
		expect(validUsers.length).toBe(3)
	})

	test('Should return the correct result', () => {
		expect(result(textUsers)).toBe('submit 3 @itziar')
	})

})