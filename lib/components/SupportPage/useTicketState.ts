import {
  ActivityLogApi,
  Configuration,
  MediaApi,
  TicketApi,
  TicketSettingStatusApi,
} from "@nexle-soft/quick-desk-client";

Configuration.getInstance({
  host: "https://be.quickdesk.demo.nexlesoft.com/api/v1",
  secretKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhdGlvbk5hbWUiOiJCZWFIdWIiLCJhcHBsaWNhdGlvbklkIjo3LCJ1c2VySWQiOjEsImlhdCI6MTcyNDkyNTQyNn0.8qvPyuDJr1OQEY1iicsxzFF9rzFdFMbiXlbZxNzzeMM",
});
const ticketApi = new TicketApi();
const mediaApi = new MediaApi();
const activityLog = new ActivityLogApi();
const statusSettingApi = new TicketSettingStatusApi();

export const useTicketState = () => {
  return [
    {
      ticketApi,
      mediaApi,
      activityLog,
      statusSettingApi,
    },
  ] as const;
};
