# memory

```octave
function [userdata, systemdata] = memory ()
```

@deftypefn  {} {} memory ()
@deftypefnx {} {[@var{userdata}, @var{systemdata}] =} memory ()
Display or return information about the memory usage of Octave.

If the function is called without output arguments, a table with an overview
of the current memory consumption is displayed.

The output argument @var{userdata} is a structure with the following fields
containing data for the Octave process:

@table @code
@item MaxPossibleArrayBytes
Maximum size for an array to be allocated.  Be aware that this includes
@emph{all} physical memory and swap space.  Allocating that amount of memory
might result in system instability, data corruption, and/or file system
corruption.  Note that depending on the platform (32-bit systems), the
largest contiguous memory block might further limit the maximum possible
allocatable array.  This check is not currently implemented.

@item MemAvailableAllArrays
The total size of available memory in bytes.

@item ram_available_all_arrays
The maximum size for an array that can be allocated in physical memory
(excluding swap space).  Note that depending on the platform (32-bit
systems), the largest contiguous memory block might further limit the
maximum possible allocatable array.  This check is not currently
implemented.

@item  MemUsedMATLAB
@itemx mem_used_octave
The memory (including swap space) currently used by Octave in bytes.

@item ram_used_octave
The physical memory (excluding swap space) currently used by Octave in
bytes.

@end table

The output argument @var{systemdata} is a nested structure with the
following fields containing information about the system's memory:

@table @code
@item PhysicalMemory.Available
The currently available physical memory in bytes.

@item PhysicalMemory.Total
The total physical memory in bytes.

@item SystemMemory.Available
The currently available memory (including swap space) in bytes.

@item SystemMemory.Total
The total memory (including swap space) in bytes.

@item VirtualAddressSpace.Available
The currently available virtual address space in bytes.

@item VirtualAddressSpace.Total
The total virtual address space in bytes.

@end table

Example #1 : print formatted table of memory usage

@example
@group
memory ()
@xresult{}
System    RAM: 3934008 KiB,  swap: 4087804 KiB
Octave    RAM:  170596 KiB,  virt: 1347944 KiB
Free      RAM: 1954940 KiB,  swap: 4087804 KiB
Available RAM: 2451948 KiB, total: 6042744 KiB
@end group
@end example

Example #2 : return structs with memory usage information

@example
[userdata, systemdata] = memory ()
@xresult{}
 userdata =

   scalar structure containing the fields:

     MaxPossibleArrayBytes = 6.1622e+09
     MemAvailableAllArrays = 6.1622e+09
     ram_available_all_arrays = 2.4883e+09
     MemUsedMATLAB = 1.3825e+09
     mem_used_octave = 1.3825e+09
     ram_used_octave = 1.7824e+08

 systemdata =

   scalar structure containing the fields:

     PhysicalMemory =

       scalar structure containing the fields:

         Available = 2.4954e+09
         Total = 4.0284e+09

     SystemMemory =

       scalar structure containing the fields:

         Available = 6.6813e+09
         Total = 8.2143e+09

     VirtualAddressSpace =

       scalar structure containing the fields:

         Available = 2.8147e+14
         Total = 2.8147e+14
@end example

Programming Note: This function is implemented for Linux and Windows only.

@seealso{computer, getpid, getrusage, nproc, uname}
@end deftypefn
