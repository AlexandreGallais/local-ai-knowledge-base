# bin2dec

```octave
function d = bin2dec (str)
```

@deftypefn {} {@var{d} =} bin2dec (@var{str})
Return the decimal number corresponding to the binary number represented
by the string @var{str}.

For example:

@example
@group
bin2dec ("1110")
     @xresult{} 14
@end group
@end example

Spaces are ignored during conversion and may be used to make the binary
number more readable.

@example
@group
bin2dec ("1000 0001")
     @xresult{} 129
@end group
@end example

If @var{str} is a string matrix, return a column vector with one converted
number per row of @var{str}; Invalid rows evaluate to NaN@.

If @var{str} is a cell array of strings, return a column vector with one
converted number per cell element in @var{str}.
@seealso{dec2bin, base2dec, hex2dec}
@end deftypefn
