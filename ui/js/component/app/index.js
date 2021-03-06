import React from "react";
import { connect } from "react-redux";
import { selectCurrentModal } from "selectors/app";
import {
  doCheckUpgradeAvailable,
  doOpenModal,
  doAlertError,
  doRecordScroll,
} from "actions/app";
import { doUpdateBalance } from "actions/wallet";
import { selectWelcomeModalAcknowledged } from "selectors/app";
import rewards from "rewards";
import {
  selectFetchingRewards,
  makeSelectHasClaimedReward,
} from "selectors/rewards";
import { selectUser } from "selectors/user";
import App from "./view";
import * as modals from "constants/modal_types";

const select = (state, props) => {
  const selectHasClaimed = makeSelectHasClaimedReward();

  return {
    modal: selectCurrentModal(state),
    isWelcomeAcknowledged: selectWelcomeModalAcknowledged(state),
    isFetchingRewards: selectFetchingRewards(state),
    isWelcomeRewardClaimed: selectHasClaimed(state, {
      reward_type: rewards.TYPE_NEW_USER,
    }),
    user: selectUser(state),
  };
};

const perform = dispatch => ({
  alertError: errorList => dispatch(doAlertError(errorList)),
  checkUpgradeAvailable: () => dispatch(doCheckUpgradeAvailable()),
  openWelcomeModal: () => dispatch(doOpenModal(modals.WELCOME)),
  updateBalance: balance => dispatch(doUpdateBalance(balance)),
  recordScroll: scrollPosition => dispatch(doRecordScroll(scrollPosition)),
});

export default connect(select, perform)(App);
