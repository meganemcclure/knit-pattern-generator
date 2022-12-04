export interface PatternType {
    title: string,
    abbreviationKey: string,
    description: string,
    sections: SectionType[]
}

export interface SectionType {
    heading: string,
    steps: string[]
}

// guage for a 10x10 cm guage swatch (4x4 in)
export interface GuageType {
    rows: number,
    stitches: number,
    rowHeight: number,
    stsWidth: number
}

export interface FootMeasurements {
    shoeSize: number,
    sizeRange: 'mens' | 'womens' | 'kids',
    footLength?: number,
    footCircumference?: number
}

export interface SockParamsType {
    guage: GuageType,
    cuffLength: number,
    legLength: number,
    footLength: number,
    sizeRange: 'mens' | 'womens' | 'kids'
}

export interface PatternSection {
    getSection: (stitchType: string) => SectionType
}

export interface CastOnType extends PatternSection {
    stsPerRound: number[]
}

export interface CuffType extends PatternSection {
    rounds: number
}

export interface LegType extends PatternSection {
    rounds: number
}

export interface GSRType extends PatternSection {
    stsPerRound: number[]
    thirds: number[]
    remainders: number[]
    outerSections: number[]
    innerSections: number[]

    getLength: (guage: GuageType) => number[]
}

export interface FootType extends PatternSection {
    rounds: number[]

    getLength: (guage: GuageType) => number[]
}