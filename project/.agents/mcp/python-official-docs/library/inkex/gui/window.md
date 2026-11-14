---
title: "inkex.gui.window"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/gui/window.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.gui.window

Wraps the gtk windows with something a little nicer.

## protect

```python
def protect(cls, *methods)
```

Simple check for protecting an inherited class from having
certain methods over-ridden

## class Window

```python
class Window
```

This wraps gtk windows and allows for having parent windows.

## Window.extract

```python
def extract(self)
```

Extract this window's container for use in other apps

## Window.init

```python
def init(self, parent=None, **kwargs)
```

Initialise the window within the GtkApp

## Window.load_window

```python
def load_window(self, name, *args, **kwargs)
```

Load child window, automatically sets parent

## Window.load_widgets

```python
def load_widgets(self)
```

Child class should use this to create widgets

## Window.destroy

```python
def destroy(self, widget=None): # pylint: disable=unused-argument """Destroy the window""" logging.debug("Destroying Window '%s'", self.name) self.window.destroy() # We don't need to call self.exit(), handeled by window event. def pre_exit(self)
```

Internal method for what to do when the window has died

## Window.pre_exit

```python
def pre_exit(self)
```

Internal method for what to do when the window has died

## Window.exit

```python
def exit(self, widget=None)
```

Called when the window needs to exit.

## Window.post_exit

```python
def post_exit(self)
```

Called after we've killed the window

## Window.if_widget

```python
def if_widget(self, name)
```

Attempt to get the widget from gtk, but if not return a fake that won't
cause any trouble if we don't further check if it's real.

## Window.replace

```python
def replace(self, old, new)
```

Replace the old widget with the new widget

## Window.get_widget_name

```python
def get_widget_name(obj)
```

Return the widget's name in the builder file

## class ChildWindow

```python
class ChildWindow(Window)
```

Base class for child window objects.

These child windows are typically
window objects in the same gtk builder file as their parents. If you just want
to make a window that interacts with a parent window, use the normal
Window class and call with the optional parent attribute.

## class FakeWidget

```python
class FakeWidget
```

A fake widget class that can take calls
