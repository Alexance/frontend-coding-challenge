import { MutationTree } from "vuex";

import { State } from "./state";
import { MutationTypes } from "./mutation-types";

const mutations: MutationTree<State> = {
  [MutationTypes.SET_USER_NAME](state: State, name: State["user"]["name"]) {
    state.user.name = name;
  },

  [MutationTypes.SET_ALL_WINNERS](state: State, winners: State["allWinners"]) {
    state.allWinners = winners;
  },

  [MutationTypes.SET_TODAY_WINNERS](
    state: State,
    winners: State["todayWinners"]
  ) {
    state.todayWinners = winners;
  },

  [MutationTypes.SET_YESTERDAY_WINNERS](
    state: State,
    winners: State["yesterdayWinners"]
  ) {
    state.yesterdayWinners = winners;
  },

  [MutationTypes.SET_PLAYER_STATUS](state: State, status: State["status"]) {
    state.status = status;
  },

  [MutationTypes.ADD_TODAY_WINNER](
    state: State,
    winner: State["todayWinners"][number]
  ) {
    state.todayWinners.push(winner);
  },

  [MutationTypes.SET_GET_WINNERS_REQUEST_STATUS](
    state: State,
    status: State["getWinnersRequestStatus"]
  ) {
    state.getWinnersRequestStatus = status;
  },
};

export default mutations;
