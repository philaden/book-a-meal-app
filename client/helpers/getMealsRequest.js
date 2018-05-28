import apiCall from '../helpers/axios';
import displayToast from '../helpers/displayToast';

const getMealsRequest = (userToken, action) => {
  return apiCall('/meals', 'get', null, userToken)
    .then((response) => {
      action(response.data.data, true);
    })
    .catch((err) => {
      action(err.response.data.message, false);
      return displayToast('error', err.response.data.message);
    });
};

export default getMealsRequest;
