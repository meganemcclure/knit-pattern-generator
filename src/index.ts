import type { PatternType, SockParamsType } from './types'
import { TopDownSock, ToeUpSock } from './PatternTypes/sock'
import * as pattern from './pattern1.json'

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

async function main() {
    let sizeRange: 'mens' | 'womens' | 'kids' = (pattern.sizeRange === 'mens' || pattern.sizeRange === 'womens' || pattern.sizeRange === 'kids') ? pattern.sizeRange : 'womens'
    let params: SockParamsType = { ...pattern, sizeRange }
    let testSock = new ToeUpSock(params)
    printPattern(testSock.generate())
}

main()