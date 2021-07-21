
module.exports = {
  sendUserInfo: async (req, res) => {
    //sendUserInfo 함수를 채워주세요
    return res.status(200).send('/userinfo/sendUserInfo 라우팅완료');
  },
  sendFollowingList: async (req,res)=>{
    //sendFollwingList 함수를 채워주세요
    return res.status(200).send('/userinf/following_list 라우팅완료');  
  },
  unRegister: async (req,res)=>{
    //unRegister함수를 채워주세요
    return res.status(200).send('/userinfo/unregister 라우팅완료')
  }
};