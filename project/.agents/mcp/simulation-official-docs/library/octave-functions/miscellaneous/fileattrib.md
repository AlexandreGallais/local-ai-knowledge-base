# fileattrib

```octave
function [status, msg, msgid] = fileattrib (file = ".")
```

@deftypefn  {} {} fileattrib
@deftypefnx {} {} fileattrib @var{file}
@deftypefnx {} {} fileattrib (@var{file})
@deftypefnx {} {[@var{status}, @var{attrib}] =} fileattrib (@dots{})
@deftypefnx {} {[@var{status}, @var{msg}, @var{msgid}] =} fileattrib (@dots{})
Report attribute information about @var{file}.

If no file or directory is specified, report information about the present
working directory.

If successful, the output is a structure with the following fields:

@table @code
@item Name
Full name of @var{file}.

@item archive
True if @var{file} is an archive (Windows).

@item system
True if @var{file} is a system file (Windows).

@item hidden
True if @var{file} is a hidden file (Windows).

@item directory
True if @var{file} is a directory.

@item  UserRead
@itemx GroupRead
@itemx OtherRead
True if the user (group; other users) has read permission for @var{file}.

@item  UserWrite
@itemx GroupWrite
@itemx OtherWrite
True if the user (group; other users) has write permission for @var{file}.

@item  UserExecute
@itemx GroupExecute
@itemx OtherExecute
True if the user (group; other users) has execute permission for @var{file}.
@end table

If an attribute does not apply (e.g., archive on a Unix system) then the
field is set to NaN.

If @var{file} contains globbing characters, information about all matching
files is returned in a structure array.

If outputs are requested, the first is @var{status} which takes the value 1
when the operation was successful, and 0 otherwise.  The second output
contains the structure described above (@var{attrib}) if the operation was
successful; otherwise, the second output is a system-dependent error message
(@var{msg}).  The third output is an empty string ("") when the operation
was successful, or a unique message identifier (@var{msgid}) in the case of
failure.
@seealso{stat, glob}
@end deftypefn
