# TOC

This plugin takes in a text selection and formats the given input to look like a nice TOC.

Features/limitations:
  - Asks user for the initial indentation level
  - When word wrapping occurs, the subsequent lines are indented by 2 characters more than initial indentation level
  - Width of text (80 characters), subsequent indent length (2) and word wrap threshold are hard coded
  - Links longer than 16 characters (including brackets) are not supported and
    may break the behaviour

Example in:

```
Some text [[202512180127]]
So long text that it forces to trigger word wrapping functionality [[202512192310]]
```

Example out (using initial indent of 2):

```
  Some text ................................................... [[202512180127]]
  So long text that it forces to trigger word wrapping
    functionality ............................................. [[202512192310]]
```

## Credits

A crucial part of the word wrapping functionality of the plugin comes from the regexp snippet borrowed from ["30 seconds of code"](https://github.com/Chalarangelo/30-seconds-of-code/blob/master/content/snippets/js/s/word-wrap.md) maintained by Angelos Chalaris. The snippet is licensed under CC-BY-4.0.
