import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { EMPLOYEE_ROOT_PATH } from './constants';
import { listPage, newPage } from '../../libs/utils/crud.util';
import ListPage from './ListPage';
import EditPage from './EditPage';
import CreatePage from './CreatePage';

const MAIN_PATH = EMPLOYEE_ROOT_PATH;

function EmployeePage() {
  return (
    <Switch>
      <Route exact path={`${newPage(MAIN_PATH)}`} component={CreatePage} />
      <Route exact path={`${MAIN_PATH}/:id/edit`} component={EditPage} />
      <Route path={`${listPage(MAIN_PATH)}`} component={ListPage} />
    </Switch>
  );
}

EmployeePage.propType = {};

EmployeePage.defaultProps = {};

export default EmployeePage;
