# inkex.tester

Testing module. See :ref:`unittests` for details.

## class NoExtension

```python
class NoExtension(InkscapeExtension): # pylint: disable=too-few-public-methods """Test case must specify 'self.effect_class' to assertEffect.""" def __init__(self, *args, **kwargs): # pylint: disable=super-init-not-called raise NotImplementedError(self.__doc__) def run(self, args=None, output=None)
```

Fake run

## NoExtension.__init__

```python
def __init__(self, *args, **kwargs): # pylint: disable=super-init-not-called raise NotImplementedError(self.__doc__) def run(self, args=None, output=None)
```

Fake run

## NoExtension.run

```python
def run(self, args=None, output=None)
```

Fake run

## class TestCase

```python
class TestCase(MockCommandMixin, BaseCase)
```

Base class for all effects tests, provides access to data_files and
test_without_parameters

## TestCase.rootdir

```python
def rootdir(cls)
```

Return the full path to the extensions directory

## TestCase.datadir

```python
def datadir(cls)
```

Get the data directory (can be over-ridden if needed)

## TestCase.tempdir

```python
def tempdir(self)
```

Generate a temporary location to store files

## TestCase.temp_file

```python
def temp_file(self, prefix="file-", template="{prefix}{name}{suffix}", suffix=".tmp")
```

Generate the filename of a temporary file

## TestCase.data_file

```python
def data_file(cls, filename, *parts, check_exists=True)
```

Provide a data file from a filename, can accept directories as arguments.

.. versionchanged:: 1.2
    ``check_exists`` parameter added

## TestCase.empty_svg

```python
def empty_svg(self)
```

Returns a common minimal svg file

## TestCase.assertDeepAlmostEqual

```python
def assertDeepAlmostEqual(self, first, second, places=None, msg=None, delta=None)
```

Asserts that two objects, possible nested lists, are almost equal.

## TestCase.assertTransformEqual

```python
def assertTransformEqual(self, lhs, rhs, places=7)
```

Assert that two transform expressions evaluate to the same
transformation matrix.

.. versionadded:: 1.1

## TestCase.effect

```python
def effect(self)
```

Generate an effect object

## TestCase.import_string

```python
def import_string(self, string, *args) -> SvgDocumentElement
```

Runs a string through an import extension, with optional arguments
provided as "--arg=value" arguments

## TestCase.export_svg

```python
def export_svg(self, document, *args) -> str
```

Runs a svg through an export extension, with optional arguments
provided as "--arg=value" arguments

## class InkscapeExtensionTestMixin

```python
class InkscapeExtensionTestMixin
```

Automatically setup self.effect for each test and test with an empty svg

## InkscapeExtensionTestMixin.test_default_settings

```python
def test_default_settings(self)
```

Extension works with empty svg file

## class ComparisonMeta

```python
class ComparisonMeta(type)
```

Metaclass for ComparisonMixin which creates parametrized tests that can be run
independently. See :class:`~inkex.tester.ComparisonMixin` for details.

..versionadded :: 1.4

## class ComparisonMixin

```python
class ComparisonMixin(metaclass=ComparisonMeta)
```

This mixin allows to easily specify a set of run-through unit tests for an
extension, which is specified in :attr:`inkex.tester.TestCase.effect_class`.

The commandline parameters are passed in :attr:`comparisons`, the input file
in :attr:`compare_file` (either a list of files, or a single file).

The :class:`ComparisonMeta` metaclass creates a set of independent unit tests
out of this data. Behavior notest:

- The unit tests created are the cross product of :attr:`comparisons` and
  :attr:`compare_file`. If :attr:`compare_file` is a list, the comparison file name
  is suffixed with the current ``compare_file`` name.
- Optionally, :attr:`comparisons_cmpfile_dict` may be specified as
  ``Dict[Tuple[str], str]`` where the keys are sets of command line parameters and
  the values are the filenames of the output file. This takes precedence over
  :attr:`comparisons`.
- If any of those values are properties, their values cannot be accessed at test
  collection time and there will only be a single test, ``test_all_comparisons``
  with otherwise identical behavior.
- If the class overrides ``test_all_comparisons``, no additional tests are
  generated to allow for custom comparison logic.

To create the comparison files for the unit tests, use the ``EXPORT_COMPARE``
environment variable.

## ComparisonMixin.write_compare_data

```python
def write_compare_data(self, infile, outfile, data)
```

Write output

## ComparisonMixin.get_compare_cmpfile

```python
def get_compare_cmpfile(self, args, addout=None)
```

Generate an output file for the arguments given