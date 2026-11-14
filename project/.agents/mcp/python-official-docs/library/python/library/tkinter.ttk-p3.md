---
title: "tkinter.ttk --- Tk themed widgets (part 3 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tkinter.ttk.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tkinter.ttk --- Tk themed widgets (part 3 of 6)

## Progressbar

The `ttk.Progressbar` widget shows the status of a
long-running operation.
It can operate in two modes: 1) the determinate mode which shows the amount
completed relative to the total amount of work to be done and 2) the
indeterminate mode which provides an animated display to let the user know that
work is progressing.

### Options

This widget accepts the following specific options:

```text
+----------+---------------------------------------------------------------+
| Option   | Description                                                   |
+==========+===============================================================+
| orient   | One of "horizontal" or "vertical". Specifies the orientation  |
|          | of the progress bar.                                          |
+----------+---------------------------------------------------------------+
| length   | Specifies the length of the long axis of the progress bar     |
|          | (width if horizontal, height if vertical).                    |
+----------+---------------------------------------------------------------+
| mode     | One of "determinate" or "indeterminate".                      |
+----------+---------------------------------------------------------------+
| maximum  | A number specifying the maximum value. Defaults to 100.       |
+----------+---------------------------------------------------------------+
| value    | The current value of the progress bar. In "determinate" mode, |
|          | this represents the amount of work completed. In              |
|          | "indeterminate" mode, it is interpreted as modulo *maximum*;  |
|          | that is, the progress bar completes one "cycle" when its value|
|          | increases by *maximum*.                                       |
+----------+---------------------------------------------------------------+
| variable | A name which is linked to the option value. If specified, the |
|          | value of the progress bar is automatically set to the value of|
|          | this name whenever the latter is modified.                    |
+----------+---------------------------------------------------------------+
| phase    | Read-only option. The widget periodically increments the value|
|          | of this option whenever its value is greater than 0 and, in   |
|          | determinate mode, less than maximum. This option may be used  |
|          | by the current theme to provide additional animation effects. |
+----------+---------------------------------------------------------------+
```

### `start(interval=None)`

Begin autoincrement mode: schedules a recurring timer event that calls
`Progressbar.step()` every *interval* milliseconds. If omitted,
*interval* defaults to 50 milliseconds.

### `step(amount=None)`

Increments the progress bar's value by *amount*.

*amount* defaults to 1.0 if omitted.

### `stop()`

Stop autoincrement mode: cancels any recurring timer event initiated by
`Progressbar.start()` for this progress bar.

## Separator

The `ttk.Separator` widget displays a horizontal or vertical
separator bar.

It has no other methods besides the ones inherited from
`ttk.Widget`.

### Options

This widget accepts the following specific option:

```text
+--------+----------------------------------------------------------------+
| Option | Description                                                    |
+========+================================================================+
| orient | One of "horizontal" or "vertical". Specifies the orientation of|
|        | the separator.                                                 |
+--------+----------------------------------------------------------------+
```

## Sizegrip

The `ttk.Sizegrip` widget (also known as a grow box) allows
the user to resize the containing toplevel window by pressing and dragging the
grip.

This widget has neither specific options nor specific methods, besides the
ones inherited from `ttk.Widget`.

### Platform-specific notes

- On macOS, toplevel windows automatically include a built-in size grip
by default. Adding a `Sizegrip` is harmless, since the built-in
grip will just mask the widget.

### Bugs

- If the containing toplevel's position was specified relative to the right
or bottom of the screen (for example, ....), the `Sizegrip` widget
will not resize the window.
- This widget supports only "southeast" resizing.
