---
title: "Programming FAQ (part 4 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/faq/programming.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Programming FAQ (part 4 of 7)

## Numbers and strings

### How do I specify hexadecimal and octal integers?

To specify an octal digit, precede the octal value with a zero, and then a lower
or uppercase "o".  For example, to set the variable "a" to the octal value "10"
(8 in decimal), type:

```
>>> a = 0o10
>>> a
8
```

Hexadecimal is just as easy.  Simply precede the hexadecimal number with a zero,
and then a lower or uppercase "x".  Hexadecimal digits can be specified in lower
or uppercase.  For example, in the Python interpreter:

```
>>> a = 0xa5
>>> a
165
>>> b = 0XB2
>>> b
178
```

### Why does -22 // 10 return -3?

It's primarily driven by the desire that `i % j` have the same sign as `j`.
If you want that, and also want:

```
i == (i // j) * j + (i % j)
```

then integer division has to return the floor.  C also requires that identity to
hold, and then compilers that truncate `i // j` need to make `i % j` have
the same sign as `i`.

There are few real use cases for `i % j` when `j` is negative.  When `j`
is positive, there are many, and in virtually all of them it's more useful for
`i % j` to be `>= 0`.  If the clock says 10 now, what did it say 200 hours
ago?  `-190 % 12 == 2` is useful; `-190 % 12 == -10` is a bug waiting to
bite.

### How do I get int literal attribute instead of SyntaxError?

Trying to lookup an `int` literal attribute in the normal manner gives
a `SyntaxError` because the period is seen as a decimal point:

```
>>> 1.__class__
  File "<stdin>", line 1
  1.__class__
   ^
SyntaxError: invalid decimal literal
```

The solution is to separate the literal from the period
with either a space or parentheses.

```python
>>> 1 .__class__
<class 'int'>
>>> (1).__class__
<class 'int'>
```

### How do I convert a string to a number?

For integers, use the built-in `int()` type constructor, for example, ``int('144')
== 144``.  Similarly, `float()` converts to a floating-point number,
for example, `float('144') == 144.0`.

By default, these interpret the number as decimal, so that ``int('0144') ==
144` holds true, and `int('0x144')` raises `ValueError`. `int(string,
base)` takes the base to convert from as a second optional argument, so `int(
'0x144', 16) == 324``.  If the base is specified as 0, the number is interpreted
using Python's rules: a leading '0o' indicates octal, and '0x' indicates a hex
number.

Do not use the built-in function `eval()` if all you need is to convert
strings to numbers.  `eval()` will be significantly slower and it presents a
security risk: someone could pass you a Python expression that might have
unwanted side effects.  For example, someone could pass
`__import__('os').system("rm -rf $HOME")` which would erase your home
directory.

`eval()` also has the effect of interpreting numbers as Python expressions,
so that, for example, `eval('09')` gives a syntax error because Python does not allow
leading '0' in a decimal number (except '0').

### How do I convert a number to a string?

For example, to convert the number `144` to the string `'144'`, use the built-in type
constructor `str()`.  If you want a hexadecimal or octal representation, use
the built-in functions `hex()` or `oct()`.  For fancy formatting, see
the f-strings and formatstrings sections.
For example, `"{:04d}".format(144)` yields
`'0144'` and `"{:.3f}".format(1.0/3.0)` yields `'0.333'`.

### How do I modify a string in place?

You can't, because strings are immutable.  In most situations, you should
simply construct a new string from the various parts you want to assemble
it from.  However, if you need an object with the ability to modify in-place
Unicode data, try using an `io.StringIO` object or the `array`
module:

```
>>> import io
>>> s = "Hello, world"
>>> sio = io.StringIO(s)
>>> sio.getvalue()
'Hello, world'
>>> sio.seek(7)
7
>>> sio.write("there!")
6
>>> sio.getvalue()
'Hello, there!'

>>> import array
>>> a = array.array('w', s)
>>> print(a)
array('w', 'Hello, world')
>>> a[0] = 'y'
>>> print(a)
array('w', 'yello, world')
>>> a.tounicode()
'yello, world'
```

### How do I use strings to call functions/methods?

There are various techniques.

- The best is to use a dictionary that maps strings to functions.  The primary
advantage of this technique is that the strings do not need to match the names
of the functions.  This is also the primary technique used to emulate a case
construct:

```
def a():
    pass

def b():
    pass

dispatch = {'go': a, 'stop': b}  # Note lack of parens for funcs

dispatch[get_input()]()  # Note trailing parens to call function
```

- Use the built-in function `getattr()`::

import foo
getattr(foo, 'bar')()

Note that `getattr()` works on any object, including classes, class
instances, modules, and so on.

This is used in several places in the standard library, like this:

```
class Foo:
    def do_foo(self):
        ...

    def do_bar(self):
        ...

f = getattr(foo_instance, 'do_' + opname)
f()
```

- Use `locals()` to resolve the function name::

def myFunc():
print("hello")

fname = "myFunc"

f = locals()[fname]
f()

### Is there an equivalent to Perl's `chomp()` for removing trailing newlines from strings?

You can use `S.rstrip("\r\n")` to remove all occurrences of any line
terminator from the end of the string `S` without removing other trailing
whitespace.  If the string `S` represents more than one line, with several
empty lines at the end, the line terminators for all the blank lines will
be removed:

```
>>> lines = ("line 1 \r\n"
...          "\r\n"
...          "\r\n")
>>> lines.rstrip("\n\r")
'line 1 '
```

Since this is typically only desired when reading text one line at a time, using
`S.rstrip()` this way works well.

### Is there a `scanf()` or `sscanf()` equivalent?

Not as such.

For simple input parsing, the easiest approach is usually to split the line into
whitespace-delimited words using the `split()` method of string objects
and then convert decimal strings to numeric values using `int()` or
`float()`.  `split()` supports an optional "sep" parameter which is useful
if the line uses something other than whitespace as a separator.

For more complicated input parsing, regular expressions are more powerful
than C's `sscanf` and better suited for the task.

### What does `UnicodeDecodeError` or `UnicodeEncodeError` error mean?

See the unicode-howto.

### Can I end a raw string with an odd number of backslashes?

A raw string ending with an odd number of backslashes will escape the string's quote:

```
>>> r'C:\this\will\not\work\'
  File "<stdin>", line 1
    r'C:\this\will\not\work\'
    ^
SyntaxError: unterminated string literal (detected at line 1)
```

There are several workarounds for this. One is to use regular strings and double
the backslashes:

```
>>> 'C:\\this\\will\\work\\'
'C:\\this\\will\\work\\'
```

Another is to concatenate a regular string containing an escaped backslash to the
raw string:

```
>>> r'C:\this\will\work' '\\'
'C:\\this\\will\\work\\'
```

It is also possible to use `os.path.join()` to append a backslash on Windows:

```
>>> os.path.join(r'C:\this\will\work', '')
'C:\\this\\will\\work\\'
```

Note that while a backslash will "escape" a quote for the purposes of
determining where the raw string ends, no escaping occurs when interpreting the
value of the raw string. That is, the backslash remains present in the value of
the raw string:

```
>>> r'backslash\'preserved'
"backslash\\'preserved"
```

Also see the specification in the language reference.

## Performance

### My program is too slow. How do I speed it up?

That's a tough one, in general.  First, here is a list of things to
remember before diving further:

- Performance characteristics vary across Python implementations.  This FAQ
focuses on CPython.
- Behaviour can vary across operating systems, especially when talking about
I/O or multi-threading.
- You should always find the hot spots in your program *before* attempting to
optimize any code (see the `profile` module).
- Writing benchmark scripts will allow you to iterate quickly when searching
for improvements (see the `timeit` module).
- It is highly recommended to have good code coverage (through unit testing
or any other technique) before potentially introducing regressions hidden
in sophisticated optimizations.

That being said, there are many tricks to speed up Python code.  Here are
some general principles which go a long way towards reaching acceptable
performance levels:

- Making your algorithms faster (or changing to faster ones) can yield
much larger benefits than trying to sprinkle micro-optimization tricks
all over your code.

- Use the right data structures.  Study documentation for the bltin-types
and the `collections` module.

- When the standard library provides a primitive for doing something, it is
likely (although not guaranteed) to be faster than any alternative you
may come up with.  This is doubly true for primitives written in C, such
as builtins and some extension types.  For example, be sure to use
either the `list.sort()` built-in method or the related `sorted()`
function to do sorting (and see the sortinghowto for examples
of moderately advanced usage).

- Abstractions tend to create indirections and force the interpreter to work
more.  If the levels of indirection outweigh the amount of useful work
done, your program will be slower.  You should avoid excessive abstraction,
especially under the form of tiny functions or methods (which are also often
detrimental to readability).

If you have reached the limit of what pure Python can allow, there are tools
to take you further away.  For example, Cython can
compile a slightly modified version of Python code into a C extension, and
can be used on many different platforms.  Cython can take advantage of
compilation (and optional type annotations) to make your code significantly
faster than when interpreted.  If you are confident in your C programming
skills, you can also write a C extension module
yourself.

> **See also:** The wiki page devoted to `performance tips
> <https://wiki.python.org/moin/PythonSpeed/PerformanceTips>`_.

### What is the most efficient way to concatenate many strings together?

`str` and `bytes` objects are immutable, therefore concatenating
many strings together is inefficient as each concatenation creates a new
object.  In the general case, the total runtime cost is quadratic in the
total string length.  See time-complexity for more information.

To accumulate many `str` objects, the recommended idiom is to place
them into a list and call `str.join()` at the end:

```
chunks = []
for s in my_strings:
    chunks.append(s)
result = ''.join(chunks)
```

(Another reasonably efficient idiom is to use `io.StringIO`.)

To accumulate many `bytes` objects, the recommended idiom is to extend
a `bytearray` object using in-place concatenation (the `+=` operator):

```
result = bytearray()
for b in my_bytes_objects:
    result += b
```
