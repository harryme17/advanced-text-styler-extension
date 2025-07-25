// ==========================================================
// SECTION 1: ALL DATA AND TEXT CONVERSION FUNCTIONS
// (Copied directly from your original project)
// ==========================================================

const styles = [
    { name: 'Sans Serif All Caps', fn: text => convertToSansSerifAllCaps(text), category: 'modern' },
    { name: 'Sans Serif All Caps Bold', fn: text => convertToSansSerifAllCapsBold(text), category: 'modern' },
    { name: 'Bold', fn: text => convertToUnicode(text, 'bold'), category: 'emphasis' },
    { name: 'Italic', fn: text => convertToUnicode(text, 'italic'), category: 'emphasis' },
    { name: 'Bold Italic', fn: text => convertToUnicode(text, 'boldItalic'), category: 'emphasis' },
    { name: 'Small Caps', fn: text => convertToSmallCaps(text), category: 'special' },
    { name: 'Monospace', fn: text => convertToUnicode(text, 'monospace'), category: 'code' },
    { name: 'Double-Struck', fn: text => convertToUnicode(text, 'doubleStruck'), category: 'math' },
    { name: 'Fraktur', fn: text => convertToUnicode(text, 'fraktur'), category: 'gothic' },
    { name: 'Script (Cursive)', fn: text => convertToUnicode(text, 'script'), category: 'handwriting' },
    { name: 'Underlined', fn: text => addCombiningChar(text, '\u0332'), category: 'decoration' },
    { name: 'Strikethrough', fn: text => addCombiningChar(text, '\u0336'), category: 'decoration' },
    { name: 'Overlined', fn: text => addCombiningChar(text, '\u0305'), category: 'decoration' },
    { name: 'Upside Down', fn: text => convertUpsideDown(text), category: 'fun' },
    { name: 'Bubble Text', fn: text => convertToBubble(text), category: 'fun' },
    { name: 'Square Text', fn: text => convertToSquare(text), category: 'shapes' },
    { name: 'Circled Text', fn: text => convertToCircled(text), category: 'shapes' },
    { name: 'Negative Circled', fn: text => convertToNegativeCircled(text), category: 'shapes' },
    { name: 'Mirror Text', fn: text => convertToMirror(text), category: 'fun' },
    { name: 'Zalgo Text', fn: text => convertToZalgo(text), category: 'fun' },
    { name: 'Leet Speak', fn: text => convertToLeet(text), category: 'internet' }
];

const unicodeMaps = {
    bold: { start: 0x1D400, startLower: 0x1D41A },
    italic: { custom: { 'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍', 'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧'}},
    boldItalic: { start: 0x1D468, startLower: 0x1D482 },
    script: { custom: { 'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': 'ℐ', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵', 'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': 'ℯ', 'f': '𝒻', 'g': 'ℊ', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': 'ℴ', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏' }},
    fraktur: { custom: { 'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊', 'H': 'ℌ', 'I': 'ℑ', 'J': '𝔍', 'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑', 'O': '𝔒', 'P': '𝔓', 'Q': '𝔔', 'R': 'ℜ', 'S': '𝔖', 'T': '𝔗', 'U': '𝔘', 'V': '𝔙', 'W': '𝔚', 'X': '𝔛', 'Y': '𝔜', 'Z': 'ℨ', 'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣', 'g': '𝔤', 'h': '𝔥', 'i': '𝔦', 'j': '𝔧', 'k': '𝔨', 'l': '𝔩', 'm': '𝔪', 'n': '𝔫', 'o': '𝔬', 'p': '𝔭', 'q': '𝔮', 'r': '𝔯', 's': '𝔰', 't': '𝔱', 'u': '𝔲', 'v': '𝔳', 'w': '𝔴', 'x': '𝔵', 'y': '𝔶', 'z': '𝔷' }},
    doubleStruck: { custom: { 'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ', 'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫' }},
    monospace: { start: 0x1D670, startLower: 0x1D68A }
};
const smallCapsMap = { 'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 'ꜱ', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ' };
const upsideDownMap = { 'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'ʃ', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z', ' ': ' ', '.': '˙', ',': "'", '?': '¿', '!': '¡' };
const mirrorMap = { 'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'ʇ', 'g': 'ϱ', 'h': 'ʜ', 'i': 'i', 'j': 'Ⴑ', 'k': 'ʞ', 'l': '|', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'q', 'q': 'p', 'r': 'ɿ', 's': 'ꙅ', 't': 'ƚ', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x', 'y': 'ʏ', 'z': 'z' };
const leetMap = { 'a': '4', 'b': '8', 'c': '<', 'd': '|)', 'e': '3', 'f': '|=', 'g': '6', 'h': '|-|', 'i': '1', 'j': '_|', 'k': '|<', 'l': '|_', 'm': '|\\/|', 'n': '|\\|', 'o': '0', 'p': '|°', 'q': '9', 'r': '|2', 's': '5', 't': '7', 'u': '|_|', 'v': '\\/', 'w': '\\/\\/', 'x': '><', 'y': '`/', 'z': '2' };
const bubbleMap = { 'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ' };
const squareMap = { 'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄶', 'h': '🄷', 'i': '🄸', 'j': '🄹', 'k': '🄺', 'l': '🄻', 'm': '🄼', 'n': '🄽', 'o': '🄾', 'p': '🄿', 'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃', 'u': '🅄', 'v': '🅅', 'w': '🅆', 'x': '🅇', 'y': '🅈', 'z': '🅉' };
const circledMap = { 'a': 'Ⓐ', 'b': 'Ⓑ', 'c': 'Ⓒ', 'd': 'Ⓓ', 'e': 'Ⓔ', 'f': 'Ⓕ', 'g': 'Ⓖ', 'h': 'Ⓗ', 'i': 'Ⓘ', 'j': 'Ⓙ', 'k': 'Ⓚ', 'l': 'Ⓛ', 'm': 'Ⓜ', 'n': 'Ⓝ', 'o': 'Ⓞ', 'p': 'Ⓟ', 'q': 'Ⓠ', 'r': 'Ⓡ', 's': 'Ⓢ', 't': 'Ⓣ', 'u': 'Ⓤ', 'v': 'Ⓥ', 'w': 'Ⓦ', 'x': 'Ⓧ', 'y': 'Ⓨ', 'z': 'Ⓩ' };
const negativeCircledMap = { 'a': '🅐', 'b': '🅑', 'c': '🅒', 'd': '🅓', 'e': '🅔', 'f': '🅕', 'g': '🅖', 'h': '🅗', 'i': '🅘', 'j': '🅙', 'k': '🅚', 'l': '🅛', 'm': '🅜', 'n': '🅝', 'o': '🅞', 'p': '🅟', 'q': '🅠', 'r': '🅡', 's': '🅢', 't': '🅣', 'u': '🅤', 'v': '🅥', 'w': '🅦', 'x': '🅧', 'y': '🅨', 'z': '🅩' };
const sansSerifAllCapsMap = { 'a': '𝖠', 'b': '𝖡', 'c': '𝖢', 'd': '𝖣', 'e': '𝖤', 'f': '𝖥', 'g': '𝖦', 'h': '𝖧', 'i': '𝖨', 'j': '𝖩', 'k': '𝖪', 'l': '𝖫', 'm': '𝖬', 'n': '𝖭', 'o': '𝖮', 'p': '𝖯', 'q': '𝖰', 'r': '𝖱', 's': '𝖲', 't': '𝖳', 'u': '𝖴', 'v': '𝖵', 'w': '𝖶', 'x': '𝖷', 'y': '𝖸', 'z': '𝖹', 'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥', 'G': '𝖦', 'H': '𝖧', 'I': '𝖨', 'J': '𝖩', 'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯', 'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳', 'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷', 'Y': '𝖸', 'Z': '𝖹' };
const sansSerifAllCapsBoldMap = { 'a': '𝗔', 'b': '𝗕', 'c': '𝗖', 'd': '𝗗', 'e': '𝗘', 'f': '𝗙', 'g': '𝗚', 'h': '𝗛', 'i': '𝗜', 'j': '𝗝', 'k': '𝗞', 'l': '𝗟', 'm': '𝗠', 'n': '𝗡', 'o': '𝗢', 'p': '𝗣', 'q': '𝗤', 'r': '𝗥', 's': '𝗦', 't': '𝗧', 'u': '𝗨', 'v': '𝗩', 'w': '𝗪', 'x': '𝗫', 'y': '𝗬', 'z': '𝗭', 'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭' };

function convertToUnicode(text, style) { if (!unicodeMaps[style]) return text; const map = unicodeMaps[style]; if (map.custom) { return [...text].map(char => map.custom[char] || char).join(''); } return [...text].map(char => { const code = char.charCodeAt(0); if (code >= 65 && code <= 90) { return String.fromCodePoint(map.start + code - 65); } else if (code >= 97 && code <= 122) { return String.fromCodePoint(map.startLower + code - 97); } return char; }).join(''); }
function convertToSmallCaps(text) { return [...text].map(char => smallCapsMap[char.toLowerCase()] || char.toUpperCase()).join(''); }
function convertUpsideDown(text) { return text.split('').reverse().map(char => upsideDownMap[char.toLowerCase()] || char).join(''); }
function addCombiningChar(text, combiningChar) { return [...text].map(char => char === ' ' ? char : char + combiningChar).join(''); }
function convertToBubble(text) { return [...text].map(char => bubbleMap[char.toLowerCase()] || char).join(''); }
function convertToSquare(text) { return [...text].map(char => squareMap[char.toLowerCase()] || char).join(''); }
function convertToCircled(text) { return [...text].map(char => circledMap[char.toLowerCase()] || char).join(''); }
function convertToNegativeCircled(text) { return [...text].map(char => negativeCircledMap[char.toLowerCase()] || char).join(''); }
function convertToMirror(text) { return [...text].map(char => mirrorMap[char.toLowerCase()] || char).join(''); }
function convertToZalgo(text) { const zalgoChars = ['̀', '́', '̂', '̃', '̄', '̅', '̆', '̇', '̈', '̉', '̊', '̋', '̌', '̍', '̎', '̏']; return [...text].map(char => { if (char === ' ') return char; let zalgoChar = char; for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) { zalgoChar += zalgoChars[Math.floor(Math.random() * zalgoChars.length)]; } return zalgoChar; }).join(''); }
function convertToLeet(text) { return [...text].map(char => leetMap[char.toLowerCase()] || char).join(''); }
function convertToSansSerifAllCaps(text) { return [...text].map(char => sansSerifAllCapsMap[char] || char).join('');}
function convertToSansSerifAllCapsBold(text) { return [...text].map(char => sansSerifAllCapsBoldMap[char] || char).join('');}



// ==========================================================
// SECTION 2: CORRECTED LOGIC FOR THE IFRAME
// ==========================================================

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

function populateStyleSelector() {
    const selector = document.getElementById('styleSelector');
    selector.innerHTML = '';
    styles.forEach(style => {
        const option = document.createElement('option');
        option.value = style.name;
        option.textContent = style.name;
        selector.appendChild(option);
    });
}

function applyStyleAndPost() {
    const editor = document.getElementById('textEditor');
    const textToStyle = editor.innerText;
    if (!textToStyle.trim()) { showNotification('No text to style!'); return; }
    const selector = document.getElementById('styleSelector');
    const styleName = selector.value;
    const style = styles.find(s => s.name === styleName);
    if (!style) return;
    const styledText = style.fn(textToStyle);
    window.parent.postMessage({ action: 'apply_style', styledText: styledText }, '*');
}

document.addEventListener('DOMContentLoaded', () => {
    populateStyleSelector();
    document.getElementById('applyButton').addEventListener('click', applyStyleAndPost);
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const initialText = urlParams.get('text');
        if (initialText) {
            document.getElementById('textEditor').innerText = decodeURIComponent(initialText);
        }
    } catch (e) { console.error("Error parsing URL params:", e); }
});
