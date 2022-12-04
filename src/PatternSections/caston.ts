import type { SectionType, CastOnType } from '../types'
import { sizeFormat } from '../helpers'

export class CastOn implements CastOnType {
    stsPerRound: number[]

    constructor(stsPerRound: number[]) {
        this.stsPerRound = stsPerRound
    }

    getSection(method: string): SectionType {
        return {
            heading: 'Cast On',
            steps: [`Cast on ${sizeFormat(this.stsPerRound)} sts using the ${method}.`]
        }
    }
}