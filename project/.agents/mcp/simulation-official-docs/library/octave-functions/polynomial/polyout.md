# polyout

```octave
function str = polyout (c, x)
```

@deftypefn  {} {} polyout (@var{c})
@deftypefnx {} {} polyout (@var{c}, @var{x})
@deftypefnx {} {@var{str} =} polyout (@dots{})
Display a formatted version of the polynomial @var{c}.

The formatted polynomial
@tex
$$ c(x) = c_1 x^n + \ldots + c_n x + c_{n+1} $$
@end tex
@ifnottex

@example
c(x) = c(1) * x^n + @dots{} + c(n) x + c(n+1)
@end example

@end ifnottex
is returned as a string or written to the screen if @code{nargout} is zero.

The second argument @var{x} specifies the variable name to use for each term
and defaults to the string @qcode{"s"}.
@seealso{polyreduce}
@end deftypefn
