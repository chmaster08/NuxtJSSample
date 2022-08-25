export const state = () =>({
    q_data:[],
    ans_data:[],
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
        return state.q_data.length; 
    }
}