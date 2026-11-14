# std::sys::time::uefi

## struct SystemTime

```rust
pub struct SystemTime(Duration)
```

When a Timezone is specified, the stored Duration is in UTC. If timezone is unspecified, then
the timezone is assumed to be in UTC.

UEFI SystemTime is stored as Duration from 1900-01-01-00:00:00 with timezone -1440 as anchor