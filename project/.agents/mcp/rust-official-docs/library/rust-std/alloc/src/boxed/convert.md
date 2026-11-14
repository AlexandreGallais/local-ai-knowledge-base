# alloc::boxed::convert

## Box::downcast

```rust
pub fn downcast<T: Any>(self) -> Result<Box<T, A>, Self>
```

Attempts to downcast the box to a concrete type.

# Examples

```
use std::any::Any;

fn print_if_string(value: Box<dyn Any>) {
    if let Ok(string) = value.downcast::<String>() {
        println!("String ({}): {}", string.len(), string);
    }
}

let my_string = "Hello World".to_string();
print_if_string(Box::new(my_string));
print_if_string(Box::new(0i8));
```

## Box::downcast

```rust
pub fn downcast<T: Any>(self) -> Result<Box<T, A>, Self>
```

Attempts to downcast the box to a concrete type.

# Examples

```
use std::any::Any;

fn print_if_string(value: Box<dyn Any + Send>) {
    if let Ok(string) = value.downcast::<String>() {
        println!("String ({}): {}", string.len(), string);
    }
}

let my_string = "Hello World".to_string();
print_if_string(Box::new(my_string));
print_if_string(Box::new(0i8));
```

## Box::downcast

```rust
pub fn downcast<T: Any>(self) -> Result<Box<T, A>, Self>
```

Attempts to downcast the box to a concrete type.

# Examples

```
use std::any::Any;

fn print_if_string(value: Box<dyn Any + Send + Sync>) {
    if let Ok(string) = value.downcast::<String>() {
        println!("String ({}): {}", string.len(), string);
    }
}

let my_string = "Hello World".to_string();
print_if_string(Box::new(my_string));
print_if_string(Box::new(0i8));
```

## Error::downcast

```rust
pub fn downcast<T: Error + 'static>(self: Box<Self>) -> Result<Box<T>, Box<dyn Error>>
```

Attempts to downcast the box to a concrete type.

## Error::downcast

```rust
pub fn downcast<T: Error + 'static>(self: Box<Self>) -> Result<Box<T>, Box<dyn Error + Send>>
```

Attempts to downcast the box to a concrete type.

## Error::downcast

```rust
pub fn downcast<T: Error + 'static>(self: Box<Self>) -> Result<Box<T>, Box<Self>>
```

Attempts to downcast the box to a concrete type.