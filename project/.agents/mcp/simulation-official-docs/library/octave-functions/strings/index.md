# index

```octave
function n = index (s, t, direction = "first")
```

@deftypefn  {} {@var{n} =} index (@var{s}, @var{t})
@deftypefnx {} {@var{n} =} index (@var{s}, @var{t}, @var{direction})
Return the position of the first occurrence of the string @var{t} in the
string @var{s}, or 0 if no occurrence is found.

@var{s} may also be a string array or cell array of strings.

For example:

@example
@group
index ("Teststring", "t")
    @xresult{} 4
@end group
@end example

If @var{direction} is @qcode{"first"}, return the first element found.
If @var{direction} is @qcode{"last"}, return the last element found.

@seealso{find, rindex}
@end deftypefn
