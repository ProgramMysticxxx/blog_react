export function extractTextContent(html) {
    return new DOMParser()
        .parseFromString(html, "text/html")
        .body.textContent;
}