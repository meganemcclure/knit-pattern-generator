import type { GuageType, SectionType, ToeType } from '../types'
import { getStitchHeight, repeat } from '../helpers'

export class ClassicToe implements ToeType {
    stsPerRound: number
    decreases: number

    constructor(stsPerRound: number) {
        this.stsPerRound = stsPerRound
        let initial = Math.floor(stsPerRound*0.7) // only leave 30% of the stitches on for the toe bind off
        
        if (initial % 2 > 0) this.decreases = initial - (initial % 2)
        else this.decreases = initial
    }

    getLength(guage: GuageType) {
        return ((this.decreases/2)+1) * getStitchHeight(guage)
    }

    getSection(): SectionType {
        let x = this.stsPerRound/2
        let repeatSection = repeat(
            `Knit 1 round. K1, K2tog, knit to 3 sts before marker, SSK, K1, SM, K1, K2tog, kit to 3 sts before marker, SSK, K1.`, 
            this.decreases/2
        )
        return {
            heading: 'Toe',
            steps: [
                `Setup Round: Work ${x} sts. PM, Work ${x}`,
                `${repeatSection}.`,
                `You should now have ${this.stsPerRound-this.decreases} sts remaining on the needles.
Split the stitches evenly across 2 needles, and Kitchener Stitch across to close the gap.`
            ]
        }
    }
}