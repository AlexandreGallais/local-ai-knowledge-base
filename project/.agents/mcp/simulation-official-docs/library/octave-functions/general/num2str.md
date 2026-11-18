# num2str

```octave
function str = num2str (x, arg)
```

@deftypefn  {} {@var{str} =} num2str (@var{x})
@deftypefnx {} {@var{str} =} num2str (@var{x}, @var{precision})
@deftypefnx {} {@var{str} =} num2str (@var{x}, @var{format})
Convert a number (or array) to a string (or a character array).

The optional second argument may either give the number of significant
digits (@var{precision}) to be used in the output or a format template
string (@var{format}) as in @code{sprintf} (@pxref{Formatted Output}).
@code{num2str} can also process complex numbers.

Examples:

@example
num2str (123.456)
  @xresult{} 123.456

num2str (123.456, 4)
  @xresult{} 123.5

s = num2str ([1, 1.34; 3, 3.56], "%5.1f")
  @xresult{} s =
       1.0  1.3
       3.0  3.6
whos s
  @xresult{} Variables in the current scope:
        Attr Name        Size                     Bytes  Class
        ==== ====        ====                     =====  =====
             s           2x8                         16  char
     Total is 16 elements using 16 bytes

num2str (1.234 + 27.3i)
  @xresult{} 1.234+27.3i
@end example

The @code{num2str} function is not very flexible.  For better control
over the results, use @code{sprintf} (@pxref{Formatted Output}).

Programming Notes:

For @sc{matlab} compatibility, leading spaces are stripped before returning
the string.

Integers larger than @code{flintmax} may not be displayed correctly.

For complex @var{x}, the format string may only contain one output
conversion specification and nothing else.  Otherwise, results will be
unpredictable.

Any optional @var{format} specified by the programmer is used without
modification.  This is in contrast to @sc{matlab} which tampers with the
@var{format} based on internal heuristics.
@seealso{sprintf, int2str, mat2str}
@end deftypefn
