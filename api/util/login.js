

function login(email, password, callback) {
    //sustituir valores
    const {MongoClient} = require("mongodb@3.1.4");
    const dbUser = "angelrojasm";
    const dbPwd = "{ATLAS-PWD}";
    const dbHost = "{ATLAS-HOST}";
    const dbName = "youtube-clone";
    const usersCollection = "{USER-COLLECTION}";
  
    const uri = `mongodb+srv://${dbUser}:${dbPwd}@${dbHost}/test?retryWrites=true`;
    const client = new MongoClient(uri, { useNewUrlParser: true });
  
    client.connect(err => {
      if (err) return callback(err);
  
      const collection = client.db(dbName).collection(usersCollection);
  
      collection.findOne({username: email, password}, (err, user) => {
        if (err) return callback(err);
        if (!user) return callback("User not found.");
  
        const profile  = {
          ...user,
          user_id: user.username
        };
        callback(null, profile);
        client.close();
      });
    });
  }