# ls

```octave
function list = ls (varargin)
```

@deftypefn  {} {} ls
@deftypefnx {} {} ls @var{filenames}
@deftypefnx {} {} ls @var{options}
@deftypefnx {} {} ls @var{options} @var{filenames}
@deftypefnx {} {@var{list} =} ls (@dots{})

List directory contents.

The @code{ls} function forwards to the @code{ls} command if it is available.
It falls back to calling the native operating system's directory listing
command.  Available @var{options} may vary from system to system.

Filenames are subject to shell expansion if they contain any wildcard
characters @samp{*}, @samp{?}, @samp{[]}.  If these wildcard characters are
escaped with a backslash @samp{\} (e.g., @samp{\*}) then they are not
treated as wildcards, but instead as the corresponding literal character.

If the optional output @var{list} is requested then @code{ls} returns a
character array with one row for each file/directory name.

Example usage on a UNIX-like system:

@example
@group
ls -l
     @print{} total 12
     @print{} -rw-r--r--   1 jwe  users  4488 Aug 19 04:02 foo.m
     @print{} -rw-r--r--   1 jwe  users  1315 Aug 17 23:14 bar.m
@end group
@end example

@seealso{dir, readdir, glob, what, stat, filesep, ls_command}
@end deftypefn
