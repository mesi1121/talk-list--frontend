export const state = {
  talkLists: [],
  selectedTalkList: {}
}

export const getters = {}

export  const mutations = {
  setTalkLists(state, payload) {
    state.talkLists = payload
  },
  setSelectedTalkList(state, payload) {
    state.selectedTalkList = payload
  }
}

export const actions = {
  async index ({ dispatch, commit }) {
    return await dispatch(
      'http/get',
      {
        url: `/api/talkLists`
      },
      {
        root: true
      },
    ).then((res) => {
      commit('setTalkLists', res.data)
      return res
    })
  },
  show ({ dispatch, commit }, id) {
    return dispatch(
      'http/get',
      {
        url: '/api/talkLists/' + id
      },
      {
        root: true
      },
    )
  },
  async store ({ dispatch, commit }, data) {
    return await dispatch(
      'http/post',
      {
        url: '/api/talkLists',
        data
      },
      {
        root: true
      }
    ).then((res) => {
      commit('setTalkLists', res.data)
      return res.status
    })
  },
  update ({ dispatch }, talkList) {
    const id = talkList.id
    const data = talkList.data
    return dispatch(
      'http/put',
      {
        url: '/api/talkLists/' + id,
        data
      },
      {
        root: true
      }
    )
  },
  delete ({ dispatch }, id) {
    dispatch(
      'http/delete',
      {
        url: '/api/talkLists/' + id
      },
      {
        root: true
      }
    ).then(() => {
      dispatch('index')
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
