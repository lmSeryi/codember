import fs from 'fs'

export interface User {
  usr: string
  eme: string
  psw: string
  age: string
  loc: string
  fll: string
  [key: string]: unknown
}

const users = fs.readFileSync('./users.txt', 'utf-8')

export const getUsers = (stringUsers: string) => {
  const users = stringUsers.replace(/(\r)/gm, '')
	return users.split(/\n\n/)
}

export const removeSpaces = (users: string[]) => {
	return users.map((user) => user.split(/\s/))
}

export const toObject = (users: string[][]) => {
	return users.map((user) => {
		return user.reduce((acc, curr) => {
			const [key, value] = curr.split(':')
			if (!acc[key]) { // Avoid overwriting
			  return {...acc, [key]: value}
			} else {
				return { ...acc }
			}
		}, {} as User)
	})
}

export const detectValidUsers = (users: User[]) => {
	return users.filter(user => user.age && user.eme && user.fll && user.loc && user.psw && user.usr)
}

export const result = (textUsers: string) => {
	const users = getUsers(textUsers)
	const usersWithoutSpaces = removeSpaces(users)
	const usersAsObjects = toObject(usersWithoutSpaces)
	const validUsers = detectValidUsers(usersAsObjects as User[])
	return `submit ${validUsers.length} ${validUsers.at(-1)?.usr}`
}

console.log(result(users))
