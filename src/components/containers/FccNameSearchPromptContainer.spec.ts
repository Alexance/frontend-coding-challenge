import { reactive } from "vue";
import { Store } from "vuex";
import { shallowMount } from "@vue/test-utils";

import { key } from "@/store";
import { RootState } from "@/store/state";
import { ApiCallStatus } from "@/constants/ApiCallStatus";
import { PlayerStatus } from "@/constants/PlayerStatus";
import FccModalLucky from "@/components/ui/modals/FccModalLucky.vue";

import FccNameSearchPromptContainer from "./FccNameSearchPromptContainer.vue";
import { MutationTypes } from "@/store/modules/players";

describe("Given the `FccNameSearchPromptContainer` component", () => {
  // This mock should be defined as a common one and moved to
  // a separate test utility function or component
  const storeMock: Store<RootState> = {
    commit: jest.fn(),
    dispatch: jest.fn(),
    getters: {},
    hasModule: jest.fn().mockReturnValue(true),
    hotUpdate: jest.fn(),
    install: jest.fn(),
    registerModule: jest.fn(),
    replaceState: jest.fn(),
    state: reactive({
      players: {
        allWinners: [
          {
            name: "Ava",
          },
        ],
        getWinnersRequestStatus: ApiCallStatus.NOT_AVAILABLE,
        status: PlayerStatus.NO_DETAILS,
        todayWinners: [],
        yesterdayWinners: [],
        user: {
          name: "Ava",
        },
      },
    }),
    subscribe: jest.fn(),
    subscribeAction: jest.fn(),
    watch: jest.fn(),
    unregisterModule: jest.fn(),
  };
  const render = () =>
    shallowMount(FccNameSearchPromptContainer, {
      global: {
        provide: {
          // There is type mismatch issue in the library.
          // It doesn't allow to pass the Injection Key (Symbol)
          [key as any]: storeMock,
        },
      },
    });
  let wrapper: ReturnType<typeof render>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when it is rendered", () => {
    beforeEach(() => {
      wrapper = render();
    });

    describe("when the user is a winner", () => {
      beforeAll(() => {
        storeMock.state.players.status = PlayerStatus.WIN;
      });

      describe("and when a user rejects the prompt", () => {
        beforeEach(() => {
          wrapper
            .findComponent<typeof FccModalLucky>(
              '[data-test="fcc-modal-lucky"]'
            )
            // This direct component instance access fixes @vue/test-utils
            // issue when it returns the parent component by the selector,
            // not a correct child
            .getComponent(FccModalLucky)
            .vm.$emit("reject");
        });

        it("should close the window", () => {
          expect(storeMock.commit).toHaveBeenCalledWith(
            MutationTypes.SET_PLAYER_STATUS,
            PlayerStatus.NO_DETAILS
          );
        });

        it("should keep the name is in field", () => {
          expect(storeMock.commit).not.toHaveBeenCalledWith(
            MutationTypes.SET_USER_NAME,
            expect.any(String)
          );
        });
      });

      describe("and when a user accepts the prompt", () => {
        beforeEach(() => {
          wrapper
            .findComponent<typeof FccModalLucky>(
              '[data-test="fcc-modal-lucky"]'
            )
            // This direct component instance access fixes @vue/test-utils
            // issue when it returns the parent component by the selector,
            // not a correct child
            .getComponent(FccModalLucky)
            .vm.$emit("accept");
        });

        it("should close the window", () => {
          expect(storeMock.commit).toHaveBeenCalledWith(
            MutationTypes.SET_PLAYER_STATUS,
            PlayerStatus.NO_DETAILS
          );
        });

        it("should wipe the name field value", () => {
          expect(storeMock.commit).toHaveBeenCalledWith(
            MutationTypes.SET_USER_NAME,
            expect.any(String)
          );
        });

        it("should add the player to the list of the winners", () => {
          expect(storeMock.commit).toHaveBeenCalledWith(
            MutationTypes.ADD_TODAY_WINNER,
            storeMock.state.players.allWinners[0]
          );
        });
      });
    });

    describe("when the user is NOT a winner", () => {
      beforeAll(() => {
        storeMock.state.players.status = PlayerStatus.NO_WIN;
      });

      it("should match the snapshot", () => {
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });
});
