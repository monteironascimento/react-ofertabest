/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
  MdFavorite,
} from 'react-icons/md';

import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  ProductTable,
  EmptyCartContainer,
  LoadingIcon,
} from './styles';

export default function Cart() {

  const cart = useSelector(state =>  state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })))

  const updating = useSelector(state => state.updating);
  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Container>
      {cart.length ? (
        <ProductTable>
          <thead>
            <tr>
              <th />
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Subtotal</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <tr>
                <td>
                  <img src={product.image} alt={product.title} />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button type="button" onClick={() => decrement(product)}>
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>
                    <input type="number" readOnly value={product.amount} />
                    <button type="button" onClick={() => increment(product)}>
                      <MdAddCircleOutline size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
                <td>
                  {updating.id === product.id && updating.status ? (
                    <LoadingIcon color="#333" size={14} />
                  ) : (
                    <strong>{product.subtotal}</strong>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => dispatch(CartActions.removeFromCart(product.id))}
                  >
                    <MdDelete size={20} color="#7159c1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      ) : (
        <EmptyCartContainer>
          <MdFavorite color="#999" size={50} />
          <strong>Salve Suas Ofertas Favoritas</strong>
        </EmptyCartContainer>
      )}

    </Container>
  );
}
