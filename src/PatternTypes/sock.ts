import type { SockType, CuffType, LegType, GSRType, FootType, ToeType, PatternType,  SockParamsType } from "../types";
import * as resources from '../resources.json'
import { CastOffCuff, CastOnCuff } from '../PatternSections/cuff'
import { Leg } from '../PatternSections/leg'
import { GSRHeel } from '../PatternSections/heels'
import { Foot } from '../PatternSections/foot'
import { ClassicToe, ToeUpToe } from '../PatternSections/toes'
import { sizeFormat, getStitchWidth } from "../helpers";
// NOTE: sock sizing chart from: https://www.knitgrammer.com/blog/foot-size-chart-for-sock-knitting/

const ABBREVIATIONS = `
    - sts: stitches
    - st: stitch
    - K: knit
    - K2tog: knit 2 together
    - SSK: slip, slip, knit
    - SM: slip marker

    Sizes:
    - kid's sizes: ${sizeFormat(Object.keys(resources.SHOE_SIZE_CHART_CM.kids))}
    - women's sizes: ${sizeFormat(Object.keys(resources.SHOE_SIZE_CHART_CM.womens))}
    - men's sizes: ${sizeFormat(Object.keys(resources.SHOE_SIZE_CHART_CM.mens))} 
`
const NEGATIVE_EASE_CIRCUMFERENCE = 0.9     // sock has 10% negative ease (use 90% of foot circumference)
const NEGATIVE_EASE_LENGTH = 0.9            // sock has 10% netagive ease lengthwise (use 90% of foot length)

export class TopDownSock implements SockType {
    roundSts: number
    cuff: CuffType
    leg: LegType
    heel: GSRType
    foot: FootType
    toe: ToeType
    mainStitch: string
    cuffStitch: string

    constructor(params: SockParamsType) {
        let { guage, mainStitch, cuffStitch, cuffLength, legLength, sizeRange, size, start, heelType } = params
        let sizeChart: { [size: string]: { length: number, circumference: number }} = resources.SHOE_SIZE_CHART_CM[sizeRange]

        let count = Math.round((sizeChart[size].circumference * NEGATIVE_EASE_CIRCUMFERENCE) / getStitchWidth(guage))
        if (count % 2 > 0) count += count % 2

        this.roundSts = count
        this.cuff = new CastOnCuff(this.roundSts, cuffLength, 'long tail cast on', guage)
        this.leg = new Leg(legLength, guage)
        this.heel = new GSRHeel(this.roundSts)
        this.toe = new ClassicToe(this.roundSts)
        this.foot = new Foot(sizeChart[`${size}`].length, this.heel.getLength(guage), this.toe.getLength(guage), guage, NEGATIVE_EASE_LENGTH)
        this.mainStitch = mainStitch
        this.cuffStitch = cuffStitch
    }

    generate(): PatternType {
        // add the basic pattern information
        let pattern: PatternType = {
            title: 'Vanilla Sock',
            abbreviationKey: ABBREVIATIONS,
            description: 'A basic sock pattern',
            sections: []
        }

        pattern.sections.push(this.cuff.getSection(this.cuffStitch))
        pattern.sections.push(this.leg.getSection(this.mainStitch))
        pattern.sections.push(this.heel.getSection(this.mainStitch))
        pattern.sections.push(this.foot.getSection(this.mainStitch))
        pattern.sections.push(this.toe.getSection(this.mainStitch))

        return pattern
    }
}

export class ToeUpSock implements SockType {
    roundSts: number
    cuff: CuffType
    leg: LegType
    heel: GSRType
    foot: FootType
    toe: ToeType
    mainStitch: string
    cuffStitch: string

    constructor(params: SockParamsType) {
        let { guage, mainStitch, cuffStitch, cuffLength, legLength, sizeRange, size, start, heelType } = params
        let sizeChart: { [size: string]: { length: number, circumference: number }} = resources.SHOE_SIZE_CHART_CM[sizeRange]

        let count = Math.round((sizeChart[size].circumference * NEGATIVE_EASE_CIRCUMFERENCE) / getStitchWidth(guage))
        if (count % 2 > 0) count += count % 2

        this.roundSts = count
        this.cuff = new CastOffCuff(this.roundSts, cuffLength, 'italian bind off', guage)
        this.leg = new Leg(legLength, guage)
        this.heel = new GSRHeel(this.roundSts)
        this.toe = new ToeUpToe(this.roundSts)
        this.foot = new Foot(sizeChart[`${size}`].length, this.heel.getLength(guage), this.toe.getLength(guage), guage, NEGATIVE_EASE_LENGTH)
        this.mainStitch = mainStitch
        this.cuffStitch = cuffStitch
    }

    generate(): PatternType {
        // add the basic pattern information
        let pattern: PatternType = {
            title: 'Vanilla Sock',
            abbreviationKey: ABBREVIATIONS,
            description: 'A basic sock pattern',
            sections: []
        }

        pattern.sections.push(this.toe.getSection(this.mainStitch))
        pattern.sections.push(this.foot.getSection(this.mainStitch))
        pattern.sections.push(this.heel.getSection(this.mainStitch))
        pattern.sections.push(this.leg.getSection(this.mainStitch))
        pattern.sections.push(this.cuff.getSection(this.cuffStitch))

        return pattern
    }
}