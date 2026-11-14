# std::sync::nonpoison

Non-poisoning synchronous locks.

The difference from the locks in the [`poison`] module is that the locks in this module will not
become poisoned when a thread panics while holding a guard.

[`poison`]: super::poison