import { GetterTree } from "vuex";

import { Person } from "@/models/Person";
import { RootState } from "@/store/state";
import { PlayerStatus } from "@/constants/PlayerStatus";
import { ApiCallStatus } from "@/constants/ApiCallStatus";

import { State } from "./state";
import { GetterTypes } from "./getter-types";

const getters: GetterTree<State, RootState> = {
  [GetterTypes.IS_PLAYER_STATUS_AVAILABLE]: (state) =>
    state.status !== PlayerStatus.NO_DETAILS,

  [GetterTypes.IS_WINNERS_REQUEST_FAILED]: (state) =>
    state.getWinnersRequestStatus === ApiCallStatus.FAILURE,

  [GetterTypes.GET_CURRENT_PLAYER_FROM_COLLECTION]:
    (state) => (collection: Person[]) => {
      const name = state.user.name.trim().toLowerCase();
      const player = collection.find(
        (item) => item.name.toLowerCase() === name
      );

      return player;
    },

  [GetterTypes.GET_WINNER]: (state, getters) => {
    return getters[GetterTypes.GET_CURRENT_PLAYER_FROM_COLLECTION](
      state.allWinners
    );
  },

  [GetterTypes.IS_PLAYER_WINNER]: (_state, getters) =>
    !!getters[GetterTypes.GET_WINNER],

  [GetterTypes.IS_PLAYER_DUPLICATE]: (state, getters) => {
    const isTodayWinner = !!getters[
      GetterTypes.GET_CURRENT_PLAYER_FROM_COLLECTION
    ](state.todayWinners);
    const isYesterdayWinner = !!getters[
      GetterTypes.GET_CURRENT_PLAYER_FROM_COLLECTION
    ](state.yesterdayWinners);

    return isTodayWinner || isYesterdayWinner;
  },
};

export default getters;
