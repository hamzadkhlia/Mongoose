const express = require("express");
const dbConnection = require("./config/dbConnection");
const Person = require("./model/Person");

const createPerson = async () => {
try {
    const person = new Person({
    name: "John",
    age: 47,
    favoriteFoods: ["spageti", "pizza"],
    });
    await person.save();
    console.log("Person added successfully");
} catch (error) {
    console.log(error);
}
};
//createPerson()
const arrayOfPeople = [
{ name: "John", age: 47, favoriteFoods: ["spageti", "pizza"] },
{ name: "Jane", age: 32, favoriteFoods: ["sushi", "Humburger"] },
{ name: "Jim", age: 27, favoriteFoods: ["burritos", "potatoes"] },
];

const createPeople = async () => {
try {
    const people = await Person.create(arrayOfPeople);
    console.log("People created and saved");
} catch (error) {
    console.error(error);
}
};
//createPeople()
const findPeopleByName = async () => {
try {
    const people = await Person.find({ name: "John" });
    console.log(people);
} catch (error) {
    console.error(error);
}
};
//findPeopleByName()
const findPersonByFavoriteFood = async () => {
try {
    const person = await Person.findOne({ favoriteFoods: "spageti" });
    console.log(person);
} catch (error) {
    console.error(error);
}
};
//findPersonByFavoriteFood()
const findPersonById = async () => {
try {
    const person = await Person.findById("63db770d63e8391a91fc902f");
    console.log(person);
} catch (error) {
    console.error(error);
}
};
// findPersonById()
const updatePersonById = async () => {
try {
    const person = await Person.findById("63db770d63e8391a91fc902f");
    person.favoriteFoods.push("Humburger");
    person.markModified("favoriteFoods");
    await person.save();
} catch (error) {
    console.error(error);
}
};
//updatePersonById()
const updatePersonByName = async () => {
try {
    const updatedPerson = await Person.findOneAndUpdate(
    { name: "Jim" },
    { age: 27 },
    { new: true }
    );
    return updatedPerson;
} catch (error) {
    console.error(error);
}
};
// updatePersonByName()
const deletePersonById = async () => {
try {
    await Person.findByIdAndRemove("63db770d63e8391a91fc902f");
} catch (error) {
    console.error(error);
}
};
//deletePersonById()
const deletePeopleByName = async () => {
try {
    const result = await Person.remove({ name: "John" });
    return result;
} catch (error) {
    console.error(error);
}
};
//deletePeopleByName()
const findPeopleWhoLikeBurritos = async () => {
try {
    const people = await Person.find({ favoriteFoods: "sushi" })
    .sort({ name: 1 })
    .limit(2)
    .select("age")
    .exec();
    return people;
} catch (error) {
    console.error(error);
}
};
//findPeopleWhoLikeBurritos()
const app = express();
require("dotenv").config();
console.log(process.env.MONGO_URI);

dbConnection();
const port = 5000;

app.listen(port, (err) =>
err ? console.log(err) : console.log(`app listening on port ${port}!`)
);