# Orchid

JavaScript, but with extra features

## Features

* Enums
* Compile-time code optimization
* Built-in `DataTypes` enum
* Built-in `RunningEnvironments` enum
* Built-in `sleep(milliseconds)` function
* Built-in `Array.prototype.isInArray(value)` function
* Built-in `enforceType(value, type)` function
* Built-in `getRunningEnvironment()` & `getRunningEnv()` functions
* Built-in `isDefined(object)` alias

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

```ts
enum UserType {
    Default,
    Premium
}

class User {
    constructor(username, type) {
        enforceType(username, DataTypes.String);

        this.username = username;
        this.type = type;
    }

    say(message) {
        if (!isDefined(message)) {
            throw new Error("Oops! Message is not defined");
        }

        console.log(`${this.username}: ${message}`);
    }
}

if (getRunningEnv() == RunningEnvironments.Browser) {
    throw new Error("Oops! You can't run this in a browser!");
}

const user1 = new User("user1", DataTypes.String);
const user2 = new User("user2", DataTypes.String);

user1.say("Hello!");

sleep(1000)

user2.say("Hello!")
```

## Usage

1. Create a file named "main.oc"
2. `npm run-script [--noOptimization (optional)]`

## Planned features

1. Macros
2. Built-in logging library with support for log levels and saving the logs to a file
3. Built-in library for console colors
