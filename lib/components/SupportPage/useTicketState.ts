import {
  ActivityLogApi,
  MediaApi,
  TicketApi,
  TicketSettingStatusApi,
} from "@nexle-soft/quick-desk-client";

export const useTicketState = () => {
  const ticketApi = new TicketApi();
  const mediaApi = new MediaApi();
  const activityLog = new ActivityLogApi();
  const statusSettingApi = new TicketSettingStatusApi();

  return [
    {
      ticketApi,
      mediaApi,
      activityLog,
      statusSettingApi,
    },
  ] as const;
};
