---
title: "inkex.gui.app"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/gui/app.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.gui.app

Gtk Application base classes, providing a way to load a GtkBuilder
with a specific glade/ui file containing windows, and building
a usable pythonic interface from them.

## class GtkApp

```python
class GtkApp
```

This wraps gtk builder and allows for some extra functionality with
windows, especially the management of gtk main loops.

Args:
start_loop (bool, optional): If set to true will start a new gtk main loop.
Defaults to False.
start_gui (bool, optional): Used as local propertes if unset and passed to
primary window when loaded. Defaults to True.

## GtkApp.prefix

```python
def prefix(self)
```

Folder prefix added to ui_dir

## GtkApp.windows

```python
def windows(self)
```

Returns a list of windows for this app

## GtkApp.ui_dir

```python
def ui_dir(self)
```

This is often the local directory

## GtkApp.ui_file

```python
def ui_file(self)
```

If a single file is used for multiple windows

## GtkApp.app_name

```python
def app_name(self)
```

Set this variable in your class

## GtkApp.window

```python
def window(self)
```

Return the primary window

## GtkApp.__init__

```python
def __init__(self, start_loop=False, start_gui=True, **kwargs)
```

Creates a new GtkApp.

## GtkApp.run

```python
def run(self)
```

Run the gtk mainloop with ctrl+C and keyboard interrupt additions

## GtkApp.get_ui_file

```python
def get_ui_file(self, window)
```

Load any given gtk builder file from a standard location.

## GtkApp.init_gui

```python
def init_gui(self)
```

Initialise all of our windows and load their signals

## GtkApp.load_window

```python
def load_window(self, name, *args, **kwargs)
```

Load a specific window from our group of windows

## GtkApp.load_window_extract

```python
def load_window_extract(self, name, **kwargs)
```

Load a child window as a widget container

## GtkApp.proto_window

```python
def proto_window(self, name)
```

Loads a Glade window as a window without initialisation, used for
extracting widgets from windows without loading them as windows.

## GtkApp.remove_window

```python
def remove_window(self, window)
```

Remove the window from the list and exit if none remain

## GtkApp.exit

```python
def exit(self)
```

Exit our gtk application and kill gtk main if we have to
