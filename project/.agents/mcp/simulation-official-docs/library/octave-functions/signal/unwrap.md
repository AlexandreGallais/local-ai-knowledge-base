# unwrap

```octave
function retval = unwrap (x, tol, dim)
```

@deftypefn  {} {@var{b} =} unwrap (@var{x})
@deftypefnx {} {@var{b} =} unwrap (@var{x}, @var{tol})
@deftypefnx {} {@var{b} =} unwrap (@var{x}, @var{tol}, @var{dim})
Unwrap radian phases by adding or subtracting multiples of 2*pi as
appropriate to remove jumps greater than @var{tol}.

@var{tol} defaults to pi.

@code{unwrap} will work along the dimension @var{dim}.  If @var{dim}
is unspecified it defaults to the first non-singleton dimension.

@code{unwrap} ignores all non-finite input values (Inf, NaN, NA).

@end deftypefn
