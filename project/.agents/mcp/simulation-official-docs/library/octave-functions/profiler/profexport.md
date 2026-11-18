# profexport

```octave
function profexport (dir, name = "", data)
```

@deftypefn  {} {} profexport (@var{dir})
@deftypefnx {} {} profexport (@var{dir}, @var{data})
@deftypefnx {} {} profexport (@var{dir}, @var{name})
@deftypefnx {} {} profexport (@var{dir}, @var{name}, @var{data})

Export profiler data as HTML.

Export the profiling data in @var{data} into a series of HTML files in
the folder @var{dir}.  The initial file will be
@file{@var{data}/index.html}.

If @var{name} is specified, it must be a string that contains a ``name''
for the profile being exported.  This name is included in the HTML.

The input @var{data} is the structure returned by @code{profile ("info")}.
If unspecified, @code{profexport} will use the current profile dataset.

@seealso{profshow, profexplore, profile}
@end deftypefn
