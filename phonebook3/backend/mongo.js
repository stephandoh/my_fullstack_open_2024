const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Usage: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = encodeURIComponent(process.argv[2])
const name = process.argv[3]
const number = process.argv[4]

// Proper connection string (no data fields inside it)
const url = `mongodb+srv://fullstack:${password}@cluster0.lrvpj3r.mongodb.net/phoneApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name && number) {
  // If name and number are provided, SAVE a new entry
  const person = new Person({ name, number })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  // If only password is provided, FETCH all entries
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(p => console.log(`${p.name} ${p.number}`))
    mongoose.connection.close()
  })
}