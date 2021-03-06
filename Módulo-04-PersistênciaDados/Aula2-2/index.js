const MongoClient = require('mongodb').MongoClient;
const uri = '<LINK_MONGODB_ATLAS>';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(async (err) => {
  const collectionDB = client.db('grades').collection('students');

  const documents = await collectionDB.find().toArray();

  console.log(documents);

  const databaseList = await client.db().admin().listDatabases();

  console.log('Databases: ');

  databaseList.databases.forEach((db) => {
    console.log(` - ${db.name}`);
  });

  client.close();
});
