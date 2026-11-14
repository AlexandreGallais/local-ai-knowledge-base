---
title: "inkex.gui.tester"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/gui/tester.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.gui.tester

Structures for consistant testing of Gtk GUI programs.

## class MainLoopProtection

```python
class MainLoopProtection
```

This protection class provides a way to launch the Gtk mainloop in a test
friendly way.

Exception handling hooks provide a way to see errors that happen
inside the main loop, raising them back to the caller.

A full timeout in seconds stops the gtk mainloop from operating
beyond a set time, acting as a kill switch in the event something
has gone horribly wrong.

Usage:

```python
with MainLoopProtection(timeout=10s):
    app.run()
```
