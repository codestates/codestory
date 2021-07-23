
module.exports = {
  follow: async (req, res) => {
    //follow 함수를 채워주세요.
    return res.status(200).send('/follow 라우팅완료');
  },
  unFollow: async (req, res) => {
    //unFollow 함수를 채워주세요.
    return res.status(200).send('/unFollow 라우팅완료');
  },
  sendFollowingList: async (req, res) => {
    //sendFollowingList 함수를 채워주세요.
    return res.status(200).send('/sendFollowingList 라우팅완료');
  },
};