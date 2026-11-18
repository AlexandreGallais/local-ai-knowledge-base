# isfile

```octave
function retval = isfile (f)
```

@deftypefn {} {@var{tf} =} isfile (@var{f})
Return true if @var{f} is a regular file and false otherwise.

If @var{f} is a cell array of strings, @var{tf} is a logical array of the
same size.
@seealso{isfolder, exist, stat, is_absolute_filename,
is_rooted_relative_filename}
@end deftypefn
