# profexplore

```octave
function profexplore (data)
```

@deftypefn  {} {} profexplore ()
@deftypefnx {} {} profexplore (@var{data})
Interactively explore hierarchical profiler output.

Assuming @var{data} is the structure with profile data returned by
@code{profile (@qcode{"info"})}, this command opens an interactive prompt
that can be used to explore the call-tree.  Type @kbd{help} to get a list
of possible commands.  If @var{data} is omitted, @code{profile ("info")}
is called and used in its place.
@seealso{profile, profshow}
@end deftypefn
