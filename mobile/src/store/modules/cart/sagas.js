import {
  call,
  select,
  put,
  all,
  takeLatest,
  takeEvery,
  delay,
} from 'redux-saga/effects';
import { Alert } from 'react-native';

import { formatPrice } from '../../../util/format';
import api from '../../../services/api';

import {
  addToCartSuccess,
  updateAmountSuccess,
  updateAmountFailure,
} from './actions';

function* addToCart({ id }) {
  yield delay(500);

  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    Alert.alert('PRODUTO ESGOTADO', 'A quantidade em estoque acabou!');
    yield put(updateAmountFailure(id));
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    Alert.alert('PRODUTO ESGOTADO', 'A quantidade em estoque acabou!');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeEvery('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
