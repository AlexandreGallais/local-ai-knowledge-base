# bitget

```octave
function b = bitget (A, n)
```

@deftypefn {} {@var{b} =} bitget (@var{A}, @var{n})
Return the bit value at position(s) @var{n} of the unsigned integers in
@var{A}.

The least significant bit is @var{n} = 1.

@example
@group
bitget (100, 8:-1:1)
@xresult{} 0  1  1  0  0  1  0  0
@end group
@end example
@seealso{bitand, bitor, bitxor, bitset, bitcmp, bitshift, intmax, flintmax}
@end deftypefn
