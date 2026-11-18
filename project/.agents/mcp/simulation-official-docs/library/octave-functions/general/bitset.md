# bitset

```octave
function B = bitset (A, n, val = true)
```

@deftypefn  {} {@var{B} =} bitset (@var{A}, @var{n})
@deftypefnx {} {@var{B} =} bitset (@var{A}, @var{n}, @var{val})
Set or reset bit(s) at position @var{n} of the unsigned integers in @var{A}.

The least significant bit is @var{n} = 1.  @w{@var{val} = 0}@ resets bits
and @w{@var{val} = 1}@ sets bits.  If no @var{val} is specified it
defaults to 1 (set bit).  All inputs must be the same size or scalars.

Example 1: Set multiple bits

@example
@group
x = bitset (1, 3:5)
  @xresult{} x =

   5    9   17

dec2bin (x)
  @xresult{}
     00101
     01001
     10001
@end group
@end example

Example 2: Reset and set bits

@example
@group
x = bitset ([15 14], 1, [0 1])
  @xresult{} x =

   14    15
@end group
@end example
@seealso{bitand, bitor, bitxor, bitget, bitcmp, bitshift, intmax, flintmax}
@end deftypefn
