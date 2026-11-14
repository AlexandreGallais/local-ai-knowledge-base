# core::slice::sort::select

This module contains the implementation for `slice::select_nth_unstable`.
It uses an introselect algorithm based on ipnsort by Lukas Bergdoll and Orson Peters,
published at: <https://github.com/Voultapher/sort-research-rs/tree/main/ipnsort>

The fallback algorithm used for introselect is Median of Medians using Tukey's Ninther
for pivot selection. Using this as a fallback ensures O(n) worst case running time with
better performance than one would get using heapsort as fallback.