---
title: "inkex.gui"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/gui/__init__.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.gui

This is a wrapper layer to make interacting with Gtk a little less painful.
The main issues with Gtk is that it expects an awful lot of the developer,
code which is repeated over and over and patterns which every single developer
will use are not given easy to use convenience functions.

This makes Gtk programming WET, unattractive and error prone. This module steps
inbetween and adds in all those missing bits. It's not meant to replace Gtk and
certainly it's possible to use Gtk and threading directly.

> *Added in version 1.2.*
