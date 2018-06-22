import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import addMealAction from '../../action/addMealAction';
import { ADD_MEAL_SUCCESS, ADD_MEAL_FAILURE } from '../../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('addMeal action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates ADD_MEAL_SUCCESS when the meal is added', (done) => {
    moxios.stubRequest('/meals', {
      status: 201,
      response: {
        data: { message: 'Meal added successfully' },
      },
    });

    const expectedActions = [
      { type: ADD_MEAL_SUCCESS, payload: true },
    ];

    const store = mockStore({});

    store.dispatch(addMealAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });

  it('creates ADD_MEAL_FAILURE when the meal is not added', (done) => {
    moxios.stubRequest('/meals', {
      status: 400,
      response: {
        data: { message: 'Invalid token' },
      },
    });

    const expectedActions = [
      { type: ADD_MEAL_FAILURE, payload: false },
    ];

    const store = mockStore({ });

    store.dispatch(addMealAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
  });
});
