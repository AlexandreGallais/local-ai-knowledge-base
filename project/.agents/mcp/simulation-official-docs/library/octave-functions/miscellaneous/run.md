# run

```octave
function run (script)
```

@deftypefn  {} {} run @var{script}
@deftypefnx {} {} run ("@var{script}")
Run @var{script} in the current workspace.

Scripts which reside in directories specified in Octave's load path, and
which end with the extension @file{.m}, can be run simply by typing
their name.  For scripts not located on the load path, use @code{run}.

The filename @var{script} can be a bare, fully qualified, or relative
filename and with or without a file extension.  If no extension is
specified, Octave will first search for a script with the @file{.m}
extension before falling back to the script name without an extension.

Implementation Note: If @var{script} includes a path component, then
@code{run} first changes the working directory to the directory where
@var{script} is found.  Next, the script is executed.  Finally, @code{run}
returns to the original working directory @emph{unless} @var{script} has
specifically changed directories.
@seealso{path, addpath, source}
@end deftypefn
