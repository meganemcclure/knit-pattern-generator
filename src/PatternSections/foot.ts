import { FootType, GuageType, SectionType } from '../types'
import { getStitchHeight } from '../helpers'

export class Foot implements FootType {
    rounds: number

    constructor(size: number, heelLength: number, toeLength: number, guage: GuageType, negativeEase: number) {
        let length: number = (size * negativeEase) - heelLength - toeLength
        let stitchLength: number = getStitchHeight(guage)
        this.rounds = Math.round(length / stitchLength)
    }

    getLength(guage: GuageType): number {
        return this.rounds * getStitchHeight(guage)
    }

    getSection(stitchType: string): SectionType {
        return {
            heading: 'Foot',
            steps: [`Work ${this.rounds} round(s) of ${stitchType}`]
        }
    }
}