# common_size

```octave
function [err, varargout] = common_size (varargin)
```

@deftypefn {} {[@var{err}, @var{yi}, @dots{}] =} common_size (@var{xi}, @dots{})
Determine if all input arguments are either scalar or of common size.

If true, @var{err} is zero, and @var{yi} is a matrix of the common size
with all entries equal to @var{xi} if this is a scalar or @var{xi}
otherwise.  If the inputs cannot be brought to a common size, @var{err} is
1, and @var{yi} is @var{xi}.  For example:

@example
@group
[err, a, b] = common_size ([1 2; 3 4], 5)
     @xresult{} err = 0
     @xresult{} a = [ 1, 2; 3, 4 ]
     @xresult{} b = [ 5, 5; 5, 5 ]
@end group
@end example

@noindent
This is useful for implementing functions where arguments can either be
scalars or of common size.
@seealso{size, size_equal, numel, ndims}
@end deftypefn
