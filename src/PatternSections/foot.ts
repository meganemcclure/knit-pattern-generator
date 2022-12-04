import { FootType, GuageType, SectionType } from '../types'
import { getStitchHeight, sizeFormat } from '../helpers'

export class Foot implements FootType {
    rounds: number[]

    constructor(sizes: number[], heelLengths: number[], toeLengths: number[], guage: GuageType, negativeEase: number) {
        this.rounds = sizes.map((size, index) => {
            let length: number = (size * negativeEase) - heelLengths[index] - toeLengths[index]
            let stitchLength: number = getStitchHeight(guage)
            return Math.round(length / stitchLength)
        })
    }

    getLength(guage: GuageType): number[] {
        return this.rounds.map(round => round * getStitchHeight(guage))
    }

    getSection(stitchType: string): SectionType {
        return {
            heading: 'Foot',
            steps: [`Join in the round. Then work ${sizeFormat(this.rounds)} round(s) of ${stitchType}.`]
        }
    }
}