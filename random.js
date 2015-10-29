/**
 * Return a random int within a range, inclusive.
 * @param min
 * @param max
 * @returns {number}
 */
function int(min, max) {
    return Math.round(min + Math.random() * (max - min));
}

/**
 * Uniform randomly select an element from an array.
 * @param a
 * @returns {*}
 */
function fromArray(a) {
    return a[Math.floor(Math.random() * a.length)];
}

module.exports = {
    int       : int,
    fromArray : fromArray
};