# dir

```octave
function lst = dir (f)
```

@deftypefn  {} {} dir (@var{f})
@deftypefnx {} {@var{lst} =} dir (@var{f})
List the current directory in verbose form for the FTP connection @var{f}.

@var{f} is an FTP object returned by the @code{ftp} function.

If the optional output @var{lst} is requested return a struct array
with one entry per file with the fields @code{name}, @code{date},
@code{bytes}, @code{isdir}, @code{datenum}.
@seealso{@ftp/cd, @ftp/mkdir, @ftp/rmdir, @ftp/ftp}
@end deftypefn
