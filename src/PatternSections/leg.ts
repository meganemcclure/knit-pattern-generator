import { GuageType, LegType, SectionType } from "../types"
import { getStitchHeight } from "../helpers"

export class Leg implements LegType {
    rounds: number

    constructor(length: number, guage: GuageType) {
        this.rounds = length / getStitchHeight(guage)
    }

    getSection(stitchType: string): SectionType {
        return {
            heading: 'Leg',
            steps: [
                `Work ${this.rounds} round(s) of ${stitchType}.`
            ]
        }
    }
}