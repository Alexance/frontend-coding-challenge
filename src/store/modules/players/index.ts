import { Module } from "vuex";

import { RootState } from "@/store/state";
import { PlayerStatus } from "@/constants/PlayerStatus";
import { ApiCallStatus } from "@/constants/ApiCallStatus";

import { GetterTypes } from "./getter-types";
import { MutationTypes } from "./mutation-types";
import { ActionTypes } from "./action-types";
import { State } from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const storeModule: Module<State, RootState> = {
  state: (): State => ({
    user: {
      name: "",
    },
    todayWinners: [],
    allWinners: [],
    status: PlayerStatus.NO_DETAILS,
    getWinnersRequestStatus: ApiCallStatus.NOT_AVAILABLE,
  }),

  getters,
  mutations,
  actions,
};

export { State, GetterTypes, MutationTypes, ActionTypes };
export default storeModule;
