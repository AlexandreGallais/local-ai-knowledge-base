# colstyle

```octave
function [l, c, m, msg] = colstyle (style)
```

@deftypefn {} {[@var{style}, @var{color}, @var{marker}, @var{msg}] =} colstyle (@var{style})
Parse the line specification @var{style} and return the line style, color,
and markers given.

In the case of an error, the string @var{msg} will return the text of the
error.
@end deftypefn
