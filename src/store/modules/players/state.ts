import { Person } from "@/models/Person";
import { PlayerStatus as PlayerStatus } from "@/constants/PlayerStatus";
import { ApiCallStatus } from "@/constants/ApiCallStatus";

export interface State {
  /**
   * Current user information
   */
  user: {
    name: string;
  };
  /**
   * The list of all winners
   */
  allWinners: Person[];
  /**
   * The list of today's winners
   */
  todayWinners: Person[];
  /**
   * If the given user is a winner or has another player status
   */
  status: PlayerStatus;
  /**
   * The status of the request to get all winners
   */
  getWinnersRequestStatus: ApiCallStatus;
}
