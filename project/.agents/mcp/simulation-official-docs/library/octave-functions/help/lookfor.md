# lookfor

```octave
function [fcn, help1str] = lookfor (str, arg2)
```

@deftypefn  {} {} lookfor @var{str}
@deftypefnx {} {} lookfor -all @var{str}
@deftypefnx {} {[@var{fcn}, @var{help1str}] =} lookfor (@var{str})
@deftypefnx {} {[@var{fcn}, @var{help1str}] =} lookfor ("-all", @var{str})
Search for the string @var{str} in the documentation of all functions in the
current function search path.

By default, @code{lookfor} looks for @var{str} in just the first sentence of
the help string for each function found.  The entire help text of each
function can be searched by using the @qcode{"-all"} argument.  All searches
are case insensitive.

When called with no output arguments, @code{lookfor} prints the list of
matching functions to the terminal.  Otherwise, the output argument
@var{fcns} contains the function names and @var{help1str} contains the first
sentence from the help string of each function.

Programming Note: The ability of @code{lookfor} to correctly identify the
first sentence of the help text is dependent on the format of the function's
help.  All Octave core functions are correctly formatted, but the same can
not be guaranteed for external packages and user-supplied functions.
Therefore, the use of the @qcode{"-all"} argument may be necessary to find
related functions that are not a part of Octave.

The speed of lookup is greatly enhanced by having a cached documentation
file.  For more information,
@pxref{XREFdoc_cache_create,,@code{doc_cache_create}}.
@seealso{help, doc, which, path, doc_cache_create}
@end deftypefn
