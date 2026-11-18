# ismembertol

```octave
function [tf, s_idx] = ismembertol (a, s, varargin)
```

@deftypefn  {} {@var{tf} =} ismembertol (@var{a}, @var{s})
@deftypefnx {} {@var{tf} =} ismembertol (@var{a}, @var{s}, @var{tol})
@deftypefnx {} {@var{tf} =} ismembertol (@var{a}, @var{s}, @var{name}, @var{value})
@deftypefnx {} {[@var{tf}, @var{s_idx}] =} ismembertol (@dots{})
Check if values are members of a set within a tolerance.

This functions returns a logical matrix @var{tf} with the same shape as
@var{a} which is true (1) where the element in @var{a} is close to @var{s}
within a tolerance @var{tol} and false (0) if it is not.  If @var{tol} is
not specified, a default tolerance of @code{1e-6} is used.

If a second output argument is requested then the index into @var{s} of each
matching element is also returned.

The inputs @var{a} and @var{s} must be numeric values.

@example
@group
a = [3, 10, 1];
s = [0:9];
[tf, s_idx] = ismembertol (a, s)
     @xresult{} tf = [1, 0, 1]
     @xresult{} s_idx = [4, 0, 2]
@end group
@end example

Optional property/value pairs may be given to change the function's
behavior.  The property may be one of following strings:

@table @asis
@item @qcode{"ByRows"}
If set to @code{false} (default), all elements in @var{a} and @var{s} are
treated separately.  If set to @code{true}, @var{tf} will be @code{true}
for each row in @var{a} that matches a row in @var{s} within the given
tolerance.  Two rows, @var{u} and @var{v}, are within tolerance if they
fulfill the condition @code{all (abs (u-v) <= tol*max (abs ([a;s])))}.

@item @qcode{"OutputAllIndices"}
If set to @code{false} (default), @var{s_idx} contains indices for one
of the matches.  If set to @code{true}, @var{s_idx} is a cell array
containing the indices for all elements in @var{s} that are within tolerance
of the corresponding value in @var{a}.

@item @qcode{"DataScale"}
The provided value @var{DS} is used to change the scale factor in the
tolerance test to @code{abs (u-v) <= tol*@var{DS}}.  By default, the maximum
absolute value in @var{a} and @var{s} is used as the scale factor.
@end table

Example:

@example
@group
s = [1:6].' * pi;
a = 10.^log10 (x);
[tf, s_idx] = ismembertol (a, s);
@end group
@end example

@seealso{ismember, lookup, unique, union, intersect, setdiff, setxor}
@end deftypefn
