import type { PatternType, SockParamsType } from './types'
import readline from 'readline'
import Sock from './PatternTypes/sock'
import * as pattern from './pattern1.json'
import { sizeFormat } from './helpers'

function printPattern(pattern: PatternType) {
    console.log(pattern.title)
    console.log(pattern.description)
    console.log("Pattern Abbreviations:")
    console.log(pattern.abbreviationKey)
    pattern.sections.forEach(({heading, steps}) => {
        console.log('-----------------------------------------------------')
        console.log(heading)
        steps.forEach((step, index) => {
            console.log(`${index+1}. ${step}`)
        })
    })
}

function Question(qText: string, options: string[] | undefined = undefined): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(qText, ans => {
        rl.close();
        resolve(ans);
    }))
}

async function main() {
    let { title, description, guage, cuffLength, legLength } = pattern
    let sizeRange: 'mens' | 'womens' | 'kids' = (pattern.sizeRange === 'mens' || pattern.sizeRange === 'womens' || pattern.sizeRange === 'kids') ? pattern.sizeRange : 'womens'
    let params: SockParamsType = { title, description, guage, cuffLength, legLength, sizeRange }
    let testSock = new Sock(params)
    printPattern(testSock.generate())
}

main()