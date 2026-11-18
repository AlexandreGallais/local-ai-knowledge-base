# xor

```octave
function z = xor (x, y, varargin)
```

@deftypefn  {} {@var{z} =} xor (@var{x}, @var{y})
@deftypefnx {} {@var{z} =} xor (@var{x1}, @var{x2}, @dots{})
Return the @dfn{exclusive or} of @var{x} and @var{y}.

For boolean expressions @var{x} and @var{y},
@code{xor (@var{x}, @var{y})} is true if and only if one of @var{x} or
@var{y} is true.  Otherwise, if @var{x} and @var{y} are both true or both
false, @code{xor} returns false.

The truth table for the xor operation is

@multitable @columnfractions 0.41 .044 .06 .042 0.42
@item @tab @var{x} @tab @var{y} @tab @var{z} @tab
@item @tab - @tab - @tab - @tab
@item @tab 0 @tab 0 @tab 0 @tab
@item @tab 1 @tab 0 @tab 1 @tab
@item @tab 0 @tab 1 @tab 1 @tab
@item @tab 1 @tab 1 @tab 0 @tab
@end multitable

If more than two arguments are given the xor operation is applied
cumulatively from left to right:

@example
(@dots{}((x1 XOR x2) XOR x3) XOR @dots{})
@end example

@seealso{and, or, not}
@end deftypefn
