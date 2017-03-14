var Datastore = require('nedb')

var bd = {}

bd.users = new Datastore({filename:'./database/bd'})

bd.users.loadDatabase( err => {
  
  /*
  bd.users.update({login:'serg',pass:1234},
                  {login:'serg',pass:4321},
                  {}, (err, numAffected, affectedDocuments, upsert) => {
    console.log(err, numAffected, affectedDocuments, upsert)
  })
  */

  /*
  bd.users.find({login:'serg'}, (err, docs) => {
    console.log(docs)
  })
  */
  
  /*
  bd.users.insert({login:'serg', pass:1234}, (err, docs) => {
    console.log(err, newDocs)
  })
  */
  
})