import type { GuageType, SectionType, ToeType } from '../types'
import { getStitchHeight } from '../helpers'

export class ClassicToe implements ToeType {
    stsPerRound: number
    diff: number

    constructor(stsPerRound: number) {
        this.stsPerRound = stsPerRound
        let initial = Math.floor(stsPerRound*0.7) // only leave 30% of the stitches on for the toe bind off
        
        if (initial % 2 > 0) this.diff = initial - (initial % 2)
        else this.diff = initial
    }

    getLength(guage: GuageType) {
        return ((this.diff/2)+1) * getStitchHeight(guage)
    }

    getSection(): SectionType {
        let steps = []
        for (let i = 0; i < this.diff/4; i++) {
            let middleSts = (this.stsPerRound-(i*2)-6)
            let step = `K1, K2tog, work ${middleSts} sts, SSK, K1, K2tog, ${middleSts}, SSK, K1`
            steps.push(step)
        }
        steps.push(`You should now have ${this.stsPerRound-this.diff} sts remaining on the needles. Distribute the sts evenly across 2 needles, and use Kitchener Stitch to close the gap.`)
        return {
            heading: 'Toe',
            steps: steps
        }
    }
}

export class ToeUpToe extends ClassicToe implements ToeType {
    getSection(): SectionType {
        let steps = [`Cast on ${this.stsPerRound-this.diff} sts using Judy's Magic Cast On. ${(this.stsPerRound-this.diff)/2} sts on each needle.`]

        for (let i = 0; i < this.diff/4; i++) {
            let middleSts = (((this.stsPerRound-this.diff)/2)+(i*2)-4)
            let step = `K1, KFB, work ${middleSts} sts, KFB, K2, KFB, work ${middleSts} sts, KFB, K1`
            steps.push(step)
            steps.push(`Work 1 round`)
        }
        return {
            heading: 'Toe',
            steps: steps
        }
    }
}