# doc_cache_create

```octave
function doc_cache_create (out_file = "doc-cache", directory = [])
```

@deftypefn  {} {} doc_cache_create (@var{out_file}, @var{directory})
@deftypefnx {} {} doc_cache_create (@var{out_file})
@deftypefnx {} {} doc_cache_create ()
Generate documentation cache for all functions in @var{directory}.

A documentation cache is generated for all functions in @var{directory}
which may be a single string or a cell array of strings.  The cache is used
to speed up the function @code{lookfor}.

The cache is saved in the file @var{out_file} which defaults to the value
@file{doc-cache} if not given.

If no directory is given (or it is the empty matrix), a cache for built-in
functions, operators, and keywords is generated.

@seealso{doc_cache_file, lookfor, path}
@end deftypefn
