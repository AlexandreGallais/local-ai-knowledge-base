---
title: "inkex.tester.mock"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/tester/mock.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.tester.mock

Any mocking utilities required by testing. Mocking is when you need the test
to exercise a piece of code, but that code may or does call on something
outside of the target code that either takes too long to run, isn't available
during the test running process or simply shouldn't be running at all.

## class Capture

```python
class Capture
```

Capture stdout or stderr. Used as `with Capture('stdout') as stream:`

## class ManualVerbosity

```python
class ManualVerbosity
```

Change the verbosity of the test suite manually

## ManualVerbosity.flip

```python
def flip(self, exc_type=None, exc_val=None, exc_tb=None): # pylint: disable=unused-argument """Swap the stored verbosity with the original""" self.okay, self.result.showAll = self.result.showAll, self.okay self.dots, self.result.dots = self.result.dots, self.okay __enter__ = flip __exit__ = flip class MockMixin
```

Add mocking ability to any test base class, will set up mock on setUp
and remove it on tearDown.

Mocks are stored in an array attached to the test class (not instance!) which
ensures that mocks can only ever be setUp once and can never be reset over
themselves. (just in case this looks weird at first glance):

```python
class SomeTest(MockingMixin, TestBase):
    mocks = [(sys, 'exit', NoSystemExit("Nope!")]
```

## class MockMixin

```python
class MockMixin
```

Add mocking ability to any test base class, will set up mock on setUp
and remove it on tearDown.

Mocks are stored in an array attached to the test class (not instance!) which
ensures that mocks can only ever be setUp once and can never be reset over
themselves. (just in case this looks weird at first glance):

```python
class SomeTest(MockingMixin, TestBase):
    mocks = [(sys, 'exit', NoSystemExit("Nope!")]
```

## MockMixin.old_call

```python
def old_call(self, name)
```

Get the original caller

## class MockCommandMixin

```python
class MockCommandMixin(MockMixin)
```

Replace all the command functions with testable replacements.

This stops the pipeline and people without the programs, running into problems.

## MockCommandMixin.setUp

```python
def setUp(self): # pylint: disable=invalid-name super().setUp() # This is a the daftest thing I've ever seen, when in the middle # of a mock, the 'self' variable magically turns from a FooTest # into a TestCase, this makes it impossible to find the datadir. from . import TestCase TestCase._mockdatadir = self.datadir() @classmethod def cmddir(cls)
```

Returns the location of all the mocked command results

## MockCommandMixin.cmddir

```python
def cmddir(cls)
```

Returns the location of all the mocked command results

## MockCommandMixin.record_tempdir

```python
def record_tempdir(self, *args, **kwargs)
```

Record any attempts to make tempdirs

## MockCommandMixin.clean_paths

```python
def clean_paths(self, data, files)
```

Clean a string of any files or tempdirs

## MockCommandMixin.get_all_tempfiles

```python
def get_all_tempfiles(self)
```

Returns a set() of all files currently in any of the tempdirs

## MockCommandMixin.ignore_command_mock

```python
def ignore_command_mock(self, program, arglst, path)
```

Return true if the mock is ignored

## MockCommandMixin.mock_call

```python
def mock_call(self, program, *args, **kwargs)
```

Replacement for the inkex.command.call() function, instead of calling
an external program, will compile all arguments into a hash and use the
hash to find a command result.

## MockCommandMixin.add_call_files

```python
def add_call_files(self, msg, args, kwargs)
```

Gather all files, adding input files to the msg (for hashing) and
output files to the returned files list (for outputting in debug)

## MockCommandMixin.add_call_file

```python
def add_call_file(self, msg, filename)
```

Add a single file to the given mime message

## MockCommandMixin.get_call_filename

```python
def get_call_filename(self, program, key, create=False)
```

Get the filename for the call testing information.

## MockCommandMixin.get_program_name

```python
def get_program_name(program)
```

Takes a program and returns a program name

## MockCommandMixin.get_call_path

```python
def get_call_path(self, program, create=True)
```

Get where this program would store it's test data

## MockCommandMixin.load_call

```python
def load_call(self, program, key, files)
```

Load the given call

## MockCommandMixin.save_key

```python
def save_key(self, program, key, keystr, ext="key")
```

Save the key file if we are debugging the key data
