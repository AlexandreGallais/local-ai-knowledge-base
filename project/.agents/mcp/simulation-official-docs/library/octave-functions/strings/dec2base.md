# dec2base

```octave
function str = dec2base (d, base, len, decimals = 0)
```

@deftypefn  {} {@var{str} =} dec2base (@var{d}, @var{base})
@deftypefnx {} {@var{str} =} dec2base (@var{d}, @var{base}, @var{len})
@deftypefnx {} {@var{str} =} dec2base (@var{d}, @var{base}, @var{len}, @var{decimals})
Return a string of symbols in base @var{base} corresponding to the
value @var{d}.

@example
@group
dec2base (123, 3)
   @xresult{} "11120"
@end group
@end example

If @var{d} is negative, then the result will represent @var{d} in complement
notation.  For example, negative binary numbers are in twos-complement, and
analogously for other bases.

If @var{d} is a matrix or cell array, return a string matrix with one row
per element in @var{d}, padded with leading zeros to the width of the
largest value.

If @var{base} is a string then the characters of @var{base} are used as
the symbols for the digits of @var{d}.  Whitespace (spaces, tabs, newlines,
, etc.@:) may not be used as a symbol.

@example
@group
dec2base (123, "aei")
   @xresult{} "eeeia"
@end group
@end example

The optional third argument, @var{len}, specifies the minimum number of
digits in the integer part of the result.  If this is omitted, then
@code{dec2base} uses enough digits to accommodate the input.

The optional fourth argument, @var{decimals}, specifies the number of
digits to represent the fractional part of the input.  If this is omitted,
then it is set to zero, and @code{dec2base} returns an integer output for
backward compatibility.

@example
@group
dec2base (100*pi, 16)
@xresult{} "13A"
dec2base (100*pi, 16, 4)
@xresult{} "013A"
dec2base (100*pi, 16, 4, 6)
@xresult{} "013A.28C59D"
dec2base (-100*pi, 16)
@xresult{} "EC6"
dec2base (-100*pi, 16, 4)
@xresult{} "FEC6"
dec2base (-100*pi, 16, 4, 6)
@xresult{} "FEC5.D73A63"
@end group
@end example

Programming tip: When passing negative inputs to @code{dec2base}, it is
best to explicitly specify the length of the output required.

@seealso{base2dec, dec2bin, dec2hex}
@end deftypefn
