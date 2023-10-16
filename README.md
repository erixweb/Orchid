# Orchid

JavaScript, but with extra features

## Features

* Enums
* Compile code optimization

## Examples

```ts
console.log("Hello, World!");
```

```ts
enum UserType {
    Default,
    Premium
}

class User {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

const user1 = new User("User1", UserType.Premium);
const user2 = new User("User2", UserType.Default);

console.log(user1, user2);
```

## Usage

1. Create a file named "main.oc"
2. `node index.js [--noOptimization (optional)]`

## Planned features

1. Macros
2. Built-in logging library with support for log levels and saving the logs to a file
3. Built-in library for console colors