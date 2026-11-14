---
title: "More Control Flow Tools (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/tutorial/controlflow.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# More Control Flow Tools (part 4 of 4)

### Documentation Strings

Here are some conventions about the content and formatting of documentation
strings.

The first line should always be a short, concise summary of the object's
purpose.  For brevity, it should not explicitly state the object's name or type,
since these are available by other means (except if the name happens to be a
verb describing a function's operation).  This line should begin with a capital
letter and end with a period.

If there are more lines in the documentation string, the second line should be
blank, visually separating the summary from the rest of the description.  The
following lines should be one or more paragraphs describing the object's calling
conventions, its side effects, etc.

The Python parser strips indentation from multi-line string literals when they
serve as module, class, or function docstrings.

Here is an example of a multi-line docstring:

```
>>> def my_function():
...     """Do nothing, but document it.
...
...     No, really, it doesn't do anything:
...
...         >>> my_function()
...         >>>
...     """
...     pass
...
>>> print(my_function.__doc__)
Do nothing, but document it.

No, really, it doesn't do anything:

    >>> my_function()
    >>>
```

### Function Annotations

Function annotations are completely optional metadata
information about the types used by user-defined functions (see PEP 3107 and
PEP 484 for more information).

Annotations are stored in the `__annotations__`
attribute of the function as a dictionary and have no effect on any other part of the
function.  Parameter annotations are defined by a colon after the parameter name, followed
by an expression evaluating to the value of the annotation.  Return annotations are
defined by a literal `->`, followed by an expression, between the parameter
list and the colon denoting the end of the `def` statement.  The
following example has a required argument, an optional argument, and the return
value annotated:

```
>>> def f(ham: str, eggs: str = 'eggs') -> str:
...     print("Annotations:", f.__annotations__)
...     print("Arguments:", ham, eggs)
...     return ham + ' and ' + eggs
...
>>> f('spam')
Annotations: {'ham': <class 'str'>, 'return': <class 'str'>, 'eggs': <class 'str'>}
Arguments: spam eggs
'spam and eggs'
```

## Intermezzo: Coding Style

Now that you are about to write longer, more complex pieces of Python, it is a
good time to talk about *coding style*.  Most languages can be written (or more
concisely, *formatted*) in different styles; some are more readable than others.
Making it easy for others to read your code is always a good idea, and adopting
a nice coding style helps tremendously for that.

For Python, PEP 8 has emerged as the style guide that most projects adhere to;
it promotes a very readable and eye-pleasing coding style.  Every Python
developer should read it at some point; here are the most important points
extracted for you:

- Use 4-space indentation, and no tabs.

4 spaces are a good compromise between small indentation (allows greater
nesting depth) and large indentation (easier to read).  Tabs introduce
confusion, and are best left out.

- Wrap lines so that they don't exceed 79 characters.

This helps users with small displays and makes it possible to have several
code files side-by-side on larger displays.

- Use blank lines to separate functions and classes, and larger blocks of
code inside functions.

- When possible, put comments on a line of their own.

- Use docstrings.

- Use spaces around operators and after commas, but not directly inside
bracketing constructs: `a = f(1, 2) + g(3, 4)`.

- Name your classes and functions consistently; the convention is to use
`UpperCamelCase` for classes and `lowercase_with_underscores` for functions
and methods.  Always use `self` as the name for the first method argument
(see tut-firstclasses for more on classes and methods).

- Don't use fancy encodings if your code is meant to be used in international
environments.  Python's default, UTF-8, or even plain ASCII work best in any
case.

- Likewise, don't use non-ASCII characters in identifiers if there is only the
slightest chance people speaking a different language will read or maintain
the code.

**Footnotes**
