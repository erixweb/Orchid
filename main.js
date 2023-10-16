const UserType = {
    Default: 0,
    Premium: 1,
}

class User {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

const user1 = new User("User1", UserType.Premium)
const user2 = new User("User2", UserType.Default)

console.log(user1, user2)