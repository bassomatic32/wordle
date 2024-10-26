import { words } from "./words"
import { Cromulence, loadWordlist } from "cromulence"


// Main Function
(async () => {
	
	process.on("unhandledRejection", (err) => {
		console.error(err)
	})
	process.on("uncaughtException", (err) => {
		console.error(err)
	})


	// console.log(`arg count: ${process.argv.length}`)

	const blackList = process.argv[2]
	console.log('Blacklist:', blackList)

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const letters: any[] = []
	for ( let i = 3; i < process.argv.length; i++) {
		letters.push(process.argv[i].split(','))
	}

	console.log('Letters:', letters)
	const mustHaveLetters = letters.map((x: string[]) => x[0])
	console.log('Must Have Letters:', mustHaveLetters)

	let search = ''
	for (let i = 0 ; i < 5; i++ ) {
		let cont = false
		let localBlackList = blackList
		for (const letter of letters) {
			if (Number.parseInt(letter[1]) === i+1) {
				search += letter[0]
				cont = true
				break
			}
		}
		if (cont) continue

		for (const letter of letters) {
			const char = letter[0]
			const negativePositions = letter.slice(1).map((x: string) => -Number.parseInt(x) )
			if ( negativePositions[0] < 0) continue
			// console.log('Negative Positions:', negativePositions)
			if (negativePositions.includes(i+1)) {
				localBlackList += char
			}
		}

		search += `[^${localBlackList}]`
	}
	console.log('Search:', search)

	
	
	const possible = []
	const regex = new RegExp(`${search}` )
	for (const word of words) {		
		if (regex.test(word)) {			
			possible.push(word)
		}
	}


	const filtered = possible.filter((word: string) => {
		for (const letter of mustHaveLetters) {
			if (!word.includes(letter)) return false
		}
		return true
	})

	console.log('----')

	

	const cromulence = new Cromulence(await loadWordlist());

	const wordList = filtered.map((word: string) => {
		const score = cromulence.cromulence(word)
		return { word, score }
	}).sort((a, b) => b.score - a.score)

	console.log(wordList.map((x) => `${x.word} : ${x.score}`).join('\n'))

	
	console.log('----')
})()