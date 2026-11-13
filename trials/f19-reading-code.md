# F19 trial on the workstation

What to play on the workstation for the criterion of F19 that only a person can see. About 20
minutes. Ask "Explain this code." with each excerpt, in a new session each time.

## 1. C (embedded)

```c
#define REG32(addr) (*(volatile uint32_t *)(addr))
#define PUMP_CTRL   REG32(0x40002000u)

void SysTick_Handler(void)
{
    if (PUMP_CTRL & (1u << 2)) {
        PUMP_CTRL &= ~(1u << 2);
    }
}
```

Expected: `SysTick_Handler` is called by the hardware (never "dead code"); `PUMP_CTRL` is a macro on
a hardware register; bit 2 is read then cleared; what bit 2 means is "not visible in this excerpt".

## 2. C++

```cpp
std::unique_ptr<Valve> make_valve(std::string tag) {
    auto valve = std::make_unique<Valve>(std::move(tag));
    return valve;
}
```

Expected: one owner, moved out on return; `std::move(tag)` casts, the constructor moves; `Valve`
and its constructor are "not visible in this excerpt".

## 3. Java

```java
@Service
@RequiredArgsConstructor
public class PumpService {
    private final PumpRepository repository;
}
```

Expected: Spring creates the object and injects `repository`; Lombok generates the constructor;
no `new` in the code is normal.

## 4. Rust

```rust
fn read_level(path: &str) -> Result<f64, std::io::Error> {
    let text = std::fs::read_to_string(path)?;
    Ok(text.trim().parse().unwrap_or(0.0))
}
```

Expected: `?` returns the error at once (not `?.`); `unwrap_or(0.0)` gives 0.0 when parsing fails.

For each answer: no name that is absent from the excerpt; the order "What it does", "Step by step",
"C# equivalents", "False friends", "Not visible in this excerpt".

## Results

| Excerpt | Follows the skill | No invented name | Notes |
| --- | --- | --- | --- |
| C |  |  |  |
| C++ |  |  |  |
| Java |  |  |  |
| Rust |  |  |  |
