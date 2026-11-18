# celldisp

```octave
function celldisp (c, name)
```

@deftypefn  {} {} celldisp (@var{c})
@deftypefnx {} {} celldisp (@var{c}, @var{name})
Recursively display the contents of a cell array.

By default the values are displayed with the name of the variable @var{c}.
However, this name can be replaced with the variable @var{name}.  For
example:

@example
@group
c = @{1, 2, @{31, 32@}@};
celldisp (c, "b")
   @xresult{}
      b@{1@} =
       1
      b@{2@} =
       2
      b@{3@}@{1@} =
       31
      b@{3@}@{2@} =
       32
@end group
@end example

@seealso{disp}
@end deftypefn
