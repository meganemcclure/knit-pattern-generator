import { CuffType, GuageType, SectionType } from "../types"
import { getStitchHeight } from "../helpers"

export class Cuff implements CuffType {
    rounds: number

    constructor(length: number, guage: GuageType) {
        this.rounds = length / getStitchHeight(guage)
    }

    getSection(stitchType: string): SectionType {
        return {
            heading: 'Cuff',
            steps: [
                `Join in the round.`,
                `Work ${this.rounds} round(s) of ${stitchType}.`
            ]
        }
    }
}