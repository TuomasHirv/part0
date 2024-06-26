const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const url = process.env.MONGODB_URI

console.log('connecting to mongoDB')
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const personSchema = new mongoose.Schema({
    name: {
      type:String,
      minlength:3,
      required:true
    },
    number: {
      type:String,
      minlength:8,
      required:true
    }
  })
  
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
console.log("person model loaded!!!!!")
module.exports = mongoose.model('Person', personSchema)
