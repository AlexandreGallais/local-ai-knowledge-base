---
title: "string --- Common string operations (part 4 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/string.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# string --- Common string operations (part 4 of 5)

```text
   +---------+----------------------------------------------------------+
   | Type    | Meaning                                                  |
   +=========+==========================================================+
   | ``'e'`` | Scientific notation. For a given precision ``p``,        |
   |         | formats the number in scientific notation with the       |
   |         | letter 'e' separating the coefficient from the exponent. |
   |         | The coefficient has one digit before and ``p`` digits    |
   |         | after the decimal point, for a total of ``p + 1``        |
   |         | significant digits. With no precision given, uses a      |
   |         | precision of ``6`` digits after the decimal point for    |
   |         | :class:`float`, and shows all coefficient digits         |
   |         | for :class:`~decimal.Decimal`.  If ``p=0``, the decimal  |
   |         | point is omitted unless the ``#`` option is used.        |
   |         |                                                          |
   |         | For :class:`float`, the exponent always contains at      |
   |         | least two digits, and is zero if the value is zero.      |
   +---------+----------------------------------------------------------+
   | ``'E'`` | Scientific notation. Same as ``'e'`` except it uses      |
   |         | an upper case 'E' as the separator character.            |
   +---------+----------------------------------------------------------+
   | ``'f'`` | Fixed-point notation. For a given precision ``p``,       |
   |         | formats the number as a decimal number with exactly      |
   |         | ``p`` digits following the decimal point. With no        |
   |         | precision given, uses a precision of ``6`` digits after  |
   |         | the decimal point for :class:`float`, and uses a         |
   |         | precision large enough to show all coefficient digits    |
   |         | for :class:`~decimal.Decimal`.  If ``p=0``, the decimal  |
   |         | point is omitted unless the ``#`` option is used.        |
   +---------+----------------------------------------------------------+
   | ``'F'`` | Fixed-point notation. Same as ``'f'``, but converts      |
   |         | ``nan`` to  ``NAN`` and ``inf`` to ``INF``.              |
   +---------+----------------------------------------------------------+
   | ``'g'`` | General format.  For a given precision ``p >= 1``,       |
   |         | this rounds the number to ``p`` significant digits and   |
   |         | then formats the result in either fixed-point format     |
   |         | or in scientific notation, depending on its magnitude.   |
   |         | A precision of ``0`` is treated as equivalent to a       |
   |         | precision of ``1``.                                      |
   |         |                                                          |
   |         | The precise rules are as follows: suppose that the       |
   |         | result formatted with presentation type ``'e'`` and      |
   |         | precision ``p-1`` would have exponent ``exp``.  Then,    |
   |         | if ``m <= exp < p``, where ``m`` is -4 for floats and -6 |
   |         | for :class:`Decimals <decimal.Decimal>`, the number is   |
   |         | formatted with presentation type ``'f'`` and precision   |
   |         | ``p-1-exp``.  Otherwise, the number is formatted         |
   |         | with presentation type ``'e'`` and precision ``p-1``.    |
   |         | In both cases insignificant trailing zeros are removed   |
   |         | from the significand, and the decimal point is also      |
   |         | removed if there are no remaining digits following it,   |
   |         | unless the ``'#'`` option is used.                       |
   |         |                                                          |
   |         | With no precision given, uses a precision of ``6``       |
   |         | significant digits for :class:`float`. For               |
   |         | :class:`~decimal.Decimal`, the coefficient of the result |
   |         | is formed from the coefficient digits of the value;      |
   |         | scientific notation is used for values smaller than      |
   |         | ``1e-6`` in absolute value and values where the place    |
   |         | value of the least significant digit is larger than 1,   |
   |         | and fixed-point notation is used otherwise.              |
   |         |                                                          |
   |         | Positive and negative infinity, positive and negative    |
   |         | zero, and nans, are formatted as ``inf``, ``-inf``,      |
   |         | ``0``, ``-0`` and ``nan`` respectively, regardless of    |
   |         | the precision.                                           |
   +---------+----------------------------------------------------------+
   | ``'G'`` | General format. Same as ``'g'`` except switches to       |
   |         | ``'E'`` if the number gets too large. The                |
   |         | representations of infinity and NaN are uppercased, too. |
   +---------+----------------------------------------------------------+
   | ``'n'`` | .. _n-format-float:                                      |
   |         |                                                          |
   |         | Number. This is the same as ``'g'``, except that it uses |
   |         | the current locale setting to insert the appropriate     |
   |         | digit group separators for the integral part of a        |
   |         | number. Note that the default locale is not the system   |
   |         | locale. Depending on your use case, you may wish to set  |
   |         | :const:`~locale.LC_NUMERIC` with                         |
   |         | :func:`locale.setlocale` before using ``'n'``.           |
   +---------+----------------------------------------------------------+
   | ``'%'`` | Percentage. Multiplies the number by 100 and displays    |
   |         | in fixed (``'f'``) format, followed by a percent sign.   |
   +---------+----------------------------------------------------------+
   | None    | For :class:`float` this is like the ``'g'`` type, except |
   |         | that when fixed-point notation is used to format the     |
   |         | result, it always includes at least one digit past the   |
   |         | decimal point, and switches to the scientific notation   |
   |         | when ``exp >= p - 1``.  When the precision is not        |
   |         | specified, the latter will be as large as needed to      |
   |         | represent the given value faithfully.                    |
   |         |                                                          |
   |         | For :class:`~decimal.Decimal`, this is the same as       |
   |         | either ``'g'`` or ``'G'`` depending on the value of      |
   |         | ``context.capitals`` for the current decimal context.    |
   |         |                                                          |
   |         | The overall effect is to match the output of :func:`str` |
   |         | as altered by the other format modifiers.                |
   +---------+----------------------------------------------------------+
```

The result should be correctly rounded to a given precision `p` of digits
after the decimal point.  The rounding mode for `float` matches that
of the `round()` builtin.  For `Decimal`, the rounding
mode of the current context will be used.

The available presentation types for `complex` are the same as those for
`float` (`'%'` is not allowed).  Both the real and imaginary components
of a complex number are formatted as floating-point numbers, according to the
specified presentation type.  They are separated by the mandatory sign of the
imaginary part, the latter being terminated by a `j` suffix.  If the presentation
type is missing, the result will match the output of `str()` (complex numbers with
a non-zero real part are also surrounded by parentheses), possibly altered by
other format modifiers.

### Format examples

This section contains examples of the `str.format()` syntax and
comparison with the old `%`-formatting.

In most of the cases the syntax is similar to the old `%`-formatting, with the
addition of the `{}` and with `:` used instead of `%`.
For example, `'%03.2f'` can be translated to `'{:03.2f}'`.

The new format syntax also supports new and different options, shown in the
following examples.

Accessing arguments by position:

```
>>> '{0}, {1}, {2}'.format('a', 'b', 'c')
'a, b, c'
>>> '{}, {}, {}'.format('a', 'b', 'c')  # 3.1+ only
'a, b, c'
>>> '{2}, {1}, {0}'.format('a', 'b', 'c')
'c, b, a'
>>> '{2}, {1}, {0}'.format(*'abc')      # unpacking argument sequence
'c, b, a'
>>> '{0}{1}{0}'.format('abra', 'cad')   # arguments' indices can be repeated
'abracadabra'
```

Accessing arguments by name:

```
>>> 'Coordinates: {latitude}, {longitude}'.format(latitude='37.24N', longitude='-115.81W')
'Coordinates: 37.24N, -115.81W'
>>> coord = {'latitude': '37.24N', 'longitude': '-115.81W'}
>>> 'Coordinates: {latitude}, {longitude}'.format(**coord)
'Coordinates: 37.24N, -115.81W'
```

Accessing arguments' attributes:

```
>>> c = 3-5j
>>> ('The complex number {0} is formed from the real part {0.real} '
...  'and the imaginary part {0.imag}.').format(c)
'The complex number (3-5j) is formed from the real part 3.0 and the imaginary part -5.0.'
>>> class Point:
...     def __init__(self, x, y):
...         self.x, self.y = x, y
...     def __str__(self):
...         return 'Point({self.x}, {self.y})'.format(self=self)
...
>>> str(Point(4, 2))
'Point(4, 2)'
```

Accessing arguments' items:

```
>>> coord = (3, 5)
>>> 'X: {0[0]};  Y: {0[1]}'.format(coord)
'X: 3;  Y: 5'
```

Replacing `%s` and `%r`:

```
>>> "repr() shows quotes: {!r}; str() doesn't: {!s}".format('test1', 'test2')
"repr() shows quotes: 'test1'; str() doesn't: test2"
```

Aligning the text and specifying a width:

```
>>> '{:<30}'.format('left aligned')
'left aligned                  '
>>> '{:>30}'.format('right aligned')
'                 right aligned'
>>> '{:^30}'.format('centered')
'           centered           '
>>> '{:*^30}'.format('centered')  # use '*' as a fill char
'***********centered***********'
```

Replacing `%+f`, `%-f`, and `% f` and specifying a sign:

```
>>> '{:+f}; {:+f}'.format(3.14, -3.14)  # show it always
'+3.140000; -3.140000'
>>> '{: f}; {: f}'.format(3.14, -3.14)  # show a space for positive numbers
' 3.140000; -3.140000'
>>> '{:-f}; {:-f}'.format(3.14, -3.14)  # show only the minus -- same as '{:f}; {:f}'
'3.140000; -3.140000'
```

Replacing `%x` and `%o` and converting the value to different bases:

```
>>> # format also supports binary numbers
>>> "int: {0:d};  hex: {0:x};  oct: {0:o};  bin: {0:b}".format(42)
'int: 42;  hex: 2a;  oct: 52;  bin: 101010'
>>> # with 0x, 0o, or 0b as prefix:
>>> "int: {0:d};  hex: {0:#x};  oct: {0:#o};  bin: {0:#b}".format(42)
'int: 42;  hex: 0x2a;  oct: 0o52;  bin: 0b101010'
```

Using the comma or the underscore as a digit group separator:

```
>>> '{:,}'.format(1234567890)
'1,234,567,890'
>>> '{:_}'.format(1234567890)
'1_234_567_890'
>>> '{:_b}'.format(1234567890)
'100_1001_1001_0110_0000_0010_1101_0010'
>>> '{:_x}'.format(1234567890)
'4996_02d2'
>>> '{:_}'.format(123456789.123456789)
'123_456_789.12345679'
>>> '{:.,}'.format(123456789.123456789)
'123456789.123,456,79'
>>> '{:,._}'.format(123456789.123456789)
'123,456,789.123_456_79'
```

Expressing a percentage:

```
>>> points = 19
>>> total = 22
>>> 'Correct answers: {:.2%}'.format(points/total)
'Correct answers: 86.36%'
```

Using type-specific formatting:

```
>>> import datetime as dt
>>> d = dt.datetime(2010, 7, 4, 12, 15, 58)
>>> '{:%Y-%m-%d %H:%M:%S}'.format(d)
'2010-07-04 12:15:58'
```

Nesting arguments and more complex examples:

```
>>> for align, text in zip('<^>', ['left', 'center', 'right']):
...     '{0:{fill}{align}16}'.format(text, fill=align, align=align)
...
'left<<<<<<<<<<<<'
'^^^^^center^^^^^'
'>>>>>>>>>>>right'
>>>
>>> octets = [192, 168, 0, 1]
>>> '{:02X}{:02X}{:02X}{:02X}'.format(*octets)
'C0A80001'
>>> int(_, 16)
3232235521
>>>
>>> width = 5
>>> for num in range(5,12): #doctest: +NORMALIZE_WHITESPACE
...     for base in 'dXob':
...         print('{0:{width}{base}}'.format(num, base=base, width=width), end=' ')
...     print()
...
    5     5     5   101
    6     6     6   110
    7     7     7   111
    8     8    10  1000
    9     9    11  1001
   10     A    12  1010
   11     B    13  1011
```
