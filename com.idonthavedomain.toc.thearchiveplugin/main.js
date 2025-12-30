/* Table of Contents (TOC) formatter plugin for "The Archive" app

License: CC-BY-4.0
Author: JW

*/

"use strict";

const userPrompt = parseInt(app.prompt({title: "Indent", defaultValue: 0}));

if (!Number.isInteger(userPrompt))
{
	cancel("You didn't provide an indentation level or it wasn't a number");
}

// Settings
const LINEBR = "\n";
const COLS = 80;
const LINK_MAXLEN = 16;
const INDENT = userPrompt;
const INDENT_SUB = INDENT + 2;

const lineRegexp = /^(.+)(\[\[.+\]\])/;
const selection = input.text.selected.normalize("NFC");

/* Word wrap snippet
URL: https://github.com/Chalarangelo/30-seconds-of-code/blob/master/content/snippets/js/s/word-wrap.md
License: CC-BY-4.0
Credits: Angelos Chalaris
*/

const wordWrap = (str, max, br = '\n') => str.replace(
	new RegExp(`(?![^\\n]{1,${max}}$)([^\\n]{1,${max}})\\s`, 'g'), `$1${br}`
);

// Parse text line
const parseLine = (textLine) => 
{
	let tocLine = "";
	let particles = textLine.match(lineRegexp);

	if (particles) 
	{
		const preface = particles[1];
		const link = particles[2];
		const indent = " ".repeat(INDENT);
		const subIndent = " ".repeat(INDENT_SUB)
		let wrappedText = wordWrap(preface, COLS - INDENT - LINK_MAXLEN, LINEBR).split(LINEBR);

		tocLine += `${indent}${wrappedText[0]}`;
		wrappedText.shift();  // Remove first wrapped line since we used it already

		// Parse subsequent lines of the word wrapped text
		if (wrappedText.length === 0)  // If there are no other lines, just output the dots and link
		{
			const dots = ".".repeat(COLS - tocLine.length - link.length - 1);
			tocLine += `${dots} ${link}${LINEBR}`;
		}
		else 
		{
			const joinedText = wrappedText.join(" ");
			tocLine += LINEBR;
			wrappedText = wordWrap(joinedText, COLS - INDENT_SUB - LINK_MAXLEN, LINEBR).split(LINEBR);

			wrappedText.forEach(function(elem, idx, arr) 
			{
				if (idx === arr.length - 1)  // Check if we are on the last line
				{
					const dots = ".".repeat(COLS - INDENT_SUB - elem.length - link.length - 1);
					tocLine += `${subIndent}${elem}${dots} ${link}${LINEBR}`;
				} 
				else 
				{
					tocLine += `${subIndent}${elem}${LINEBR}`;
				}
			})
		}
	}
	return tocLine;
}

let outputText = "";

selection.split(LINEBR).forEach(elem =>
{
	outputText += parseLine(elem);
})

output.insert.text = outputText;
