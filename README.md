# Orchid

JavaScript, but with extra features

## Features

* Enums
* Compile-time code optimization
* Now you can use `await` without defining a function
* Built-in `Time` enum
* Built-in `DataTypes` enum
* Built-in `sleep(milliseconds)` function
* Built-in `Array.prototype.includes(value)` function
* Built-in `Array.prototype.random()` function
* Built-in `Math.nRandom(min, max)` function
* Built-in `Math.square()` function
* Built-in `enforceType(value, type)` function
* Built-in `getRunningEnvironment()` & `getRunningEnv()` functions (and the `RunningEnvironments` enum ofc)
* Built-in `isDefined(object)` function
* Built-in `MAX_INT32_VALUE` global variable
* Built-in `Array.prototype.contains()` and `String.prototype.contains()` which are aliases to `Array.prototype.includes()` and `String.prototype.includes()`

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
    constructor(username, type, age = Math.nRandom(1, 100)) {
        enforceType(username, DataTypes.String);
        enforceType(age, DataTypes.Number);

        this.username = username;
        this.type = type;
        this.age = age;
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

const user1 = new User("user1", UserType.Default);
const user2 = new User("user2", UserType.Premium);

const users = [ user1, user2 ]

user1.say("Hello!");
user1.say("My age is " + user1.age);
user1.say("Square of my age is " + Math.square(user1.age));

await sleep(1000);

user2.say("Hello!");
user2.say("My age is " + user2.age);
user2.say("Square of my age is " + Math.square(user2.age));

console.log("Random user: ", users.random());
```

## Usage

1. Create a file named "main.oc"
2. `npm run dev`

## Planned features

1. Macros
2. Built-in logging library with support for log levels and saving the logs to a file
3. Built-in library for console colors
