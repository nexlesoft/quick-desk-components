import { Route, Routes, useNavigate } from "react-router-dom";

import {
  ActivityLogApi,
  Configuration,
  MediaApi,
  TicketApi,
  TicketSettingStatusApi,
} from "@nexle-soft/quick-desk-client";
import { TicketDetail } from "../lib/components/TicketDetail";
import { CreateTicket, Support } from "../lib/main";

Configuration.getInstance({
  host: "https://be.quickdesk.demo.nexlesoft.com/api/v1",
  secretKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhdGlvbk5hbWUiOiJCZWFIdWIiLCJhcHBsaWNhdGlvbklkIjo3LCJ1c2VySWQiOjEsImlhdCI6MTcyNDkyNTQyNn0.8qvPyuDJr1OQEY1iicsxzFF9rzFdFMbiXlbZxNzzeMM",
});

const ticketApi = new TicketApi();
const mediaApi = new MediaApi();
const activityLog = new ActivityLogApi();
const statusSettingApi = new TicketSettingStatusApi();

function App() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCreateTicket = () => {
    navigate("/create-ticket");
  };

  const handleTicketDetail = (id: number | string) => {
    navigate(`/ticket-detail/${id}`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div>Test library update</div>

            <div className="card">
              <Support
                onClickCreateSupport={handleCreateTicket}
                onClickToDetail={handleTicketDetail}
                ticketApi={ticketApi}
                statusSettingApi={statusSettingApi}
              />
            </div>
          </>
        }
      />

      <Route
        path="/create-ticket"
        element={
          <CreateTicket
            onGoBack={handleGoBack}
            ticketApi={ticketApi}
            mediaApi={mediaApi}
          />
        }
      />

      <Route
        path="/ticket-detail/:id"
        element={
          <TicketDetail
            onGoBack={handleGoBack}
            ticketApi={ticketApi}
            mediaApi={mediaApi}
            activityLog={activityLog}
            userInfo={{
              avatar: "avatarLink",
              merchantEmail: "merchantEmail@yopmail.com",
            }}
          />
        }
      />
    </Routes>
  );
}

export default App;
