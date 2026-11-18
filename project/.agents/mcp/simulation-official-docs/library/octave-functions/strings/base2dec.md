# base2dec

```octave
function d = base2dec (str, base)
```

@deftypefn {} {@var{d} =} base2dec (@var{str}, @var{base})
Convert @var{str} from a string of digits in base @var{base} to a decimal
integer (base 10).

@example
@group
base2dec ("11120", 3)
   @xresult{} 123
@end group
@end example

If @var{str} is a string matrix, return a column vector with one value per
row of @var{str}.  If a row contains invalid symbols then the corresponding
value will be NaN@.

If @var{str} is a cell array of strings, return a column vector with one
value per cell element in @var{str}.

If @var{base} is a string, the characters of @var{base} are used as the
symbols for the digits of @var{str}.  Space (' ') may not be used as a
symbol.

@example
@group
base2dec ("yyyzx", "xyz")
   @xresult{} 123
@end group
@end example
@seealso{dec2base, bin2dec, hex2dec}
@end deftypefn
