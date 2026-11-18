# mkdir

```octave
function [status, msg, msgid] = mkdir (parent, dirname)
```

@deftypefn  {} {} mkdir @var{dirname}
@deftypefnx {} {} mkdir @var{parent} @var{dirname}
@deftypefnx {} {} mkdir (@var{dirname})
@deftypefnx {} {} mkdir (@var{parent}, @var{dirname})
@deftypefnx {} {[@var{status}, @var{msg}, @var{msgid}] =} mkdir (@dots{})
Create a directory named @var{dirname} in the directory @var{parent},
creating any intermediate directories if necessary.

If @var{dirname} is a relative path, and no @var{parent} directory is
specified, then the present working directory is used.

If successful, @var{status} is logical 1, and @var{msg}, @var{msgid} are
empty character strings ("").  Otherwise, @var{status} is logical 0,
@var{msg} contains a system-dependent error message, and @var{msgid}
contains a unique message identifier.  Note that the status code is exactly
opposite that of the @code{system} command.

When creating a directory permissions will be set to
@w{@code{0777 - UMASK}}.

@seealso{rmdir, pwd, cd, umask}
@end deftypefn
