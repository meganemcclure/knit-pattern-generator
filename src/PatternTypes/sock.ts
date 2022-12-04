import type { CastOnType, GSRType, PatternType,  SockParamsType } from "../types";
import * as resources from '../resources.json'
import { CastOn } from '../PatternSections/caston'
import { Cuff } from '../PatternSections/cuff'
import { Leg } from '../PatternSections/leg'
import { GSRHeel } from '../PatternSections/heels'
import { Foot } from '../PatternSections/foot'
import { ClassicToe } from '../PatternSections/toes'
import { getStitchWidth } from "../helpers";
// NOTE: sock sizing chart from: https://www.knitgrammer.com/blog/foot-size-chart-for-sock-knitting/

const ABBREVIATIONS = `
    - sts: stitches,
    - kid's sizes: ${sizeFormat(Object.keys(resources.SHOE_SIZE_CHART_CM.kids))}
    - women's sizes: ${sizeFormat(Object.keys(resources.SHOE_SIZE_CHART_CM.womens))}
    - men's sizes: ${sizeFormat(Object.keys(resources.SHOE_SIZE_CHART_CM.mens))} 
`
const NEGATIVE_EASE_CIRCUMFERENCE = 0.9     // sock has 10% negative ease (use 90% of foot circumference)
const NEGATIVE_EASE_LENGTH = 0.9            // sock has 10% netagive ease lengthwise (use 90% of foot length)

export default class Sock {
    roundSts: number[]
    caston: CastOnType
    cuff: any
    leg: any
    heel: GSRType
    foot: any
    toe: any

    constructor(params: SockParamsType) {
        let { guage, cuffLength, legLength, sizeRange } = params
        let sizeChart: { [size: string]: { length: number, circumference: number }} = resources.SHOE_SIZE_CHART_CM[sizeRange]

        this.roundSts = Object.keys(sizeChart).map((size: string) => {
            let count = Math.round((sizeChart[size].circumference * NEGATIVE_EASE_CIRCUMFERENCE) / getStitchWidth(guage))
            if (count % 2 > 0) count += count % 2
            return count
        })
        this.caston = new CastOn(this.roundSts)
        this.cuff = new Cuff(cuffLength, guage)
        this.leg = new Leg(legLength, guage)
        this.heel = new GSRHeel(this.roundSts)
        this.toe = new ClassicToe(this.roundSts)
        console.log(`heel length: ${this.heel.getLength(guage)}`)
        console.log(`toe length: ${this.toe.getLength(guage)}`)
        console.log(`foot length: ${Object.values(sizeChart).map(size => size.length)}`)
        this.foot = new Foot(Object.values(sizeChart).map(size => size.length), this.heel.getLength(guage), this.toe.getLength(guage), guage, NEGATIVE_EASE_LENGTH)
    }

    generate(): PatternType {
        // add the basic pattern information
        let pattern: PatternType = {
            title: 'Vanilla Sock',
            abbreviationKey: ABBREVIATIONS,
            description: 'A basic sock pattern',
            sections: []
        }

        pattern.sections.push(this.caston.getSection('long tail cast on'))
        pattern.sections.push(this.cuff.getSection('1x1 rib'))
        pattern.sections.push(this.leg.getSection('stockinette stitch'))
        pattern.sections.push(this.heel.getSection('stockinette stitch'))
        pattern.sections.push(this.foot.getSection('stockinette stitch'))
        pattern.sections.push(this.toe.getSection('stockinette stitch'))

        return pattern
    }

    roundsSection(rounds: number | number[], stitchType: string) {
        if (typeof rounds === 'number') {
            return [`Join in the round. Then work ${rounds} round(s) of ${stitchType}.`]
        }
        return [`Join in the round. Then work ${sizeFormat(rounds)} round(s) of ${stitchType}.`]
    }
}

function sizeFormat(stitches: number[] | string[]) {
    return stitches.join(', ')
}

function repeat(section: string, repeats: number[]): string {
    return `*${section}*
        Work from * to * ${sizeFormat(repeats)} time(s).`
}