import { GuageType } from "./types"

export function sizeFormat(stitches: number[] | string[]) {
    return stitches.join(', ')
}

export function repeat(section: string, repeats: number): string {
    return `*${section}*
        Work from * to * ${repeats} time(s).`
}

export function getStitchHeight(guage: GuageType) {
    return guage.rowHeight/guage.rows
}

export function getStitchWidth(guage: GuageType) {
    return guage.stsWidth/guage.stitches
}