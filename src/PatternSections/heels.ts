import type { GuageType, SectionType, GSRType } from '../types'
import { sizeFormat, repeat, getStitchHeight } from '../helpers'

export class GSRHeel implements GSRType {
    stsPerRound: number[]
    thirds: number[]
    remainders: number[]
    outerSections: number[]
    innerSections: number[]

    constructor(stsPerRound: number[]) {
        this.stsPerRound = stsPerRound
        this.thirds = stsPerRound.map(sts => Math.floor((sts/2)/3))
        this.remainders = stsPerRound.map(sts => sts % 3)
        this.outerSections = [...this.thirds]
        this.innerSections = [...this.thirds]

        this.remainders.forEach((remainder, index) => {
            switch (remainder) {
                case 2:
                    // 2 extra stitches, put them in the outer 3rds of the 
                    // german short row heel
                    this.outerSections[index] += 1
                    break;
                case 1:
                    // 1 extra stitch, put it in the inner 3rd of the german
                    // short row heel
                    this.innerSections[index] += 1
                    break;
                default:
                    // no extra stitches, no adjustments needed
                    break;
            }
        })
    }

    getLength(guage: GuageType): number[] {
        return this.outerSections.map(sts => ((sts*2)+1) * getStitchHeight(guage))
    }

    getSection(stitchType: string): SectionType {
        let firstTurnRepeat = repeat(
            'Pull up the first stitch to make a double stitch, and work until the double stitch made in the previous round. Turn the work.', 
            this.outerSections.map(outer => (outer*2)-1)
        )
        let secondTurnRepeat = repeat(
            'Pull up the first stitch to make a double stitch. Work until on st after the double stitch made in the previous round.', 
            this.outerSections.map(outer => (outer*2)-1)
        )

        return {
            heading: 'German Short Row Heel',
            steps: [
                `Work across ${sizeFormat(this.stsPerRound.map((sts: number) => sts/2))} sts. Turn the work.`,
                `Pull up the first stitch to make a double stitch, and work across ${sizeFormat(this.stsPerRound.map((sts: number) => (sts/2)-1))} sts. Turn the work.`,
                `${firstTurnRepeat}`,
                `Work 2 rounds.`,
                `Work across ${this.innerSections.map((inner, index) => (inner + this.outerSections[index] + 1))} sts. Turn the work.`,
                `Pull up the first stitch to make a double stitch and work across ${this.innerSections.map((inner) => (inner + 1))} sts. Turn the work.`,
                `${secondTurnRepeat}`
            ]
        }
    }
}