import type { GuageType, SectionType, GSRType } from '../types'
import { repeat, getStitchHeight } from '../helpers'

export class GSRHeel implements GSRType {
    stsPerRound: number
    thirds: number
    remainder: number
    outer: number
    inner: number

    constructor(stsPerRound: number) {
        this.stsPerRound = stsPerRound
        this.thirds = Math.floor((stsPerRound/2)/3)
        this.remainder = stsPerRound % 3
        this.outer = this.thirds
        this.inner = this.thirds

        switch (this.remainder) {
            case 2:
                // 2 extra stitches, put them in the outer 3rds of the 
                // german short row heel
                this.outer += 1
                break;
            case 1:
                // 1 extra stitch, put it in the inner 3rd of the german
                // short row heel
                this.inner += 1
                break;
            default:
                // no extra stitches, no adjustments needed
                break;
        }
    }

    getLength(guage: GuageType): number {
        return ((this.outer*2)+1) * getStitchHeight(guage)
    }

    getSection(stitchType: string): SectionType {
        let firstTurnRepeat = repeat(
            'Pull up the first stitch to make a double stitch, and work until the double stitch made in the previous round. Turn the work.', 
            (this.outer*2)-1
        )
        let secondTurnRepeat = repeat(
            'Pull up the first stitch to make a double stitch. Work until on st after the double stitch made in the previous round.', 
            (this.outer*2)-1
        )

        return {
            heading: 'German Short Row Heel',
            steps: [
                `Work across ${this.stsPerRound/2} sts. Turn the work.`,
                `Pull up the first stitch to make a double stitch, and work across ${(this.stsPerRound/2)-1} sts. Turn the work.`,
                `${firstTurnRepeat}`,
                `Work 2 rounds.`,
                `Work across ${this.inner + this.outer + 1} sts. Turn the work.`,
                `Pull up the first stitch to make a double stitch and work across ${this.inner + 1} sts. Turn the work.`,
                `${secondTurnRepeat}`
            ]
        }
    }
}