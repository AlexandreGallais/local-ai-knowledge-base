# tar

```octave
function filelist = tar (tarfile, files, rootdir = ".")
```

@deftypefn  {} {@var{filelist} =} tar (@var{tarfile}, @var{files})
@deftypefnx {} {@var{filelist} =} tar (@var{tarfile}, @var{files}, @var{rootdir})
Pack the list of files and directories specified in @var{files} into the
TAR archive @var{tarfile}.

@var{files} is a character array or cell array of strings.  Shell wildcards
in the filename such as @samp{*} or @samp{?} are accepted and expanded.
Directories are recursively traversed and all files are added to the
archive.

If @var{rootdir} is defined then any files without absolute pathnames are
located relative to @var{rootdir} rather than the current directory.

The optional output @var{filelist} is a list of the files that were included
in the archive.
@seealso{untar, unpack, bzip2, gzip, zip}
@end deftypefn
