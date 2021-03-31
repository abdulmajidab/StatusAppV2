class StatusClassModel {
  userId=String;
  userName=String;
  lastStatusTime= String;
  status=[];

  constructor(data) {
    this.userId = data.userId;
    this.userName = data.userName;
    this.lastStatusTime = data.lastStatusTime;
    this.status = [new StatusItemModel(data.status[0])];
  }
}

class StatusItemModel {
  image= String;
  message=String;
  seenUsers= [{}];
  time=String;

  constructor(data) {
    this.image = data.image;
    this.message = data.message;
    this.seenUsers = [data.seenUsers[0]];
    this.time = data.time;
  }
}

class UserModel {
  userId=String;

  constructor(seenUsers) {
    this.userId = seenUsers.userId;
  }
}
module.exports=StatusClassModel
module.exports=StatusItemModel
module.exports=UserModel