# TOC

This plugin takes in a text selection and formats the given input to look like a nice TOC.

Features/limitations:
  - Asks user for the initial indentation level
  - When word wrapping occurs, the subsequent lines are indented by 2 characters more than initial indentation level
  - Width of text, subsequent indent length and word wrap threshold are hard coded

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
