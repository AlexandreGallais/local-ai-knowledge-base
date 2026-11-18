# unique

```octave
function [y, i, j] = unique (x, varargin)
```

@deftypefn  {} {@var{y} =} unique (@var{x})
@deftypefnx {} {@var{y} =} unique (@var{x}, "rows")
@deftypefnx {} {@var{y} =} unique (@dots{}, "sorted")
@deftypefnx {} {@var{y} =} unique (@dots{}, "stable")
@deftypefnx {} {[@var{y}, @var{i}, @var{j}] =} unique (@dots{})
@deftypefnx {} {[@var{y}, @var{i}, @var{j}] =} unique (@dots{}, "first")
@deftypefnx {} {[@var{y}, @var{i}, @var{j}] =} unique (@dots{}, "last")
@deftypefnx {} {[@var{y}, @var{i}, @var{j}] =} unique (@dots{}, "legacy")
Return the unique elements of @var{x}.

If the input @var{x} is a column vector then return a column vector;
Otherwise, return a row vector.  @var{x} may also be a cell array of
strings.

If the optional argument @qcode{"rows"} is given then return the unique
rows of @var{x}.  The input must be a 2-D numeric matrix to use this option.

The optional argument @qcode{"sorted"}/@qcode{"stable"} controls the order
in which unique values appear in the output.  The default is
@qcode{"sorted"} and values in the output are placed in ascending order.
The alternative @qcode{"stable"} preserves the order found in the input
@var{x}.

If requested, return column index vectors @var{i} and @var{j} such that
@code{@var{y} = @var{x}(@var{i})} and @code{@var{x} = @var{y}(@var{j})}.

Additionally, if @var{i} is a requested output then one of the flags
@qcode{"first"} or @qcode{"last"} may be given.  If @qcode{"last"} is
specified, return the highest possible indices in @var{i}, otherwise, if
@qcode{"first"} is specified, return the lowest.  The default is
@qcode{"first"}.

Example 1 : sort order

@example
@group
unique ([3, 1, 1, 2])
@xresult{} [1, 2, 3]
unique ([3, 1, 1, 2], "stable")
@xresult{} [3, 1, 2]
@end group
@end example

Example 2 : index selection

@example
@group
[~, @var{i}] = unique ([3, 1, 1, 2], "first")
@xresult{} @var{i} = [2; 4; 1]
[~, @var{i}] = unique ([3, 1, 1, 2], "last")
@xresult{} @var{i} = [3; 4; 1]
@end group
@end example

Programming Notes: The input flag @qcode{"legacy"} changes the algorithm
to be compatible with @sc{matlab} releases prior to R2012b.  Specifically,
The index ordering flag is changed to @qcode{"last"}, and the shape of the
outputs @var{i}, @var{j} will follow the shape of the input @var{x} rather
than always being column vectors.

@seealso{uniquetol, union, intersect, setdiff, setxor, ismember}
@end deftypefn
