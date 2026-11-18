# mput

```octave
function retval = mput (f, file)
```

@deftypefn  {} {} mput (@var{f}, @var{file})
@deftypefnx {} {@var{file_list} =} mput (@var{f}, @var{file})
Upload the local file @var{file} into the current remote directory on the
FTP connection @var{f}.

@var{f} is an FTP object returned by the @code{ftp} function.

The argument @var{file} is passed through the @code{glob} function and any
files that match the wildcards in @var{file} will be uploaded.

The optional output argument @var{file_list} contains a cell array of
strings with the names of the uploaded files.
@seealso{@ftp/mget, @ftp/mkdir, @ftp/ftp}
@end deftypefn
