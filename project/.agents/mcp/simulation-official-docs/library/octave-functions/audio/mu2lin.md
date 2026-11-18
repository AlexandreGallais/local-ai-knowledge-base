# mu2lin

```octave
function y = mu2lin (x, n = 0)
```

@deftypefn  {} {@var{y} =} mu2lin (@var{x})
@deftypefnx {} {@var{y} =} mu2lin (@var{x}, @var{n})
Convert audio data from mu-law to linear.

Mu-law values are 8-bit unsigned integers in the range 0 @leq{} @var{y}
@leq{} 255.  Linear values use floating point values in the range
-@var{linmax} @leq{} @var{x} @var{linmax} (where
@code{@var{linmax} = 32124/32768 =~ 0.98}) when @var{n} is zero (default).
If @var{n} is 8 or 16 then @var{n}-bit signed integers are used instead.

Programming Note: @code{mu2lin} maps maximum mu-law inputs to values
slightly below the maximum ([-0.98, +0.98]) representable with a linear
scale.  Because of this, @code{mu2lin (lin2mu (@var{x}))} might not
reproduce the original input.
@seealso{lin2mu}
@end deftypefn
