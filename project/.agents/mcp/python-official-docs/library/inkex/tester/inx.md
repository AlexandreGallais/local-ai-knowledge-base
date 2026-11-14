---
title: "inkex.tester.inx"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/tester/inx.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.tester.inx

Test elements extra logic from svg xml lxml custom classes.

## class InxMixin

```python
class InxMixin
```

Tools for Testing INX files, use as a mixin class:

class MyTests(InxMixin, TestCase):
def test_inx_file(self):
self.assertInxIsGood("some_inx_file.inx")

## InxMixin.introspect_arg_parser

```python
def introspect_arg_parser(self, arg_parser)
```

Pull apart the arg parser to find out what we have in it

## InxMixin.introspect_action

```python
def introspect_action(action)
```

Pull apart a single action to get at the juicy insides

## InxMixin.parse_param

```python
def parse_param(param)
```

Pull apart the param element in the inx file
