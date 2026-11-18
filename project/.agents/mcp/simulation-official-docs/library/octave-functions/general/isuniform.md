# isuniform

```octave
function [tf, delta] = isuniform (v)
```

@deftypefn  {} {@var{tf} =} isuniform (@var{v})
@deftypefnx {} {[@var{tf}, @var{delta}] =} isuniform (@var{v})
Return true if the real vector @var{v} is uniformly spaced and false
otherwise.

A vector is uniform if the mean difference (@var{delta}) between all
elements is the same to within a tolerance of
@w{@code{4 * eps (max (abs (@var{v})))}}.

The optional output @var{delta} is the uniform difference between elements.
If the vector is not uniform then @var{delta} is @code{NaN}.  @var{delta}
is of the same class as @var{v} for floating point inputs and of class
double for integer, logical, and character inputs.

Programming Notes: The output is always false for the special cases of an
empty input or a scalar input.  If any element is @code{NaN} then the output
is false.  If @var{delta} is smaller than the calculated relative tolerance
then an absolute tolerance of @code{eps} is used.

@seealso{linspace, colon}
@end deftypefn
