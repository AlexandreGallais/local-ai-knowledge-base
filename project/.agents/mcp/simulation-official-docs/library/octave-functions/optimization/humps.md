# humps

```octave
function [x, y] = humps (x = [0:0.05:1])
```

@deftypefn  {} {@var{y} =} humps (@var{x})
@deftypefnx {} {[@var{x}, @var{y}] =} humps (@var{x})
Evaluate a function with multiple minima, maxima, and zero crossings.

The output @var{y} is the evaluation of the rational function:
@tex
$$y = -{ {1200x^4 - 2880x^3 + 2036x^2 - 348x - 88} \over {200x^4 - 480x^3 + 406x^2 - 138x + 17} }$$
@end tex
@ifnottex

@example
@group
        1200*@var{x}^4 - 2880*@var{x}^3 + 2036*@var{x}^2 - 348*@var{x} - 88
 @var{y} = - ---------------------------------------------
         200*@var{x}^4 - 480*@var{x}^3 + 406*@var{x}^2 - 138*@var{x} + 17
@end group
@end example

@end ifnottex

@var{x} may be a scalar, vector or array.  If @var{x} is omitted, the
default range [0:0.05:1] is used.

When called with two output arguments, [@var{x}, @var{y}], @var{x} will
contain the input values, and @var{y} will contain the output from
@code{humps}.

Programming Notes: @code{humps} has two local maxima located near @var{x} =
0.300 and 0.893, a local minimum near @var{x} = 0.637, and zeros near
@var{x} = -0.132 and 1.300.  @code{humps} is a useful function for testing
algorithms which find zeros or local minima and maxima.

Try @code{demo humps} to see a plot of the @code{humps} function.
@seealso{fzero, fminbnd, fminunc, fminsearch}
@end deftypefn
