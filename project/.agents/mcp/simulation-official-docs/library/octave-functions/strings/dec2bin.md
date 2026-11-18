# dec2bin

```octave
function bstr = dec2bin (d, len)
```

@deftypefn  {} {@var{bstr} =} dec2bin (@var{d})
@deftypefnx {} {@var{bstr} =} dec2bin (@var{d}, @var{len})
Return a string of ones and zeros representing the conversion of the integer
@var{d} to a binary number.

If @var{d} is a matrix or cell array, return a string matrix with one row
for each element in @var{d}, padded with leading zeros to the width of the
largest value.

The optional second argument, @var{len}, specifies the minimum number of
digits in the result.

For negative elements of @var{d}, return the binary value of the two's
complement.  The result is padded with leading ones to 8, 16, 32, or 64
bits as appropriate for the magnitude of the input.  Positive input
elements are padded with leading zeros to the same width.

Examples:

@example
@group
dec2bin (14)
     @xresult{} "1110"

dec2bin (-14)
     @xresult{} "11110010"
@end group
@end example

Programming tip: @code{dec2bin} discards any fractional part of the input.
If you need the fractional part to be converted too, call @code{dec2base}
with a nonzero number of decimal places.  You can also use @code{fix} or
@code{round} on fractional inputs to ensure predictable rounding behavior.

@seealso{bin2dec, dec2base, dec2hex}
@end deftypefn
