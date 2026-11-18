# deal

```octave
function varargout = deal (varargin)
```

@deftypefn  {} {[@var{r1}, @var{r2}, @dots{}, @var{rn}] =} deal (@var{a})
@deftypefnx {} {[@var{r1}, @var{r2}, @dots{}, @var{rn}] =} deal (@var{a1}, @var{a2}, @dots{}, @var{an})

Copy the input parameters into the corresponding output parameters.

If only a single input parameter is supplied, its value is copied to each
of the outputs.

For example,

@example
[a, b, c] = deal (x, y, z);
@end example

@noindent
is equivalent to

@example
@group
a = x;
b = y;
c = z;
@end group
@end example

@noindent
and

@example
[a, b, c] = deal (x);
@end example

@noindent
is equivalent to

@example
a = b = c = x;
@end example

Programming Note: @code{deal} is often used with comma-separated lists
derived from cell arrays or structures.  This is unnecessary as the
interpreter can perform the same action without the overhead of a function
call.  For example:

@example
@group
c = @{[1 2], "Three", 4@};
[x, y, z] = c@{:@}
@xresult{}
   x =

      1   2

   y = Three
   z =  4
@end group
@end example
@seealso{cell2struct, struct2cell, repmat}
@end deftypefn
