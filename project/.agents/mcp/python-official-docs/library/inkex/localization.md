---
title: "inkex.localization"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/localization.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.localization

Allow extensions to translate messages.

## localize

```python
def localize(domain=GETTEXT_DOMAIN, localedir=GETTEXT_DIRECTORY)
```

Configure gettext and install _() function into builtins namespace for easy
access

## inkex_localize

```python
def inkex_localize()
```

Return internal Translations instance for translation of the inkex module itself
Those will always use the 'inkscape' domain and attempt to lookup the same catalog
Inkscape uses

## inkex_fgettext

```python
def inkex_fgettext(message, *args, **kwargs)
```

Shortcut for gettext and subsequent formatting. Import as:

```
from inkex.localize import inkex_fgettext as _f
```

The positionals and keyword arguments are passed to `str.format()`.

The call to xgettext must contain:

```
--keyword=_f
```
