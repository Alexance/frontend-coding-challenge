import { ActionTree } from "vuex";

import { RootState } from "@/store/state";
import { getAll } from "@/api/peopleApi";
import { PlayerStatus } from "@/constants/PlayerStatus";
import { ApiCallStatus } from "@/constants/ApiCallStatus";

import { State } from "./state";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";

const actions: ActionTree<State, RootState> = {
  /**
   * Fetch all users from API
   *
   * @param context Action context
   */
  async [ActionTypes.FETCH_ALL_WINNERS]({ commit }) {
    commit(
      MutationTypes.SET_GET_WINNERS_REQUEST_STATUS,
      ApiCallStatus.NOT_AVAILABLE
    );

    try {
      const winners = await getAll();

      commit(MutationTypes.SET_ALL_WINNERS, winners);
      commit(
        MutationTypes.SET_GET_WINNERS_REQUEST_STATUS,
        ApiCallStatus.SUCCESS
      );
    } catch (error) {
      commit(MutationTypes.SET_ALL_WINNERS, []);
      commit(
        MutationTypes.SET_GET_WINNERS_REQUEST_STATUS,
        ApiCallStatus.FAILURE
      );
    }
  },

  /**
   * Check if the user is winner or not
   *
   * @param context Action context
   */
  async [ActionTypes.VERIFY_WIN_STATUS]({ commit, dispatch, state }) {
    await dispatch(ActionTypes.FETCH_ALL_WINNERS);

    if (state.getWinnersRequestStatus !== ApiCallStatus.SUCCESS) {
      return;
    }

    const isUserWinner = state.allWinners.some(
      (winner) => winner.name === state.user.name
    );
    const winStatus = isUserWinner ? PlayerStatus.WIN : PlayerStatus.NO_WIN;

    commit(MutationTypes.SET_PLAYER_STATUS, winStatus);
  },
};

export default actions;
