# unpack

```octave
function filelist = unpack (file, dir = [], filetype = "")
```

@deftypefn  {} {@var{files} =} unpack (@var{file})
@deftypefnx {} {@var{files} =} unpack (@var{file}, @var{dir})
@deftypefnx {} {@var{files} =} unpack (@var{file}, @var{dir}, @var{filetype})
Unpack the archive @var{file} based on its extension to the directory
@var{dir}.

If @var{file} is a list of strings, then each file is unpacked
individually.  Shell wildcards in the filename such as @samp{*} or
@samp{?} are accepted and expanded.

If @var{dir} is not specified or is empty (@code{[]}), it defaults to the
current directory.  If a directory is in the file list, then @var{filetype}
must also be specified.

The specific archive filetype is inferred from the extension of the file.
The @var{filetype} may also be specified directly using a string which
corresponds to a known extension.

Valid filetype extensions:

@table @code
@item  @nospell{bz}
@itemx @nospell{bz2}
bzip archive

@item @nospell{gz}
gzip archive

@item tar
tar archive

@item  tarbz
@itemx tarbz2
@itemx tbz
@itemx tbz2
tar + bzip archive

@item  targz
@itemx tgz
tar + gzip archive

@item z
compress archive

@item zip
zip archive
@end table

The optional return value is a list of @var{files} unpacked.
@seealso{bunzip2, gunzip, unzip, untar, bzip2, gzip, zip, tar}
@end deftypefn
