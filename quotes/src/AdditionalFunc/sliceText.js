export const sliceText = (text, length, last) => {
    if(text.length > length) return text.slice(0, length) + last
    
    return text
}