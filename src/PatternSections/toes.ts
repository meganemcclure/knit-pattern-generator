import type { GuageType, SectionType } from '../types'
import { getStitchHeight, repeat } from '../helpers'

export class ClassicToe {
    stsPerRound: number[]
    decreases: number[]

    constructor(stsPerRound: number[]) {
        this.stsPerRound = stsPerRound
        this.decreases = stsPerRound.map(sts => {
            let initial = Math.floor(sts*0.7) // only leave 30% of the stitches on for the toe bind off
            if (initial % 2 > 0) return initial - (initial % 2)
            return initial
        })
    }

    getLength(guage: GuageType) {
        return this.decreases.map(sts => ((sts/2)+1) * getStitchHeight(guage))
    }

    getSection(): SectionType {
        let x = this.stsPerRound.map(sts => sts/2)
        let repeatSection = repeat(
            `Knit 1 round. K1, K2tog, knit to 3 sts before marker, SSK, K1, SM, K1, K2tog, kit to 3 sts before marker, SSK, K1.`, 
            this.decreases.map(dec => dec/2)
        )
        return {
            heading: 'Toe',
            steps: [
                `Setup Round: Work ${x} sts. PM, Work ${x}`,
                `${repeatSection}.`,
                `You should now have ${this.stsPerRound.map((sts, index) => sts-this.decreases[index])} sts remaining on the needles.
Split the stitches evenly across 2 needles, and Kitchener Stitch across to close the gap.`
            ]
        }
    }
}