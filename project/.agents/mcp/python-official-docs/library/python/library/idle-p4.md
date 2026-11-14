---
title: "IDLE --- Python editor and shell (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/idle.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# IDLE --- Python editor and shell (part 4 of 4)

## Help and Preferences

### Help sources

Help menu entry "IDLE Help" displays a formatted html version of the
IDLE chapter of the Library Reference.  The result, in a read-only
tkinter text window, is close to what one sees in a web browser.
Navigate through the text with a mousewheel,
the scrollbar, or up and down arrow keys held down.
Or click the TOC (Table of Contents) button and select a section
header in the opened box.

Help menu entry "Python Docs" opens the extensive sources of help,
including tutorials, available at `docs.python.org/x.y`, where 'x.y'
is the currently running Python version.  If your system
has an off-line copy of the docs (this may be an installation option),
that will be opened instead.

Selected URLs can be added or removed from the help menu at any time using the
General tab of the Configure IDLE dialog.

### Setting preferences

The font preferences, highlighting, keys, and general preferences can be
changed via Configure IDLE on the Option menu.
Non-default user settings are saved in a `.idlerc` directory in the user's
home directory.  Problems caused by bad user configuration files are solved
by editing or deleting one or more of the files in `.idlerc`.

On the Font tab, see the text sample for the effect of font face and size
on multiple characters in multiple languages.  Edit the sample to add
other characters of personal interest.  Use the sample to select
monospaced fonts.  If particular characters have problems in Shell or an
editor, add them to the top of the sample and try changing first size
and then font.

On the Highlights and Keys tab, select a built-in or custom color theme
and key set.  To use a newer built-in color theme or key set with older
IDLEs, save it as a new custom theme or key set and it well be accessible
to older IDLEs.

### IDLE on macOS

Under System Preferences: Dock, one can set "Prefer tabs when opening
documents" to "Always".  This setting is not compatible with the tk/tkinter
GUI framework used by IDLE, and it breaks a few IDLE features.

### Extensions

IDLE contains an extension facility.  Preferences for extensions can be
changed with the Extensions tab of the preferences dialog. See the
beginning of config-extensions.def in the idlelib directory for further
information.  The only current default extension is zzdummy, an example
also used for testing.

## idlelib --- implementation of IDLE application

Module `idlelib`.

**Source code:** Lib/idlelib

The Lib/idlelib package implements the IDLE application.  See the rest
of this page for how to use IDLE.

The files in idlelib are described in idlelib/README.txt.  Access it
either in idlelib or click Help => About IDLE on the IDLE menu.  This
file also maps IDLE menu items to the code that implements the item.
Except for files listed under 'Startup', the idlelib code is 'private' in
sense that feature changes can be backported (see PEP 434).
