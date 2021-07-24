require('dotenv').config();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
);


const followerRouter = require('./Router/FollowerRouter');
const gameRouter = require('./Router/GameRouter');
const rankingRouter = require('./Router/RankingRouter');
const signInRouter = require('./Router/SignInRouter');
const signOutRouter = require('./Router/SignOutRouter');
const userRouter=require('./Router/UserRouter');
const oauthRouter=require('./Router/OauthRouter');
const HTTPS_PORT = process.env.HTTPS_PORT || 80;

app.use('/follower', followerRouter);
app.use('/game', gameRouter);
app.use('/ranking', rankingRouter);
app.use('/signin', signInRouter);
app.use('/signout', signOutRouter);
app.use('/user',  userRouter);
app.use('/oauth', oauthRouter);
app.get('/',(req,res)=>{
  res.json('Hello World!');
});




// 인증서 파일들이 존재하는 경우에만 https 프로토콜을 사용하는 서버를 실행합니다. 
// 만약 인증서 파일이 존재하지 않는경우, http 프로토콜을 사용하는 서버를 실행합니다.
// 파일 존재여부를 확인하는 폴더는 서버 폴더의 package.json이 위치한 곳입니다.
let server;
if(fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')){

  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log('server runnning'));

} else {
  server = app.listen(HTTPS_PORT, () => {
    console.log(`[RUN] Server... | http://localhost:${HTTPS_PORT}`);
  });
}
module.exports = server;
