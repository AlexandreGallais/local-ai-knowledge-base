# inkex.gui

This is a wrapper layer to make interacting with Gtk a little less painful.
The main issues with Gtk is that it expects an awful lot of the developer,
code which is repeated over and over and patterns which every single developer
will use are not given easy to use convenience functions.

This makes Gtk programming WET, unattractive and error prone. This module steps
inbetween and adds in all those missing bits. It's not meant to replace Gtk and
certainly it's possible to use Gtk and threading directly.

.. versionadded:: 1.2