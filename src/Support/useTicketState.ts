
import { Configuration, TicketApi, MediaApi, ActivityLogApi, TicketSettingStatusApi } from '@nexle-soft/quick-desk-client';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserInfo } from 'containers/Auth/authSelectors';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const stateSelector = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
});

Configuration.getInstance({
  host: 'https://be.quickdesk.demo.nexlesoft.com/api/v1',
  secretKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhdGlvbk5hbWUiOiJCZWFIdWIiLCJhcHBsaWNhdGlvbklkIjo3LCJ1c2VySWQiOjEsImlhdCI6MTcyNDkyNTQyNn0.8qvPyuDJr1OQEY1iicsxzFF9rzFdFMbiXlbZxNzzeMM',
});
const ticketApi = new TicketApi();
const mediaApi = new MediaApi();
const activityLog = new ActivityLogApi();
const statusSettingApi = new TicketSettingStatusApi();

export const useTicketState = () => {
  const history = useHistory();
  const { userInfo } = useSelector(stateSelector);
  return [
    {
      ticketApi,
      userInfo,
      mediaApi,
      history,
      activityLog,
      statusSettingApi
    }
  ] as const;
};
