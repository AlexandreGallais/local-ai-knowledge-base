# isfolder

```octave
function tf = isfolder (f)
```

@deftypefn {} {@var{tf} =} isfolder (@var{f})
Return true if @var{f} is a directory and false otherwise.

If @var{f} is a cell array of strings, @var{tf} is a logical array of the
same size.
@seealso{isfile, exist, stat, is_absolute_filename,
is_rooted_relative_filename}
@end deftypefn
