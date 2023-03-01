import { ActionTree } from "vuex";

import { RootState } from "@/store/state";
import { getAll } from "@/api/peopleApi";
import { PlayerStatus } from "@/constants/PlayerStatus";
import { ApiCallStatus } from "@/constants/ApiCallStatus";
import { WINNERS_PER_DAY_LIMIT } from "@/constants/GameSettings";

import { State } from "./state";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { GetterTypes } from "./getter-types";

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
   * Check if the user is eligible to play game
   *
   * @param context Action context
   */
  [ActionTypes.CHECK_USER_ELIGIBILITY]({ commit, state, getters }) {
    // Check if the limit of winners is not exceeded
    const isLimitExceeded = state.todayWinners.length === WINNERS_PER_DAY_LIMIT;

    if (isLimitExceeded) {
      commit(MutationTypes.SET_PLAYER_STATUS, PlayerStatus.LIMIT_EXCEEDED);
      return;
    }

    // Check if the current user is a winner already
    const isDuplicate = getters[GetterTypes.IS_PLAYER_DUPLICATE];

    if (isDuplicate) {
      commit(MutationTypes.SET_PLAYER_STATUS, PlayerStatus.DUPLICATE);
    }
  },

  /**
   * Check if the user is winner or not
   *
   * @param context Action context
   */
  async [ActionTypes.VERIFY_WIN_STATUS]({ commit, dispatch, getters, state }) {
    commit(MutationTypes.SET_PLAYER_STATUS, PlayerStatus.NO_DETAILS);
    dispatch(ActionTypes.CHECK_USER_ELIGIBILITY);

    const isUserEligible = state.status === PlayerStatus.NO_DETAILS;

    if (!isUserEligible) {
      return;
    }

    await dispatch(ActionTypes.FETCH_ALL_WINNERS);

    if (state.getWinnersRequestStatus !== ApiCallStatus.SUCCESS) {
      return;
    }

    const isUserWinner = getters[GetterTypes.IS_PLAYER_WINNER];
    const winStatus = isUserWinner ? PlayerStatus.WIN : PlayerStatus.NO_WIN;

    commit(MutationTypes.SET_PLAYER_STATUS, winStatus);
  },

  /**
   * Switch day context to the next one
   *
   * @param context Action context
   */
  [ActionTypes.SWITCH_TO_THE_NEXT_DAY]({ commit, state }) {
    const { todayWinners } = state;

    commit(MutationTypes.SET_YESTERDAY_WINNERS, todayWinners);
    commit(MutationTypes.SET_TODAY_WINNERS, []);
  },
};

export default actions;
