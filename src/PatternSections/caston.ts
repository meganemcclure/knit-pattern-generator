import type { SectionType, CastOnType } from '../types'

export class CastOn implements CastOnType {
    stsPerRound: number

    constructor(stsPerRound: number) {
        this.stsPerRound = stsPerRound
    }

    getSection(method: string): SectionType {
        return {
            heading: 'Cast On',
            steps: [`Cast on ${this.stsPerRound} sts using the ${method}.`]
        }
    }
}