# zip

```octave
function filelist = zip (zipfile, files, rootdir = ".")
```

@deftypefn  {} {@var{filelist} =} zip (@var{zipfile}, @var{files})
@deftypefnx {} {@var{filelist} =} zip (@var{zipfile}, @var{files}, @var{rootdir})
Compress the list of files and directories specified in @var{files} into the
ZIP archive @var{zipfile}.

@var{files} is a character array or cell array of strings.  Shell
wildcards in the filename such as @samp{*} or @samp{?} are accepted and
expanded.  Directories are recursively traversed and all files are
compressed and added to the archive.

If @var{rootdir} is defined then any files without absolute pathnames are
located relative to @var{rootdir} rather than the current directory.

The optional output @var{filelist} is a list of the files that were included
in the archive.
@seealso{unzip, unpack, bzip2, gzip, tar}
@end deftypefn
