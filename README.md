# Quick Desk Components Library

This library provides reusable components for managing tickets and support systems in your React applications.

## Installation

To install the library, run:

```bash
npm install @nexle-soft/quick-desk-components
```
or with Yarn:

```bash
yarn add @nexle-soft/quick-desk-components
```

## Components Overview

### 1. CreateTicket Component

This component is used for creating a new ticket. It requires APIs to handle ticket creation and media uploads.

**Props:**
- `onGoBack: () => void` - Callback function to handle the back navigation.
- `merchantEmail?: string` - Optional merchant email for pre-filling.
- `ticketApi: TicketApi` - Instance of the TicketApi to manage ticket operations.
- `mediaApi: MediaApi` - Instance of the MediaApi for handling media attachments.

```typescript
import { Configuration, CreateTicket, TicketApi, MediaApi } from '@nexle-soft/quick-desk-components';

Configuration.getInstance({
    host: "https://your-api@domain",
    secretKey: "Your secret key",
});

const ticketApi = new TicketApi();
const mediaApi = new MediaApi();

const YourComponent = () = {
  return (
    <CreateTicket
      merchantEmail="merchant@example.com"
      onGoBack={() => console.log('Go back')}
      ticketApi={ticketApi}
      mediaApi={mediaApi}
    />;
  )
}
```

### 2. Support Component

The Support component provides an interface for displaying and managing support tickets. It supports custom input, select, and table components.

**Props:**

* `onClickCreateSupport: () => void` - Callback for handling the creation of support tickets.
* `onClickToDetail: (id: string | number)` => void - Callback to navigate to a specific ticket detail.
* `merchantEmail?: string` - Optional merchant email for pre-filling.
* `InputComponent?: FC<InputComponentProps | any>` - Custom input component for searching.
* `SelectComponent?: FC<SelectProps | any>` - Custom select component for filtering ticket status.
* `TableComponent?: FC<TableProps | any>` - Custom table component for displaying ticket data.
* `title?: ReactNode` - Custom title for the support section.
* `style?: React.CSSProperties` - Custom styles for the component.
* `searchText?: ReactNode` - Custom search text or search component.
* `wrapperProps?: any` - Additional props for the component wrapper.
* `ticketApi: TicketApi` - Instance of the TicketApi for managing ticket operations.
* `statusSettingApi: TicketSettingStatusApi` - Instance of the TicketSettingStatusApi for managing ticket statuses.
* `columns?: any[]` - Custom columns configuration for the table.

```typescript
import { Configuration, Support, TicketApi, TicketSettingStatusApi } from '@nexle-soft/quick-desk-components';

Configuration.getInstance({
    host: "https://your-api@domain",
    secretKey: "Your secret key",
});

const ticketApi = new TicketApi();
const statusSettingApi = new TicketSettingStatusApi();

const YourComponent = () = {
  return (
    <Support
      onClickCreateSupport={() => console.log('Create Support')}
      onClickToDetail={(id) => console.log(`Go to detail: ${id}`)}
      merchantEmail="merchant@example.com"
      ticketApi={ticketApi}
      statusSettingApi={statusSettingApi}
      columns={[
              { title: 'Ticket ID', dataIndex: 'id', key: 'id' },
      { title: 'Status', dataIndex: 'status', key: 'status' },
      ]}
    />;
  )
}
```

### 3.TicketDetail Component

This component displays detailed information about a specific ticket and its activity log.

**Props:**

* `onGoBack: () => void` - Callback to handle back navigation.
* `ticketApi: TicketApi` - Instance of the TicketApi for ticket operations.
* `mediaApi: MediaApi` - Instance of the MediaApi for handling media attachments.
* `activityLog: ActivityLogApi` - Instance of the ActivityLogApi for displaying the activity log.
* `userInfo: any` - Information about the current user viewing the ticket.


```typescript
import { Configuration, TicketDetail, TicketApi, MediaApi, ActivityLogApi } from '@nexle-soft/quick-desk-components';

Configuration.getInstance({
    host: "https://your-api@domain",
    secretKey: "Your secret key",
});

const ticketApi = new TicketApi();
const mediaApi = new MediaApi();
const activityLog = new ActivityLogApi();

const YourComponent = () = {
  return (
    <TicketDetail
      onGoBack={() => console.log('Go back')}
      ticketApi={ticketApi}
      mediaApi={mediaApi}
      activityLog={activityLog}
      userInfo={{ id: 1, name: 'John Doe' }}
    />;
  )
}
```
