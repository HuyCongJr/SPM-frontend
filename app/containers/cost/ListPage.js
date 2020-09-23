import React from 'react';
import { Route } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import Filter from './components/Filter';
import TableActionColumns from '../../components/ListWidget/TableActionColumn';
import {
  deletePage,
  deletePagePattern,
  editPage,
  newPage,
} from '../../libs/utils/crud.util';
import PageTitle from '../Layout/PageTitle';
import {
  COST_ROOT_PATH,
  COST_PAYMENT_PATH,
  COST_RECEIPT_PATH,
} from './constants';
import apiCost from '../../libs/apis/cost.api';
import CreateButton from '../../components/button/CreateButton';
import ListWidget from '../../components/ListWidget';
import Widget from '../../components/Widget/Widget';
import DeleteConfirmModal from '../../components/modal/DeleteConfirmModal';
import Price from '../../components/common/Price';
import {
  CreatedByColumn,
  SORT_DIR,
} from '../../components/ListWidget/constants';

const ROOT_PATH = COST_ROOT_PATH;

const ListPage = ({ history }) => {
  const columns = React.useMemo(
    () => [
      {
        header: 'Type',
        data: 'type',
        sort: {
          name: 'type',
        },
        width: '1px',
        render: row =>
          row.type === 1 ? (
            <span className="badge badge-success">RECEIPT</span>
          ) : (
            <span className="badge badge-danger">PAYMENT</span>
          ),
      },
      {
        header: 'Name',
        data: 'name',
        width: '20%',
      },
      {
        header: <span className="text-nowrap">Total Amount</span>,
        data: 'amount',
        render: row => <Price amount={row.amount} />,
        sort: {
          name: 'amount',
        },
        class: 'min text-right',
      },
      {
        header: 'Remark',
        data: 'remark',
      },
      CreatedByColumn,
      {
        header: 'Action',
        data: '',
        class: 'action',
        render: row => (
          <TableActionColumns
            onEdit={() => {
              history.push(
                editPage(
                  row.type === 1 ? COST_RECEIPT_PATH : COST_PAYMENT_PATH,
                  row.id,
                ),
              );
            }}
            onDelete={() => {
              history.push(deletePage(ROOT_PATH, row.id));
            }}
          />
        ),
      },
    ],
    [],
  );
  const toDate = new Date();
  const prevDate = new Date();
  prevDate.setDate(new Date().getDate() - 7);
  const search = { search: '', startDate: prevDate, endDate: toDate };

  const actions = (
    <>
      <CreateButton
        className="mr-2 btn-raised"
        onClick={() => {
          history.push(newPage(COST_PAYMENT_PATH));
        }}
      >
        Payment Voucher
      </CreateButton>
      <CreateButton
        className="btn-raised"
        onClick={() => {
          history.push(newPage(COST_RECEIPT_PATH));
        }}
        color="warning"
      >
        Receipt Voucher
      </CreateButton>
    </>
  );

  const deleteConfirmDialog = React.useMemo(
    () => (
      <Route
        path={deletePagePattern(ROOT_PATH)}
        render={({
          match: {
            params: { id },
          },
        }) => (
          // match === null
          <DeleteConfirmModal
            id={id}
            deleteApi={apiCost.remove}
            readApi={apiCost.read}
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(`Delete Cost ${item.name} Success`);
              }
            }}
            title="Delete Cost?"
            message={row => {
              if (!row) return '';
              return `Are you sure to delete ${row.name} ?`;
            }}
          />
        )}
      />
    ),
    [],
  );
  return (
    <>
      <PageTitle title="Cost Management" actions={actions} />
      <Widget>
        <ListWidget
          deleteDialog={deleteConfirmDialog}
          columns={columns}
          fetchData={apiCost.search}
          initFilter={search}
          initPage={1}
          initSize={10}
          initSorts={{ createdDate: SORT_DIR.DESC }}
        >
          <Filter data={search} />
        </ListWidget>
      </Widget>
    </>
  );
};

ListPage.propTypes = {
  history: PropTypes.any,
};
export default ListPage;
