export const state = () =>({
    q_data:[],
    ans_data:[],
    score :0,
    successUrl:"",
    totalQNum : 5,
    debug:true,
    interval:2,
    answerTime:20,
});

export const mutations = {
    addQ(state,q_text)
    {
        state.q_data.push(q_text)
    },
    addAns(state,q_ans)
    {
        state.ans_data.push(q_ans)
    },
    clearData(state)
    {
        state.q_data = [];
        state.q_ans = [];
        state.score = 0;
        state.successUrl="";
    },
    setScore(state,num)
    {
        state.score = num;
    },
    setImgName(state, imgName)
    {
        state.successUrl = imgName;
    },
    setTotalQuizNum(state, num)
    {
        state.totalQNum = num;
    },
    setDebug(state, flag)
    {
        state.debug = flag;
    },
    setInterval(state,time)
    {
        state.interval = time;
    },
    setAnswerTime(state, time)
    {
        state.answerTime = time;
    }


}

export const getters={
    getAll(state){
        return state.q_data;
    },

    getQ_data : state =>(num) =>
    {
        return state.q_data[num];
    },
    getAns_data : state => (num) =>
    {
        return state.ans_data[num];
    },
    getQCount :state =>
    {
        return state.totalQNum; 
    },
    getImgName : state =>
    {
        return state.successUrl;
    },
    getScore : state =>
    {
        return state.score;
    },
    getDebug : state =>
    {
        return state.debug;
    },
    getInterval : state =>
    {
        return state.interval;
    },
    getAnswerTime : state =>
    {
        return state.answerTime;
    }
}