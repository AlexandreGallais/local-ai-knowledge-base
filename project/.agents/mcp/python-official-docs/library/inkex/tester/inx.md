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