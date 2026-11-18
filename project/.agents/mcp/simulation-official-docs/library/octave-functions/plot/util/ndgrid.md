# ndgrid

```octave
function varargout = ndgrid (varargin)
```

@deftypefn  {} {[@var{y1}, @var{y2}, @dots{}, @var{y}n] =} ndgrid (@var{x1}, @var{x2}, @dots{}, @var{x}n)
@deftypefnx {} {[@var{y1}, @var{y2}, @dots{}, @var{y}n] =} ndgrid (@var{x})
Given n vectors @var{x1}, @dots{}, @var{x}n, @code{ndgrid} returns n
arrays of dimension n.

The elements of the i-th output argument contains the elements of the
vector @var{x}i repeated over all dimensions different from the i-th
dimension.  Calling ndgrid with only one input argument @var{x} is
equivalent to calling ndgrid with all n input arguments equal to @var{x}:

[@var{y1}, @var{y2}, @dots{}, @var{y}n] = ndgrid (@var{x}, @dots{}, @var{x})

Programming Note: @code{ndgrid} is very similar to the function
@code{meshgrid} except that the first two dimensions are transposed in
comparison to @code{meshgrid}.  Some core functions expect @code{meshgrid}
input and others expect @code{ndgrid} input.  Check the documentation for
the function in question to determine the proper input format.
@seealso{meshgrid}
@end deftypefn
