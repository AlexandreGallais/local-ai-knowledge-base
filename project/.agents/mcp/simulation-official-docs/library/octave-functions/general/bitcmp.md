# bitcmp

```octave
function C = bitcmp (A, k)
```

@deftypefn {} {@var{C} =} bitcmp (@var{A}, @var{k})
Return the @var{k}-bit complement of integers in @var{A}.

If @var{k} is omitted @code{k = log2 (flintmax) + 1} is assumed.

@example
@group
bitcmp (7,4)
  @xresult{} 8
dec2bin (11)
  @xresult{} 1011
dec2bin (bitcmp (11, 6))
  @xresult{} 110100
@end group
@end example

@seealso{bitand, bitor, bitxor, bitset, bitget, bitcmp, bitshift, flintmax}
@end deftypefn
