---
title: "IDLE --- Python editor and shell (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/idle.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# IDLE --- Python editor and shell (part 2 of 4)

## Editing and Navigation

### Editor windows

IDLE may open editor windows when it starts, depending on settings
and how you start IDLE.  Thereafter, use the File menu.  There can be only
one open editor window for a given file.

The title bar contains the name of the file, the full path, and the version
of Python and IDLE running the window.  The status bar contains the line
number ('Ln') and column number ('Col').  Line numbers start with 1;
column numbers with 0.

IDLE assumes that files with a known .py* extension contain Python code
and that other files do not.  Run Python code with the Run menu.

### Key <example-value>

The IDLE insertion cursor is a thin vertical bar between character
positions.  When characters are entered, the insertion cursor and
everything to its right moves right one character and
the new character is entered in the new space.

Several non-character keys move the cursor and possibly
delete characters.  Deletion does not puts text on the clipboard,
but IDLE has an undo list.  Wherever this doc discusses keys,
'C' refers to the `Control` key on Windows and
Unix and the `Command` key on macOS.  (And all such discussions
assume that the keys have not been re-bound to something else.)

- Arrow keys move the cursor one character or line.

- `C-LeftArrow` and `C-RightArrow` moves left or right one word.

- `Home` and `End` go to the beginning or end of the line.

- `Page Up` and `Page Down` go up or down one screen.

- `C-Home` and `C-End` go to beginning or end of the file.

- `Backspace` and `Del` (or `C-d`) delete the previous
or next character.

- `C-Backspace` and `C-Del` delete one word left or right.

- `C-k` deletes ('kills') everything to the right.

Standard keybindings (like `C-c` to copy and `C-v` to paste)
may work.  Keybindings are selected in the Configure IDLE dialog.

### Automatic indentation

After a block-opening statement, the next line is indented by 4 spaces (in the
Python Shell window by one tab).  After certain keywords (break, return etc.)
the next line is dedented.  In leading indentation, `Backspace` deletes up
to 4 spaces if they are there. `Tab` inserts spaces (in the Python
Shell window one tab), number depends on Indent width. Currently, tabs
are restricted to four spaces due to Tcl/Tk limitations.

See also the indent/dedent region commands on the
Format menu.

### Search and Replace

Any selection becomes a search target.  However, only selections within
a line work because searches are only performed within lines with the
terminal newline removed.  If `[x] Regular expression` is checked, the
target is interpreted according to the Python re module.

### Completions

Completions are supplied, when requested and available, for module
names, attributes of classes or functions, or filenames.  Each request
method displays a completion box with existing names.  (See tab
completions below for an exception.) For any box, change the name
being completed and the item highlighted in the box by
typing and deleting characters; by hitting `Up`, `Down`,
`PageUp`, `PageDown`, `Home`, and `End` keys;
and by a single click within the box.  Close the box with `Escape`,
`Enter`, and double `Tab` keys or clicks outside the box.
A double click within the box selects and closes.

One way to open a box is to type a key <example-value> and wait for a
predefined interval.  This defaults to 2 seconds; customize it
in the settings dialog.  (To prevent auto popups, set the delay to a
large number of milliseconds, such as 100000000.) For imported module
names or class or function attributes, type '.'.
For filenames in the root directory, type `os.sep` or
`os.altsep` immediately after an opening quote.  (On Windows,
one can specify a drive first.)  Move into subdirectories by typing a
directory name and a separator.

Instead of waiting, or after a box is closed, open a completion box
immediately with Show Completions on the Edit menu.  The default hot
key is `C-space`.  If one types a prefix for the desired name
before opening the box, the first match or near miss is made visible.
The result is the same as if one enters a prefix
after the box is displayed.  Show Completions after a quote completes
filenames in the current directory instead of a root directory.

Hitting `Tab` after a prefix usually has the same effect as Show
Completions.  (With no prefix, it indents.)  However, if there is only
one match to the prefix, that match is immediately added to the editor
text without opening a box.

Invoking 'Show Completions', or hitting `Tab` after a prefix,
outside of a string and without a preceding '.' opens a box with
keywords, builtin names, and available module-level names.

When editing code in an editor (as oppose to Shell), increase the
available module-level names by running your code
and not restarting the Shell thereafter.  This is especially useful
after adding imports at the top of a file.  This also increases
possible attribute completions.

Completion boxes initially exclude names beginning with '_' or, for
modules, not included in '__all__'.  The hidden names can be accessed
by typing '_' after '.', either before or after the box is opened.

### Calltips

A calltip is shown automatically when one types `(` after the name
of an *accessible* function.  A function name expression may include
dots and subscripts.  A calltip remains until it is clicked, the cursor
is moved out of the argument area, or `)` is typed.  Whenever the
cursor is in the argument part of a definition, select Edit and "Show
Call Tip" on the menu or enter its shortcut to display a calltip.

The calltip consists of the function's signature and docstring up to
the latter's first blank line or the fifth non-blank line.  (Some builtin
functions lack an accessible signature.)  A '/' or '*' in the signature
indicates that the preceding or following arguments are passed by
position or name (keyword) only.  Details are subject to change.

In Shell, the accessible functions depends on what modules have been
imported into the user process, including those imported by Idle itself,
and which definitions have been run, all since the last restart.

For example, restart the Shell and enter `itertools.count(`.  A calltip
appears because Idle imports itertools into the user process for its own
use.  (This could change.)  Enter `turtle.write(` and nothing appears.
Idle does not itself import turtle.  The menu entry and shortcut also do
nothing.  Enter `import turtle`.  Thereafter, `turtle.write(`
will display a calltip.

In an editor, import statements have no effect until one runs the file.
One might want to run a file after writing import statements, after
adding function definitions, or after opening an existing file.

### Format block

Reformat Paragraph rewraps a block ('paragraph') of contiguous equally
indented non-blank comments, a similar block of text within a multiline
string, or a selected subset of either.
If needed, add a blank line to separate string from code.
Partial lines in a selection expand to complete lines.
The resulting lines have the same indent as before
but have maximum total length of N columns (characters).
Change the default N of 72 on the Window tab of IDLE Settings.

### Code Context

Within an editor window containing Python code, code context can be toggled
in order to show or hide a pane at the top of the window.  When shown, this
pane freezes the opening lines for block code, such as those beginning with
`class`, `def`, or `if` keywords, that would have otherwise scrolled
out of view.  The size of the pane will be expanded and contracted as needed
to show the all current levels of context, up to the maximum number of
lines defined in the Configure IDLE dialog (which defaults to 15).  If there
are no current context lines and the feature is toggled on, a single blank
line will display.  Clicking on a line in the context pane will move that
line to the top of the editor.

The text and background colors for the context pane can be configured under
the Highlights tab in the Configure IDLE dialog.

### Shell window

In IDLE's Shell, enter, edit, and recall complete statements. (Most
consoles and terminals only work with a single physical line at a time).

Submit a single-line statement for execution by hitting `Return`
with the cursor anywhere on the line.  If a line is extended with
Backslash (`\`), the cursor must be on the last physical line.
Submit a multi-line compound statement by entering a blank line after
the statement.

When one pastes code into Shell, it is not compiled and possibly executed
until one hits `Return`, as specified above.
One may edit pasted code first.
If one pastes more than one statement into Shell, the result will be a
`SyntaxError` when multiple statements are compiled as if they were one.

Lines containing `RESTART` mean that the user execution process has been
re-started.  This occurs when the user execution process has crashed,
when one requests a restart on the Shell menu, or when one runs code
in an editor window.

The editing features described in previous subsections work when entering
code interactively.  IDLE's Shell window also responds to the following:

- `C-c` attempts to interrupt statement execution (but may fail).

- `C-d` closes Shell if typed at a `>>>` prompt.

- `Alt-p` and `Alt-n` (`C-p` and `C-n` on macOS)
retrieve to the current prompt the previous or next previously
entered statement that matches anything already typed.

- `Return` while the cursor is on any previous statement
appends the latter to anything already typed at the prompt.

### Text colors

Idle defaults to black on white text, but colors text with special meanings.
For the shell, these are shell output, shell error, user output, and
user error.  For Python code, at the shell prompt or in an editor, these are
keywords, builtin class and function names, names following `class` and
`def`, strings, and comments. For any text window, these are the cursor (when
present), found text (when possible), and selected text.

IDLE also highlights the soft keywords `match`,
`case, and ` in
pattern-matching statements. However, this highlighting is not perfect and
will be incorrect in some rare cases, including some `_`-s in `case`
patterns.

Text coloring is done in the background, so uncolorized text is occasionally
visible.  To change the color scheme, use the Configure IDLE dialog
Highlighting tab.  The marking of debugger breakpoint lines in the editor and
text in popups and dialogs is not user-configurable.
