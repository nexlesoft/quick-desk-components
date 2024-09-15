import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Ticket,
  TicketStatus,
  TicketType,
} from "@nexle-soft/quick-desk-client";
import { Button, Form, Input, Select, Table } from "antd";
import { FC, useCallback, useEffect, useState } from "react";
import { useTicketState } from "./useTicketState";

import "./styles/index.scss";

export interface InputComponentProps {
  prefix?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
}

export interface SelectProps {
  options: TicketStatus[];
  value: string | number;
  onChange: (value: string | number) => void;
  style?: React.CSSProperties;
}

export interface TableProps {
  dataSource: Ticket[];
  columns: any[];
  pagination: any;
  onRow: (record: Ticket) => {
    onClick: () => void;
  };
}

export interface SupportProps {
  onClickCreateSupport: () => void;
  onClickToDetail: (id: string | number) => void;
  merchantEmail?: string;
  InputComponent?: FC<InputComponentProps | any>;
  SelectComponent?: FC<SelectProps | any>;
  TableComponent?: FC<TableProps | any>;
}

const Support = ({
  onClickCreateSupport,
  onClickToDetail,
  merchantEmail,
  InputComponent = Input,
  SelectComponent = Select,
  TableComponent = Table,
}: SupportProps) => {
  const [{ ticketApi, statusSettingApi }] = useTicketState();

  const [dataTicket, setDataTicket] = useState<Ticket[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [statusSelect, setStatusSelect] = useState<TicketStatus | null>(null);
  const [statusSetting, setStatusSetting] = useState<TicketStatus[]>([]);

  const getListTicket = useCallback(
    (search: string, status?: number, page: number = 1) => {
      ticketApi
        .getList({
          page,
          limit: 10,
          order: "created_date desc",
          f_type: TicketType.REQUEST,
          q: search,
          f_setting_status_id: status,
          f_merchant_email: merchantEmail,
        })
        .then((data) => {
          setDataTicket(data?.data?.items);
          setTotalRows(data?.data?.totalRows);
        });
    },
    [ticketApi, merchantEmail]
  );

  const handleClickSearch = () => {
    getListTicket(searchValue, statusSelect?.id);
  };

  const handleClickTicketSupportDetail = (row: Ticket) => {
    const id = row?.id;

    onClickToDetail(id);
  };
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "total",
      width: "15%",
      onCell: () => {
        return {
          style: {
            minWidth: 100,
          },
        };
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "total",
      width: "15%",
      onCell: () => {
        return {
          style: {
            minWidth: 100,
          },
        };
      },
    },
    {
      title: "Created date",
      dataIndex: "created_date",
      key: "total",
      width: "15%",
      onCell: () => {
        return {
          style: {
            minWidth: 100,
          },
        };
      },
    },
    {
      title: "Modified date",
      dataIndex: "modified_date",
      key: "total",
      width: "15%",
      onCell: () => {
        return {
          style: {
            minWidth: 100,
          },
        };
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "total",
      width: "15%",
      render: (row: { name: string }) => (
        <span className={`status-bg-${row?.name}`}>{row?.name}</span>
      ),
      onCell: () => {
        return {
          style: {
            minWidth: 100,
          },
        };
      },
    },
    {
      title: "Action",
      dataIndex: "total",
      key: "total",
      width: "15%",
      render: () => <span>{"View"}</span>,
      onCell: () => {
        return {
          style: {
            minWidth: 100,
          },
        };
      },
    },
  ];

  function showTotal(total: number, range: [number, number]) {
    return `${range.join("-")} of ${total}`;
  }
  const handleClickPageNumber = (page: number) => {
    getListTicket(searchValue, statusSelect?.id, page);
  };

  const config = {
    pagination: {
      className: "custom-pagination",
      showSizeChanger: false,
      total: totalRows,
      showTotal: (total: number, range: [number, number]) =>
        showTotal(total, range),
      onChange: (page: number) => handleClickPageNumber(page),
    },
  };

  useEffect(() => {
    getListTicket(searchValue, undefined);
    statusSettingApi.getListStatuses({ limit: -1 }).then((res) => {
      console.log(res, "status");
      if (res.success) {
        setStatusSetting(res?.data?.items);
      }
    });
  }, [getListTicket, searchValue, statusSettingApi]);

  return (
    <div className="filter filter__search">
      <div className="support-header">
        <div className="support-header-left">
          <h3>BeaHub Support</h3>
        </div>
        <div style={{ display: "flex", justifyContent: "end", gap: "1rem" }}>
          <Form.Item className="filter__search__input" name="search">
            <SelectComponent
              style={{ minWidth: "200px" }}
              options={
                statusSetting?.map((item: TicketStatus) => ({
                  id: item?.id,
                  name: item?.name,
                })) || []
              }
              value={statusSelect}
              onChange={(value: TicketStatus) => setStatusSelect(value)}
            />
          </Form.Item>
          <Form.Item className="filter__search__input" name="search">
            <InputComponent
              prefix={<SearchOutlined />}
              value={searchValue}
              onChange={(value: string) => setSearchValue(String(value))}
            />
          </Form.Item>

          <Button
            className="filter__search__submit"
            size="large"
            type="primary"
            onClick={() => handleClickSearch()}
          >
            Search
          </Button>

          <Button
            className="form__item"
            size="large"
            type="primary"
            shape="circle"
            onClick={onClickCreateSupport}
          >
            <PlusOutlined />
          </Button>
        </div>
      </div>

      <div>
        <TableComponent
          dataSource={dataTicket || []}
          columns={columns}
          pagination={config.pagination}
          onRow={(record: Ticket) => {
            return {
              onClick: () => handleClickTicketSupportDetail(record),
            };
          }}
        />
      </div>
    </div>
  );
};

export default Support;
