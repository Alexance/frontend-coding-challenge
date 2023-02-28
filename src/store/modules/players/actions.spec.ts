import { ActionHandler, ActionContext, Store } from "vuex";

import * as peopleApi from "@/api/peopleApi";
import { ApiCallStatus } from "@/constants/ApiCallStatus";
import { PlayerStatus } from "@/constants/PlayerStatus";

import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import actions from "./actions";

jest.mock("@/api/peopleApi");

describe("Given the `actions` object from 'Players' module", () => {
  // This is the partial mock of the store. Because it's too difficult to
  // test the whole data flow, this test just checks if everything was
  // pushed to the store (only focuses on business logic)
  const storeContext = {} as Store<{}>;
  const actionContext = {
    commit: jest.fn(),
    dispatch: jest.fn(),
    getters: {},
    rootGetters: {},
    rootState: {},
    state: {},
  } as ActionContext<{}, {}>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe(`when "${ActionTypes.FETCH_ALL_WINNERS}" is used`, () => {
    describe("and when the API works properly", () => {
      const successfulPeopleCallMock: Awaited<
        ReturnType<typeof peopleApi.getAll>
      > = [{ name: "Ava" }, { name: "Joseph" }];

      beforeAll(() => {
        jest
          .spyOn(peopleApi, "getAll")
          .mockResolvedValue(successfulPeopleCallMock);
      });

      describe("and when the action is dispatched", () => {
        beforeEach(() => {
          (
            actions[ActionTypes.FETCH_ALL_WINNERS] as ActionHandler<{}, {}>
          ).bind(storeContext)(actionContext);
        });

        it("should update the current winners", () => {
          expect(actionContext.commit).toHaveBeenCalledWith(
            MutationTypes.SET_ALL_WINNERS,
            successfulPeopleCallMock
          );
        });

        it("should set the request status to `successful`", () => {
          expect(actionContext.commit).toHaveBeenCalledWith(
            MutationTypes.SET_GET_WINNERS_REQUEST_STATUS,
            ApiCallStatus.SUCCESS
          );
        });
      });
    });

    describe("and when the API is not available", () => {
      const failedPeopleResponseError = new Error("Network error");

      beforeAll(() => {
        jest
          .spyOn(peopleApi, "getAll")
          .mockRejectedValue(failedPeopleResponseError);
      });

      describe("and when the action is dispatched", () => {
        beforeEach(() => {
          (
            actions[ActionTypes.FETCH_ALL_WINNERS] as ActionHandler<{}, {}>
          ).bind(storeContext)(actionContext);
        });

        it("should set the default value for winners", () => {
          expect(actionContext.commit).toHaveBeenCalledWith(
            MutationTypes.SET_ALL_WINNERS,
            []
          );
        });

        it("should set the request status to `failed`", () => {
          expect(actionContext.commit).toHaveBeenCalledWith(
            MutationTypes.SET_GET_WINNERS_REQUEST_STATUS,
            ApiCallStatus.FAILURE
          );
        });
      });
    });
  });

  describe(`when "${ActionTypes.VERIFY_WIN_STATUS}" is used`, () => {
    describe("and when the request to get all winners has failed", () => {
      const givenActionContext: ActionContext<{}, {}> = {
        ...actionContext,
        state: {
          getWinnersRequestStatus: ApiCallStatus.FAILURE,
        },
      };

      describe("and when the action is dispatched", () => {
        beforeEach(() => {
          (
            actions[ActionTypes.VERIFY_WIN_STATUS] as ActionHandler<{}, {}>
          ).bind(storeContext)(givenActionContext);
        });

        it("should NOT commit anything", () => {
          expect(givenActionContext.commit).not.toHaveBeenCalled();
        });
      });
    });

    describe("and when the given user is in the list of the winners", () => {
      const givenActionContext: ActionContext<{}, {}> = {
        ...actionContext,
        state: {
          getWinnersRequestStatus: ApiCallStatus.SUCCESS,
          user: {
            name: "Ava",
          },
          allWinners: [
            {
              name: "Ava",
            },
          ],
        },
      };

      describe("and when the action is dispatched", () => {
        beforeEach(() => {
          (
            actions[ActionTypes.VERIFY_WIN_STATUS] as ActionHandler<{}, {}>
          ).bind(storeContext)(givenActionContext);
        });

        it("should set the player status as a winner", () => {
          expect(givenActionContext.commit).toHaveBeenCalledWith(
            MutationTypes.SET_PLAYER_STATUS,
            PlayerStatus.WIN
          );
        });
      });
    });

    describe("and when the given user is NOT in the list of the winners", () => {
      const givenActionContext: ActionContext<{}, {}> = {
        ...actionContext,
        state: {
          getWinnersRequestStatus: ApiCallStatus.SUCCESS,
          user: {
            name: "Ava",
          },
          allWinners: [
            {
              name: "Joseph",
            },
          ],
        },
      };

      describe("and when the action is dispatched", () => {
        beforeEach(() => {
          (
            actions[ActionTypes.VERIFY_WIN_STATUS] as ActionHandler<{}, {}>
          ).bind(storeContext)(givenActionContext);
        });

        it("should set the player status as NOT a winner", () => {
          expect(givenActionContext.commit).toHaveBeenCalledWith(
            MutationTypes.SET_PLAYER_STATUS,
            PlayerStatus.NO_WIN
          );
        });
      });
    });
  });
});
