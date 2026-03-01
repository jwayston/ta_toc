/* Table of Contents (TOC) formatter plugin for "The Archive" app

    License: CC-BY-4.0
    Author: JW
*/

"use strict";

/* Word wrap snippet

    URL: https://github.com/Chalarangelo/30-seconds-of-code/blob/master/content/snippets/js/s/word-wrap.md
    License: CC-BY-4.0
    Author: Angelos Chalaris
*/

const wordWrap = (str, max, br = '\n') => str.replace(
    new RegExp(`(?![^\\n]{1,${max}}$)([^\\n]{1,${max}})\\s`, 'g'), `$1${br}`
);

/* End of Word wrap snippet */


const COLS = 80;
const LINEBR = "\n";
const prompt = parseInt(app.prompt({title: "Indent", defaultValue: 0}));
const INDENT = (Number.isInteger(prompt) && prompt >= 0) ? prompt : 0;
const pad = " ".repeat(INDENT);

const tocBuildLine = text => {
    const regexData = new RegExp(/^(.+)(\[\[.+\]\]|(?<=\s).*$)/);
    const data = text.match(regexData);
    if (!data || text.length == 80 ) return text;

    const [_, , link] = data;
    const wrapAt = COLS - link.length - INDENT - (INDENT + 2);

    // Wrap text and add hanging indent
    let lines = text.length > COLS ? wordWrap(text, wrapAt).split(LINEBR) : [text];
    lines = lines.map((l, i) => i ? `  ${pad}${l}` : l);

    // Add dots
    const lastIdx = lines.length - 1;
    const lastLineData = lines[lastIdx].match(regexData);
    const dots = ".".repeat(COLS - lines[lastIdx].length - 1);

    lines[lastIdx] = `${lastLineData[1]}${dots} ${lastLineData[2]}`;
    return lines.join(LINEBR);
}

const selection = input.text.selected.normalize("NFC");

output.insert.text = selection.split(LINEBR)
    .map(l => tocBuildLine(`${pad}${l}`))
    .join("\n");
