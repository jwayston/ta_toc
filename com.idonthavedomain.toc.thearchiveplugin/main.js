/* Table of Contents (TOC) formatter plugin for "The Archive" app

License: CC-BY-4.0
Author: JW

*/

"use strict";

/* 
Word wrap snippet

URL: https://github.com/Chalarangelo/30-seconds-of-code/blob/master/content/snippets/js/s/word-wrap.md
License: CC-BY-4.0
Credits: Angelos Chalaris
*/

const wordWrap = (str, max, br = '\n') => str.replace(
	new RegExp(`(?![^\\n]{1,${max}}$)([^\\n]{1,${max}})\\s`, 'g'), `$1${br}`
);


/* Main program logic */

const promptIndent = parseInt(app.prompt({title: "Indent level", defaultValue: 0}));

if (!Number.isInteger(promptIndent))
	cancel("You didn't provide an indentation level or it wasn't a number");


// Settings
const LINEBR = "\n";
const COLS = 80;
const INDENT = promptIndent;
const INDENT_SUB = INDENT + 2;

const regexLine = /^(.+)(\[\[.+\]\]|(?<=\s).*$)/;
const selection = input.text.selected.normalize("NFC");

// Parse text line
function parseLine(textLine)
{
    let tocLine = "";
    let particles = textLine.match(regexLine);

    if (!particles)
        return textLine;

    const preface = particles[1];
    const link = particles[2];
    const indent = " ".repeat(INDENT);
    const subIndent = " ".repeat(INDENT_SUB)
    let wrappedText = wordWrap(preface, COLS - INDENT - link.length, LINEBR).split(LINEBR);

    tocLine += `${indent}${wrappedText[0]}`;
    wrappedText.shift();  // Remove first wrapped line, we used it already

    // If there are no other lines, just output the dots and link
    if (wrappedText.length === 0)
    {
        const dotsCount = COLS - tocLine.length - link.length - 1;
        if (dotsCount < 0)
            tocLine += `${link}${LINEBR}`;
        else
            tocLine += `${".".repeat(dotsCount)} ${link}${LINEBR}`;
    }
    // Parse subsequent lines of the word wrapped text
    else 
    {
        // Join the previously wrapped text so that we can rewrap it to achieve hanging indent
        const joinedText = wrappedText.join(" ");
        wrappedText = wordWrap(joinedText, COLS - INDENT_SUB - link.length, LINEBR).split(LINEBR);

        tocLine += LINEBR;

        // Process subsequent lines of the wrapped text
        wrappedText.forEach(function(line, idx, arr) 
        {
            // If we are not on the last line, just indent
            if (idx !== arr.length - 1)
            {
                tocLine += `${subIndent}${line}${LINEBR}`;
                return;
            } 

            // On the last line, inject the dots
            const dotsCount = COLS - INDENT_SUB - line.length - link.length - 1;
            const dots = ".".repeat(dotsCount);
            tocLine += `${subIndent}${line}${dots} ${link}${LINEBR}`;
        })
    }

    return tocLine;
}

let outputText = "";

selection.split(LINEBR).forEach(line =>
{
	outputText += parseLine(line);
})

output.insert.text = outputText;

