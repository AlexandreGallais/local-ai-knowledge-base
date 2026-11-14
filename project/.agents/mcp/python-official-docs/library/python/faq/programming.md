---
title: "Programming FAQ (part 1 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/faq/programming.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

- **tocdepth:** 2

# Programming FAQ

html

## General questions

### Is there a source code-level debugger with breakpoints and single-stepping?

Yes.

Several debuggers for Python are described below, and the built-in function
`breakpoint()` allows you to drop into any of them.

The pdb module is a simple but adequate console-mode debugger for Python. It is
part of the standard Python library, and is :mod:`documented in the Library
Reference Manual <pdb>`. You can also write your own debugger by using the code
for pdb as an example.

The IDLE interactive development environment, which is part of the standard
Python distribution (normally available as `idlelib`),
includes a graphical debugger.

PythonWin is a Python IDE that includes a GUI debugger based on pdb.  The
PythonWin debugger colors breakpoints and has quite a few cool features such as
debugging non-PythonWin programs.  PythonWin is available as part of
pywin32 project and
as a part of the
ActivePython distribution.

Eric is an IDE built on PyQt
and the Scintilla editing component.

trepan3k is a gdb-like debugger.

Visual Studio Code is an IDE with debugging
tools that integrates with version-control software.

There are a number of commercial Python IDEs that include graphical debuggers.
They include:

- Wing IDE
- PyCharm

### Are there tools to help find bugs or perform static analysis?

Yes.

Ruff,
Pylint and
Pyflakes do basic <example-value> that will
help you catch bugs sooner.

Static type checkers such as mypy,
ty,
Pyrefly, and
pytype can check type hints in Python
source code.

### How can I create a stand-alone binary from a Python script?

You don't need the ability to compile Python to C code if all you want is a
stand-alone program that users can download and run without having to install
the Python distribution first.  There are a number of tools that determine the
set of modules required by a program and bind these modules together with a
Python binary to produce a single executable.

One is to use the freeze tool, which is included in the Python source tree as
Tools/freeze.
It converts Python byte code to C arrays; with a C compiler you can
embed all your modules into a new program, which is then linked with the
standard Python modules.

It works by scanning your source recursively for import statements (in both
forms) and looking for the modules in the standard Python path as well as in the
source directory (for built-in modules).  It then turns the bytecode for modules
written in Python into C code (array initializers that can be turned into code
objects using the marshal module) and creates a custom-made config file that
only contains those built-in modules which are actually used in the program.  It
then compiles the generated C code and links it with the rest of the Python
interpreter to form a self-contained binary which acts exactly like your script.

The following packages can help with the creation of console and GUI
executables:

- Nuitka (Cross-platform)
- PyInstaller (Cross-platform)
- PyOxidizer (Cross-platform)
- cx_Freeze (Cross-platform)
- py2app (macOS only)
- py2exe (Windows only)

### Are there coding standards or a style guide for Python programs?

Yes.  The coding style required for standard library modules is documented as
PEP 8.
