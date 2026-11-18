# movefile

```octave
function [status, msg, msgid] = movefile (f1, f2, force)
```

@deftypefn  {} {} movefile @var{f1}
@deftypefnx {} {} movefile @var{f1} @var{f2}
@deftypefnx {} {} movefile @var{f1} @var{f2} f
@deftypefnx {} {} movefile (@var{f1})
@deftypefnx {} {} movefile (@var{f1}, @var{f2})
@deftypefnx {} {} movefile (@var{f1}, @var{f2}, 'f')
@deftypefnx {} {[@var{status}] =} movefile (@dots{})
@deftypefnx {} {[@var{status}, @var{msg}] =} movefile (@dots{})
@deftypefnx {} {[@var{status}, @var{msg}, @var{msgid}] =} movefile (@dots{})
Move the source file or directory @var{f1} to the destination @var{f2}.

The name @var{f1} may contain globbing patterns, or may be a cell array of
strings.  If @var{f1} expands to multiple filenames, @var{f2} must be a
directory.

If no destination @var{f2} is specified then the destination is the present
working directory.  If @var{f2} is a filename then @var{f1} is renamed to
@var{f2}.

When the force flag @qcode{'f'} is given any existing files will be
overwritten without prompting.

If successful, @var{status} is logical 1, and @var{msg}, @var{msgid} are
empty character strings ("").  Otherwise, @var{status} is logical 0,
@var{msg} contains a system-dependent error message, and @var{msgid}
contains a unique message identifier.  Note that the status code is exactly
opposite that of the @code{system} command.
@seealso{rename, copyfile, unlink, delete, glob}
@end deftypefn
