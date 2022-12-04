import type { PatternType, SockParamsType } from './types'
import Sock from './PatternTypes/sock'

function printPattern(pattern: PatternType) {
    console.log(pattern.title)
    console.log(pattern.description)
    console.log("Pattern Abbreviations:")
    console.log(pattern.abbreviationKey)
    pattern.sections.forEach(({heading, steps}) => {
        console.log('-----------------------------------------------------')
        console.log(heading)
        // console.log(content)
        steps.forEach((step, index) => {
            console.log(`${index+1}. ${step}`)
        })
    })
}

function main() {
    let guage = {
        rows: 40,
        stitches: 33,
        rowHeight: 10,
        stsWidth: 10
    }
    let params: SockParamsType = { guage, cuffLength: 10, legLength: 20, footLength: 35, sizeRange: 'womens' }
    let testSock = new Sock(params)
    printPattern(testSock.generate())
}

main()