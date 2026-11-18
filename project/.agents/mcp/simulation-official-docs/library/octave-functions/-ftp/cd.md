# cd

```octave
function path = cd (f, path)
```

@deftypefn  {} {@var{cwd} =} cd (@var{f})
@deftypefnx {} {} cd (@var{f}, @var{path})
@deftypefnx {} {@var{new_cwd} =} cd (@var{f}, @var{path})
Get or set the remote directory on the FTP connection @var{f}.

@var{f} is an FTP object returned by the @code{ftp} function.

If @var{path} is not specified, return the remote current working
directory.  Otherwise, set the remote directory to @var{path} and return
the new remote working directory.

If the directory does not exist, an error message is printed and the
working directory is not changed.
@seealso{@ftp/dir, @ftp/ftp}
@end deftypefn
