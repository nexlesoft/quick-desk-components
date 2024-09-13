import { Button, Col, Form, Row, Table, Typography } from 'antd';
import CustomInput from 'components/BasicControlInput/CustomInput';
import CustomSelect from 'components/BasicControlInput/CustomSelect';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from 'translations/messages';
import { SearchOutlined } from '@ant-design/icons';
import { checkPermission } from 'utils/common';
import { MENU_ID } from 'containers/App/constants';
import { PlusCharacter } from 'styles/icon-components';
import { TableListWrapper } from 'containers/CustomerList/styles';
import { RoutePaths } from 'containers/App/routes';
import { BackIcon } from './assets/icons/iconBack';
import './styles/index.scss';
import { useTicketState } from './useTicketState';
import { Ticket, TicketType, TicketStatus } from '@nexle-soft/quick-desk-client';

const Support = props => {
  const { intl } = props;

  const [{ ticketApi, userInfo, history, statusSettingApi }] = useTicketState();

  const handleClickCreateSupport = () => {
    history.push(RoutePaths.createTicketSupport);
  };

  const [dataTicket, setDataTicket] = useState<Ticket[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [statusSelect, setStatusSelect] = useState(null);
  const [statusSetting, setStatusSetting] = useState<TicketStatus[]>([]);

  const getListTicket = (search, status, page = 1) => {
    ticketApi
      .getList({
        page,
        limit: 10,
        order: 'created_date desc',
        f_type: TicketType.REQUEST,
        q: search,
        f_setting_status_id: status,
        f_merchant_email: userInfo?.profile?.merchantEmail,
      })
      .then(data => {
        setDataTicket(data?.data?.items);
        setTotalRows(data?.data?.totalRows);
      });
  };

  const handleClickSearch = () => {
    getListTicket(searchValue, statusSelect);
  };

  const handleClickTicketSupportDetail = row => {
    const id = row?.id;
    const path = RoutePaths.ticketSupportDetail.replace(':id', id);
    history.push(path);
  };
  const columns = [
    {
      title: <Typography.Text ellipsis>{intl.formatMessage({ ...messages.ticketId })}</Typography.Text>,
      dataIndex: 'code',
      key: 'total',
      width: '15%',
      onCell: () => {
        return {
          style: {
            minWidth: 100,
          },
        };
      },
    },
    {
      title: <Typography.Text ellipsis>{intl.formatMessage({ ...messages.ticketTitle })}</Typography.Text>,
      dataIndex: 'name',
      key: 'total',
      width: '15%',
      onCell: () => {
        return {
          style: {
            minWidth: 100,
          },
        };
      },
    },
    {
      title: <Typography.Text ellipsis>{intl.formatMessage({ ...messages.requestDate })}</Typography.Text>,
      dataIndex: 'created_date',
      key: 'total',
      width: '15%',
      onCell: () => {
        return {
          style: {
            minWidth: 100,
          },
        };
      },
    },
    {
      title: <Typography.Text ellipsis>{intl.formatMessage({ ...messages.updatedDate })}</Typography.Text>,
      dataIndex: 'modified_date',
      key: 'total',
      width: '15%',
      onCell: () => {
        return {
          style: {
            minWidth: 100,
          },
        };
      },
    },
    {
      title: <Typography.Text ellipsis>{intl.formatMessage({ ...messages.status })}</Typography.Text>,
      dataIndex: 'status',
      key: 'total',
      width: '15%',
      render: text => <span className={`status-bg-${text?.name}`}>{text?.name}</span>,
      onCell: () => {
        return {
          style: {
            minWidth: 100,
          },
        };
      },
    },
    {
      title: <Typography.Text ellipsis>{intl.formatMessage({ ...messages.action })}</Typography.Text>,
      dataIndex: 'total',
      key: 'total',
      width: '15%',
      render: text => <span>{'View'}</span>,
      onCell: () => {
        return {
          style: {
            minWidth: 100,
          },
        };
      },
    },
  ];

  function showTotal(total, range) {
    return `${range.join('-')} of ${total}`;
  }
  const handleClickPageNumber = page => {
    getListTicket(searchValue, statusSelect, page);
  };

  const config = {
    pagination: {
      className: 'custom-pagination',
      showSizeChanger: false,
      total: totalRows,
      showTotal: (total, range) => showTotal(total, range),
      onChange: (page, pageSize) => handleClickPageNumber(page),
    },
  };

  useEffect(() => {
    getListTicket(searchValue, undefined);
    statusSettingApi.getListStatuses({limit: -1}).then(res => {
      console.log(res, 'status')
      if (res.success) {
        setStatusSetting(res?.data?.items)
      }
    })
  }, []);

  return (
    <div className="filter filter__search">
      <div className="support-header">
        <div className="support-header-left">
          <h3>
            BeaHub Support
          </h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'end', gap: '1rem' }}>
          <Form.Item className="filter__search__input" name="search">
            <CustomSelect
              style={{ minWidth: '200px' }}
              floatLabel
              items={statusSetting?.map((item: any) => ({id: item?.id, name: item?.name})) || []}
              labelName={'Status'}
              value={statusSelect}
              onChange={value => setStatusSelect(value)}
            />
          </Form.Item>
          <Form.Item className="filter__search__input" name="search">
            <CustomInput
              forceFloat={Boolean(searchValue)}
              labelName={intl.formatMessage(messages.search)}
              prefix={<SearchOutlined />}
              value={searchValue}
              onChange={value => setSearchValue(String(value))}
            />
          </Form.Item>

          <Button className="filter__search__submit" size="large" type="primary" onClick={() => handleClickSearch()}>
            <FormattedMessage {...messages.search} />
          </Button>

          <Button className="form__item" size="large" type="primary" shape="circle" onClick={handleClickCreateSupport}>
            <PlusCharacter />
          </Button>
        </div>
      </div>

      <TableListWrapper>
        <Table
          dataSource={dataTicket || []}
          columns={columns}
          pagination={config.pagination}
          onRow={record => {
            return {
              onClick: () => handleClickTicketSupportDetail(record),
            };
          }}
        />
      </TableListWrapper>
    </div>
  );
};
export default injectIntl(Support);
