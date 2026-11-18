# mget

```octave
function mget (f, file, target = "")
```

@deftypefn  {} {} mget (@var{f}, @var{file})
@deftypefnx {} {} mget (@var{f}, @var{dir})
@deftypefnx {} {} mget (@var{f}, @var{remote_name}, @var{target})
Download a remote file @var{file} or directory @var{dir} to the local
directory on the FTP connection @var{f}.

@var{f} is an FTP object returned by the @code{ftp} function.

The arguments @var{file} and @var{dir} can include wildcards and any
files or directories on the remote server that match will be downloaded.

If a third string argument @var{target} is given, then it must indicate
the path to the local destination directory.  @var{target} may be a
relative or absolute path.
@seealso{@ftp/mput, @ftp/ftp}
@end deftypefn
