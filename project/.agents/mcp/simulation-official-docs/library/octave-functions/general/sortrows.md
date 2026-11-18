# sortrows

```octave
function [s, i] = sortrows (A, c)
```

@deftypefn  {} {[@var{s}, @var{i}] =} sortrows (@var{A})
@deftypefnx {} {[@var{s}, @var{i}] =} sortrows (@var{A}, @var{c})
Sort the rows of the matrix @var{A} according to the order of the columns
specified in @var{c}.

By default (@var{c} omitted, or a particular column unspecified in @var{c})
an ascending sort order is used.  However, if elements of @var{c} are
negative then the corresponding column is sorted in descending order.  If
the elements of @var{A} are strings then a lexicographical sort is used.

Example: sort by column 2 in descending order, then 3 in ascending order

@example
@group
x = [ 7, 1, 4;
      8, 3, 5;
      9, 3, 6 ];
sortrows (x, [-2, 3])
   @xresult{} 8  3  5
      9  3  6
      7  1  4
@end group
@end example

@seealso{sort}
@end deftypefn
