export function takeFirstNChars(string, n, ellipsis) {
    if (!ellipsis) {
        ellipsis = '...';
    }
    if (string.length <= n) {
        return string;
    }
    return string.slice(0, n - ellipsis.length) + ellipsis;
}