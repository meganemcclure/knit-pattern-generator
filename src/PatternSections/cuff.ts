import { CuffType, GuageType, SectionType } from "../types"
import { getStitchHeight } from "../helpers"

export class CastOnCuff implements CuffType {
    stsPerRound: number
    rounds: number
    castOnMethod: string

    constructor(stsPerRound: number, length: number, castOnMethod: string, guage: GuageType) {
        this.stsPerRound = stsPerRound
        this.rounds = length / getStitchHeight(guage)
        this.castOnMethod = castOnMethod
    }

    getSection(stitchType: string): SectionType {
        return {
            heading: 'Cuff',
            steps: [
                `Cast on ${this.stsPerRound} sts using the ${this.castOnMethod}.`,
                `Join to work in the round.`,
                `Work ${this.rounds} round(s) of ${stitchType}.`
            ]
        }
    }
}

export class CastOffCuff implements CuffType {
    stsPerRound: number
    rounds: number
    castOffMethod: string

    constructor(stsPerRound: number, length: number, castOffMethod: string, guage: GuageType) {
        this.stsPerRound = stsPerRound
        this.rounds = length / getStitchHeight(guage)
        this.castOffMethod = castOffMethod
    }

    getSection(stitchType: string): SectionType {
        return {
            heading: 'Cuff',
            steps: [
                `Work ${this.rounds} round(s) of ${stitchType}`,
                `Cast off using the ${this.castOffMethod}.`
            ]
        }
    }
}