# mpoles

```octave
function [multp, idxp] = mpoles (p, tol, reorder)
```

@deftypefn  {} {[@var{multp}, @var{idxp}] =} mpoles (@var{p})
@deftypefnx {} {[@var{multp}, @var{idxp}] =} mpoles (@var{p}, @var{tol})
@deftypefnx {} {[@var{multp}, @var{idxp}] =} mpoles (@var{p}, @var{tol}, @var{reorder})
Identify unique poles in @var{p} and their associated multiplicity.

By default, the output is ordered from the pole with the largest magnitude
to the smallest magnitude.

Two poles are considered to be multiples if the difference between them
is less than the relative tolerance @var{tol}.

@example
abs (@var{p1} - @var{p0}) / abs (@var{p0}) < @var{tol}
@end example

If the pole is 0 then no scaling is done and @var{tol} is interpreted as an
absolute tolerance.  The default value for @var{tol} is 0.001.

If the optional parameter @var{reorder} is false/zero, poles are not
sorted.

The output @var{multp} is a vector specifying the multiplicity of the poles.
@code{@var{multp}(n)} refers to the multiplicity of the Nth pole
@code{@var{p}(@var{idxp}(n))}.

For example:

@example
@group
p = [2 3 1 1 2];
[m, n] = mpoles (p)
   @xresult{} m = [1; 1; 2; 1; 2]
   @xresult{} n = [2; 5; 1; 4; 3]
   @xresult{} p(n) = [3, 2, 2, 1, 1]
@end group
@end example

@seealso{residue, poly, roots, conv, deconv}
@end deftypefn
