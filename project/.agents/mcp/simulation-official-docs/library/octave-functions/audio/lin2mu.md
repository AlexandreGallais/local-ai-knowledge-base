# lin2mu

```octave
function y = lin2mu (x, n = 0)
```

@deftypefn  {} {@var{y} =} lin2mu (@var{x})
@deftypefnx {} {@var{y} =} lin2mu (@var{x}, @var{n})
Convert audio data from linear to mu-law.

Linear values use floating point values in the range -1 @leq{} @var{x}
@leq{} 1 if @var{n} is 0 (default), or @var{n}-bit signed integers if @var{n}
is 8 or 16.  Mu-law values are 8-bit unsigned integers in the range
0 @leq{} @var{y} @leq{} 255.
@seealso{mu2lin}
@end deftypefn
