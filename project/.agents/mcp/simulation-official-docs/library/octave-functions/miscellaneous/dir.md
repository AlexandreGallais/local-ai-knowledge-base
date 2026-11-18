# dir

```octave
function list = dir (directory = ".")
```

@deftypefn  {} {} dir
@deftypefnx {} {} dir @var{directory}
@deftypefnx {} {[@var{list}] =} dir (@var{directory})
Display file listing for directory @var{directory}.

If @var{directory} is not specified then list the present working directory.

If a return value is requested, return a structure array with the fields

@table @asis
@item name
File or directory name.

@item folder
Location of file or directory

@item date
Timestamp of file modification (string value).

@item bytes
File size in bytes.

@item isdir
True if name is a directory.

@item datenum
Timestamp of file modification as serial date number (double).

@item statinfo
Information structure returned from @code{stat}.
@end table

If @var{directory} is a filename, rather than a directory, then return
information about the named file.  @var{directory} may also be a list rather
than a single directory or file.

@var{directory} is subject to shell expansion if it contains any wildcard
characters @samp{*}, @samp{?}, @samp{[]}.  If these wildcard characters are
escaped with a backslash @samp{\} (e.g., @samp{\*}) on a POSIX platform,
then they are not treated as wildcards, but as the corresponding literal
character.  On Windows, it is not possible to escape wildcard characters
because backslash @samp{\} is treated as a file separator.  On Windows, use
@code{ls} for file or folder names that contain characters that would be
treated as wildcards by @code{dir}.

Note that for symbolic links, @code{dir} returns information about the
file that the symbolic link points to rather than the link itself.  However,
if the link points to a nonexistent file, @code{dir} returns information
about the link.
@seealso{ls, readdir, glob, what, stat, lstat}
@end deftypefn
