export default function two_crystal_balls(breaks: boolean[]): number {

    // To efficiently solve this, we need to jump at the sqrt of n.
    const jmpAmount = Math.floor(Math.sqrt(breaks.length));

    // we begin our jumping/looping at the jumpAmount and each jum takes jmpAmount.
    let i = jmpAmount;
    for (; i < breaks.length; i += jmpAmount) {
        // when we come acrose where one of the balls break we stop jumping. 
        if (breaks[i]) {
            break;
        }
    }

    // we go back to the last jump point before it broke.
    i -= jmpAmount;

    // we then loop in a jumpAmount fashion to get the index where the ball broke.
    for (let j = 0; j <= jmpAmount && i < breaks.length; ++j, ++i) {
        if (breaks[i]) {
            return i;
        }
    }

    return -1;
}