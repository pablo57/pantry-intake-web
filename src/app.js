import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addMember } from './actions/members';

const store = configureStore();

const fakeData = [
    {
      id: 1234,
      householdId: 1000,
      lastName: 'Jones',
      firstName: 'John',
      DOB: '10-23-1987',
      isAdult: true,
      isHeadOfHousehold: true,
      active: true
    },
    {
      id: 1235,
      householdId: 1000,
      lastName: 'Jones',
      firstName: 'Sarah',
      DOB: '09-12-1993',
      isAdult: true,
      isHeadOfHousehold: false,
      active: true
    },
    {
      id: 9876,
      householdId: 2002,
      lastName: 'Maxwell',
      firstName: 'Max',
      DOB: '03-56-1986',
      isAdult: true,
      isHeadOfHousehold: true,
      active: true
    }
  ];

  store.dispatch(addMember(fakeData[0]));
  store.dispatch(addMember(fakeData[1]));
  store.dispatch(addMember(fakeData[2]));
  
  const state = store.getState();
  console.log(state);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
