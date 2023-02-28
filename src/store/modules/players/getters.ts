import { GetterTree } from "vuex";

import { RootState } from "@/store/state";
import { PlayerStatus } from "@/constants/PlayerStatus";

import { State } from "./state";
import { GetterTypes } from "./getter-types";

const getters: GetterTree<State, RootState> = {
  [GetterTypes.IS_PLAYER_STATUS_AVAILABLE]: (state) =>
    state.status !== PlayerStatus.NO_DETAILS,
};

export default getters;
