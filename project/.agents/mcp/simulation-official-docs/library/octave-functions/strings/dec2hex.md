# dec2hex

```octave
function hstr = dec2hex (d, len)
```

@deftypefn  {} {@var{hstr} =} dec2hex (@var{d})
@deftypefnx {} {@var{hstr} =} dec2hex (@var{d}, @var{len})
Return a string representing the conversion of the integer @var{d} to a
hexadecimal (base16) number.

If @var{d} is negative, return the hexadecimal complement of @var{d}.

If @var{d} is a matrix or cell array, return a string matrix with one row
for each element in @var{d}, padded with leading zeros to the width of the
largest value.

The optional second argument, @var{len}, specifies the minimum number of
digits in the result.

Examples:

@example
@group
dec2hex (2748)
     @xresult{} "ABC"

dec2hex (-2)
     @xresult{} "FE"
@end group
@end example

Programming tip: @code{dec2hex} discards any fractional part of the input.
If you need the fractional part to be converted too, call @code{dec2base}
with a nonzero number of decimal places.  You can also use @code{fix} or
@code{round} on fractional inputs to ensure predictable rounding behavior.

@seealso{hex2dec, dec2base, dec2bin}
@end deftypefn
