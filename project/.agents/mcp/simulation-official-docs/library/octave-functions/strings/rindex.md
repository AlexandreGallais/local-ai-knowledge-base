# rindex

```octave
function n = rindex (s, t)
```

@deftypefn {} {@var{n} =} rindex (@var{s}, @var{t})
Return the position of the last occurrence of the character string
@var{t} in the character string @var{s}, or 0 if no occurrence is
found.

@var{s} may also be a string array or cell array of strings.

For example:

@example
@group
rindex ("Teststring", "t")
     @xresult{} 6
@end group
@end example

The @code{rindex} function is equivalent to @code{index} with
@var{direction} set to @qcode{"last"}.

@seealso{find, index}
@end deftypefn
