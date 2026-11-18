# hex2dec

```octave
function d = hex2dec (str)
```

@deftypefn {} {@var{d} =} hex2dec (@var{str})
Return the integer corresponding to the hexadecimal number represented by
the string @var{str}.

For example:

@example
@group
hex2dec ("12B")
      @xresult{} 299
hex2dec ("12b")
      @xresult{} 299
@end group
@end example

If @var{str} is a string matrix, return a column vector with one converted
number per row of @var{str}; Invalid rows evaluate to NaN@.

If @var{str} is a cell array of strings, return a column vector with one
converted number per cell element in @var{str}.

@seealso{dec2hex, base2dec, bin2dec}
@end deftypefn
