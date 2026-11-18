# uniquetol

```octave
function [c, ia, ic] = uniquetol (A, varargin)
```

@deftypefn  {} {@var{c} =} uniquetol (@var{A})
@deftypefnx {} {@var{c} =} uniquetol (@var{A}, @var{tol})
@deftypefnx {} {@var{c} =} uniquetol (@dots{}, @var{property}, @var{value})
@deftypefnx {} {[@var{c}, @var{ia}, @var{ic}] =} uniquetol (@dots{})
Return the unique elements of @var{A} within tolerance @var{tol}.

Two values, @var{x} and @var{y}, are within relative tolerance if
@code{abs (@var{x} - @var{y}) <= @var{tol} * max (abs (@var{A}(:)))}.

The input @var{A} must be a real (non-complex) floating point type (double
or single).

If @var{tol} is unspecified, the default tolerance is 1e-12 for double
precision input or 1e-6 for single precision input.

The function may also be called with the following optional property/value
pairs.  Property/value pairs must be passed after other input arguments:

@table @asis
@item @qcode{"ByRows"} (default: @code{false})
When true, return the unique rows of @var{A}.  @var{A} must be a 2-D array
to use this option.  For rows, the criteria for uniqueness is changed to
@code{all (abs (@var{x} - @var{y}) <= @var{tol}*max (abs (@var{A}),[],1))}
which compares each column component of a row against a column-specific
tolerance.

@item @qcode{"DataScale"}
The tolerance test is changed to
@code{abs (@var{x} - @var{y}) <= @var{tol}*@var{DS}} where @var{DS} is a
scalar unless the property @qcode{"ByRows"} is true.  In that case, @var{DS}
can either be a scalar or a vector with a length equal to the number of
columns in @var{A}.  Using a value of @code{1.0} for @var{DS} will change
the tolerance from a relative one to an absolute tolerance.  Using a value
of @code{Inf} will disable testing.

@item @qcode{"OutputAllIndices"} (default: @code{false})
When true, @var{ia} is a cell array (not a vector) that contains the indices
for @emph{all} elements in @var{A} that are within tolerance of a value in
@var{C}.  That is, each cell in @var{ia} corresponds to a single unique
value in @var{C}, and the values in each cell correspond to locations in
@var{A}.
@end table

The output @var{c} is a row vector if the input @var{A} is a row vector.
For all other cases, a column vector is returned.

The optional output @var{ia} is a column index vector such that
@code{@var{c} = @var{A}(@var{ia})}.  If the @qcode{"ByRows"} property is
true, the condition is @code{@var{c} = @var{A}(@var{ia}, :)}.  If the
@qcode{"OutputAllIndices"} property is true, then the values
@code{@var{A}(@var{ia}@{@var{i}@})} are all within tolerance of the unique
value @code{@var{c}(@var{i})}.

The optional output @var{ic} is a column index vector such that
@code{@var{A} = @var{c}(@var{ic})} when @var{A} is a vector.  When @var{A}
is a matrix, @code{@var{A}(:) = @var{c}(@var{ic})}.  If the @qcode{"ByRows"}
property is true then @code{@var{A} = @var{c}(@var{ic},:)}.

Example: small round-off errors require @code{uniquetol}, not @code{unique}

@example
@group
x = [1:5];
## Inverse_Function (Function (x)) should return exactly x
y = exp (log (x));
D = unique ([x, y])
@xresult{} [1   2   3   3   4   5   5]
C = uniquetol ([x, y])
@xresult{} [1   2   3   4   5]
@end group
@end example

@seealso{unique, union, intersect, setdiff, setxor, ismember}
@end deftypefn
