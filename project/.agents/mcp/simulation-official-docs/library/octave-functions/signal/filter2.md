# filter2

```octave
function y = filter2 (b, x, shape)
```

@deftypefn  {} {@var{y} =} filter2 (@var{b}, @var{x})
@deftypefnx {} {@var{y} =} filter2 (@var{b}, @var{x}, @var{shape})
Apply the 2-D FIR filter @var{b} to @var{x}.

If the argument @var{shape} is specified, return an array of the desired
shape.  Possible values are:

@table @asis
@item @qcode{"full"}
pad @var{x} with zeros on all sides before filtering.

@item @qcode{"same"}
unpadded @var{x} (default)

@item @qcode{"valid"}
trim @var{x} after filtering so edge effects are no included.
@end table

Note this is just a variation on convolution, with the parameters reversed
and @var{b} rotated 180 degrees.
@seealso{conv2}
@end deftypefn
