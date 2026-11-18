# bessel

```octave
function bessel ()
```

@deftypefn  {} {[@var{J}, @var{ierr}] =} besselj (@var{alpha}, @var{x}, @var{opt})
@deftypefnx {} {[@var{Y}, @var{ierr}] =} bessely (@var{alpha}, @var{x}, @var{opt})
@deftypefnx {} {[@var{I}, @var{ierr}] =} besseli (@var{alpha}, @var{x}, @var{opt})
@deftypefnx {} {[@var{K}, @var{ierr}] =} besselk (@var{alpha}, @var{x}, @var{opt})
@deftypefnx {} {[@var{H}, @var{ierr}] =} besselh (@var{alpha}, @var{k}, @var{x}, @var{opt})
Compute Bessel or Hankel functions of various kinds.

All functions begin with the prefix @qcode{"bessel"}.  The list of
functions is:

@table @code
@item besselj
Bessel functions of the first kind.  If the argument @var{opt} is supplied,
the result is multiplied by @code{exp (-abs (imag (x)))}.

@item bessely
Bessel functions of the second kind.  If the argument @var{opt} is supplied,
the result is multiplied by @w{@code{exp (-abs (imag (x)))}}.

@item besseli
Modified Bessel functions of the first kind.  If the argument @var{opt} is
supplied, the result is multiplied by @w{@code{exp (-abs (real (x)))}}.

@item besselk
Modified Bessel functions of the second kind.  If the argument @var{opt} is
supplied, the result is multiplied by @w{@code{exp (x)}}.

@item besselh
Compute Hankel functions of the first (@var{k} = 1) or second (@var{k} = 2)
kind.  If the argument @var{opt} is supplied, the result is multiplied by
@w{@code{exp (-I*@var{x})}}@ for @var{k} = 1 or
@w{@code{exp (I*@var{x})}}@ for @var{k} = 2.
@end table

If @var{alpha} is a scalar, the result is the same size as @var{x}.  If
@var{x} is a scalar, the result is the same size as @var{alpha}.  If
@var{alpha} is a row vector and @var{x} is a column vector, the result is
a matrix with @code{length (@var{x})} rows and @code{length
(@var{alpha})} columns.  Otherwise, @var{alpha} and @var{x} must conform
and the result will be the same size.

The order of the Bessel function @var{alpha} must be real.  The points for
evaluation @var{x} may be complex.

If requested, @var{ierr} contains the following status information and is
the same size as the result.

@enumerate 0
@item
Normal return.

@item
Input error, return @code{NaN}.

@item
Overflow, return @code{Inf}.

@item
Loss of significance by argument reduction results in less than half of
machine accuracy.

@item
Loss of significance by argument reduction, output may be inaccurate.

@item
Error---no computation, algorithm termination condition not met, return
@code{NaN}.
@end enumerate

@seealso{besselj, bessely, besseli, besselk, besselh}
@end deftypefn
