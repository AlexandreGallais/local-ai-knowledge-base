# alloc::io::prelude

The I/O Prelude.

The purpose of this module is to alleviate imports of many common I/O traits
by adding a glob import to the top of I/O heavy modules:

```
# #![feature(alloc_io)]
# #![allow(unused_imports)]
use alloc::io::prelude::*;
```