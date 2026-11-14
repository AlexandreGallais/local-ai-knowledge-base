---
title: "IDLE --- Python editor and shell (part 1 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/idle.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# IDLE --- Python editor and shell

**Source code:** Lib/idlelib/

IDLE is Python's Integrated Development and Learning Environment.

IDLE has the following features:

- cross-platform: works mostly the same on Windows, Unix, and macOS

- Python shell window (interactive interpreter) with colorizing
of code input, output, and error messages

- multi-window text editor with multiple undo, Python colorizing,
smart indent, call tips, auto completion, and other features

- search within any window, replace within editor windows, and search
through multiple files (grep)

- debugger with persistent breakpoints, stepping, and viewing
of global and local namespaces

- configuration, browsers, and other dialogs

The IDLE application is implemented in the `idlelib` package.

## Menus

IDLE has two main window types, the Shell window and the Editor window.  It is
possible to have multiple editor windows simultaneously.  On Windows and
Linux, each has its own top menu.  Each menu documented below indicates
which window type it is associated with.

Output windows, such as used for Edit => Find in Files, are a subtype of editor
window.  They currently have the same top menu but a different
default title and context menu.

On macOS, there is one application menu.  It dynamically changes according
to the window currently selected.  It has an IDLE menu, and some entries
described below are moved around to conform to Apple guidelines.

### File menu (Shell and Editor)

New File
Create a new file editing window.

Open...
Open an existing file with an Open dialog.

Open Module...
Open an existing module (searches sys.path).

Recent Files
Open a list of recent files.  Click one to open it.

Module Browser
Show functions, classes, and methods in the current Editor file in a
tree structure.  In the shell, open a module first.

Path Browser
Show sys.path directories, modules, functions, classes and methods in a
tree structure.

Save
Save the current window to the associated file, if there is one.  Windows
that have been changed since being opened or last saved have a * before
and after the window title.  If there is no associated file,
do Save As instead.

Save As...
Save the current window with a Save As dialog.  The file saved becomes the
new associated file for the window. (If your file manager is set to hide
extensions, the current extension will be omitted in the file name box.
If the new filename has no '.', '.py' and '.txt' will be added for Python
and text files, except that on macOS Aqua,'.py' is added for all files.)

Save Copy As...
Save the current window to different file without changing the associated
file.  (See Save As note above about filename extensions.)

Print Window
Print the current window to the default printer.

Close Window
Close the current window (if an unsaved editor, ask to save; if an unsaved
Shell, ask to quit execution).  Calling `exit()` or `close()` in the Shell
window also closes Shell.  If this is the only window, also exit IDLE.

Exit IDLE
Close all windows and quit IDLE (ask to save unsaved edit windows).

### Edit menu (Shell and Editor)

Undo
Undo the last change to the current window.  A maximum of 1000 changes may
be undone.

Redo
Redo the last undone change to the current window.

Select All
Select the entire contents of the current window.

Cut
Copy selection into the system-wide clipboard; then delete the selection.

Copy
Copy selection into the system-wide clipboard.

Paste
Insert contents of the system-wide clipboard into the current window.

The clipboard functions are also available in context menus.

Find...
Open a search dialog with many options

Find Again
Repeat the last search, if there is one.

Find Selection
Search for the currently selected string, if there is one.

Find in Files...
Open a file search dialog.  Put results in a new output window.

Replace...
Open a search-and-replace dialog.

Go to Line
Move the cursor to the beginning of the line requested and make that
line visible.  A request past the end of the file goes to the end.
Clear any selection and update the line and column status.

Show Completions
Open a scrollable list allowing selection of existing names. See
Completions in the Editing and Navigation section below.

Expand Word
Expand a prefix you have typed to match a full word in the same window;
repeat to get a different expansion.

Show Call Tip
After an unclosed parenthesis for a function, open a small window with
function parameter hints.  See Calltips in the
Editing and Navigation section below.

Show Surrounding Parens
Highlight the surrounding parenthesis.

### Format menu (Editor window only)

Format Paragraph
Rewrap the text block containing the text insert cursor.
Avoid code lines.  See Format block in the
Editing and Navigation section below.

Indent Region
Shift selected lines right by the indent width (default 4 spaces).

Dedent Region
Shift selected lines left by the indent width (default 4 spaces).

Comment Out Region
Insert ## in front of selected lines.

Uncomment Region
Remove leading # or ## from selected lines.

Tabify Region
Turn *leading* stretches of spaces into tabs. (Note: We recommend using
4 space blocks to indent Python code.)

Untabify Region
Turn *all* tabs into the correct number of spaces.

Toggle Tabs
Open a dialog to switch between indenting with spaces and tabs.

New Indent Width
Open a dialog to change indent width. The accepted default by the Python
community is 4 spaces.

Strip Trailing Whitespace
Remove trailing space and other whitespace characters after the last
non-whitespace character of a line by applying `str.rstrip()` to each line,
including lines within multiline strings.  Except for Shell windows,
remove extra newlines at the end of the file.

### Run menu (Editor window only)

Run Module
Do Check Module.  If no error, restart the shell to clean the
environment, then execute the module.  Output is displayed in the Shell
window.  Note that output requires use of `print` or `write`.
When execution is complete, the Shell retains focus and displays a prompt.
At this point, one may interactively explore the result of execution.
This is similar to executing a file with `python -i file` at a command
line.

Run... Customized
Same as Run Module, but run the module with customized
settings.  *Command Line Arguments* extend `sys.argv` as if passed
on a command line. The module can be run in the Shell without restarting.

Check Module
Check the syntax of the module currently open in the Editor window. If the
module has not been saved IDLE will either prompt the user to save or
autosave, as selected in the General tab of the Idle Settings dialog.  If
there is a syntax error, the approximate location is indicated in the
Editor window.

Python Shell
Open or wake up the Python Shell window.

### Shell menu (Shell window only)

View Last Restart
Scroll the shell window to the last Shell restart.

Restart Shell
Restart the shell to clean the environment and reset display and exception handling.

Previous History
Cycle through earlier commands in history which match the current entry.

Next History
Cycle through later commands in history which match the current entry.

Interrupt Execution
Stop a running program.

### Debug menu (Shell window only)

Go to File/Line
Look on the current line. with the cursor, and the line above for a filename
and line number.  If found, open the file if not already open, and show the
line.  Use this to view source lines referenced in an exception traceback
and lines found by Find in Files. Also available in the context menu of
the Shell window and Output windows.

Debugger (toggle)
When activated, code entered in the Shell or run from an Editor will run
under the debugger.  In the Editor, breakpoints can be set with the context
menu.  This feature is still incomplete and somewhat experimental.

Stack Viewer
Show the stack traceback of the last exception in a tree widget, with
access to locals and globals.

Auto-open Stack Viewer
Toggle automatically opening the stack viewer on an unhandled exception.

### Options menu (Shell and Editor)

Configure IDLE
Open a configuration dialog and change preferences for the following:
fonts, indentation, keybindings, text color themes, startup windows and
size, additional help sources, and extensions.  On macOS, open the
configuration dialog by selecting Preferences in the application
menu. For more details, see
Setting preferences under Help and preferences.

Most configuration options apply to all windows or all future windows.
The option items below only apply to the active window.

Show/Hide Code Context (Editor Window only)
Open a pane at the top of the edit window which shows the block context
of the code which has scrolled above the top of the window.  See
Code Context in the Editing and Navigation section
below.

Show/Hide Line Numbers (Editor Window only)
Open a column to the left of the edit window which shows the number
of each line of text.  The default is off, which may be changed in the
preferences (see Setting preferences).

Zoom/Restore Height
Toggles the window between normal size and maximum height. The initial size
defaults to 40 lines by 80 chars unless changed on the General tab of the
Configure IDLE dialog.  The maximum height for a screen is determined by
momentarily maximizing a window the first time one is zoomed on the screen.
Changing screen settings may invalidate the saved height.  This toggle has
no effect when a window is maximized.

### Window menu (Shell and Editor)

Lists the names of all open windows; select one to bring it to the foreground
(deiconifying it if necessary).

### Help menu (Shell and Editor)

About IDLE
Display version, copyright, license, credits, and more.

IDLE Help
Display this IDLE document, detailing the menu options, basic <example-value> and
navigation, and other tips.

Python Docs
Access local Python documentation, if installed, or start a web browser
and open docs.python.org showing the latest Python documentation.

Turtle Demo
Run the turtledemo module with example Python code and turtle drawings.

Additional help sources may be added here with the Configure IDLE dialog under
the General tab. See the Help sources subsection below
for more on Help menu choices.

### Context menus

Open a context menu by right-clicking in a window (Control-click on macOS).
Context menus have the standard clipboard functions also on the Edit menu.

Cut
Copy selection into the system-wide clipboard; then delete the selection.

Copy
Copy selection into the system-wide clipboard.

Paste
Insert contents of the system-wide clipboard into the current window.

Editor windows also have breakpoint functions.  Lines with a breakpoint set are
specially marked.  Breakpoints only have an effect when running under the
debugger.  Breakpoints for a file are saved in the user's `.idlerc`
directory.

Set Breakpoint
Set a breakpoint on the current line.

Clear Breakpoint
Clear the breakpoint on that line.

Shell and Output windows also have the following.

Go to file/line
Same as in Debug menu.

The Shell window also has an output squeezing facility explained in the *Python
Shell window* subsection below.

Squeeze
If the cursor is over an output line, squeeze all the output between
the code above and the prompt below down to a 'Squeezed text' label.
