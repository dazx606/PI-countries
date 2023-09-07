interface Home {
    readonly resident: { name: string, age: number }
}
let homeObje : Home = {
    resident:{
        name: 'Jhon',
        age:25
    }
}

homeObje.resident.age += 1;
console.log(homeObje)