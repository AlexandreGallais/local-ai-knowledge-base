# isstrprop

```octave
function tf = isstrprop (str, prop, opt, flag)
```

@deftypefn  {} {@var{tf} =} isstrprop (@var{str}, @var{prop})
@deftypefnx {} {@var{tf} =} isstrprop (@var{str}, @var{prop}, 'ForceCellOutput', @var{flag})
Test character string properties.

For example:

@example
@group
isstrprop ("abc123", "alpha")
@xresult{} [1, 1, 1, 0, 0, 0]
@end group
@end example

If @var{str} is a cell array, @code{isstrpop} is applied recursively to
each element of the cell array.

Numeric arrays are converted to character strings.

The second argument @var{prop} must be one of

@table @asis
@item @qcode{"alpha"}
True for characters that are alphabetic (letters).

@item  @nospell{@qcode{"alnum"}}
@itemx @nospell{@qcode{"alphanum"}}
True for characters that are alphabetic or digits.

@item @qcode{"lower"}
True for lowercase letters.

@item @qcode{"upper"}
True for uppercase letters.

@item @qcode{"digit"}
True for decimal digits (0-9).

@item @nospell{@qcode{"xdigit"}}
True for hexadecimal digits (@nospell{a-fA-F0-9}).

@item  @qcode{"space"}
@itemx @nospell{@qcode{"wspace"}}
True for whitespace characters (space, formfeed, newline, carriage return,
tab, vertical tab).

@item @nospell{@qcode{"punct"}}
True for punctuation characters (printing characters except space or
letter or digit).

@item @nospell{@qcode{"cntrl"}}
True for control characters.

@item  @qcode{"graph"}
@itemx @qcode{"graphic"}
True for printing characters except space.

@item @qcode{"print"}
True for printing characters including space.

@item @qcode{"ascii"}
True for characters that are in the range of ASCII encoding.

@end table

If the option @nospell{@qcode{'ForceCellOutput'}} is given and @var{flag} is
true then a cell value is returned rather than a logical array.

@seealso{isalpha, isalnum, islower, isupper, isdigit, isxdigit,
isspace, ispunct, iscntrl, isgraph, isprint, isascii}
@end deftypefn
