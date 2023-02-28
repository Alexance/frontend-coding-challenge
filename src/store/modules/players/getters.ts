import { GetterTree } from "vuex";

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
};

export default getters;
