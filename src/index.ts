import type { PatternType, SockParamsType } from './types'
import { TopDownSock } from './PatternTypes/sock'
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
    let { title, description, guage, cuffLength, legLength, size } = pattern
    let sizeRange: 'mens' | 'womens' | 'kids' = (pattern.sizeRange === 'mens' || pattern.sizeRange === 'womens' || pattern.sizeRange === 'kids') ? pattern.sizeRange : 'womens'
    let params: SockParamsType = { title, description, guage, cuffLength, legLength, sizeRange, size }
    let testSock = new TopDownSock(params)
    printPattern(testSock.generate())
}

main()