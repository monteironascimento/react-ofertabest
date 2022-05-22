/* eslint-disable no-shadow */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { formatPrice } from '../../util/format';

import {
  updateAmountRequest,
  removeFromCart,
} from '../../store/modules/cart/actions';

import BottomBar from '../../components/BottomBar';
import {
  EmptyCart,
  EmptyBox,
  Title,
  Message,
  Button,
  ButtonText,
  Container,
  Box,
  Product,
  ProductInfo,
  ProductTitle,
  ProductPrice,
  ProductOrderInfo,
  ProductAmountControl,
  ProductAmountButton,
  ProductAmount,
  ProductSubtotal,
  ProductImage,
  ProductRemove,
} from './styles';

const Cart = ({ navigation }) => {
  const products = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
      formattedPrice: formatPrice(product.price),
    }))
  );
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce(
        (total, product) => total + product.price * product.amount,
        0
      )
    )
  );

  const dispatch = useDispatch();

  const decrement = product =>
    dispatch(updateAmountRequest(product.id, product.amount - 1));
  const increment = product =>
    dispatch(updateAmountRequest(product.id, product.amount + 1));
  const removeProduct = id => dispatch(removeFromCart(id));

  if (products.length) {
    return (
      <>
        <Container>
          <Box>
            {products.map((product, index) => (
              <Product key={product.id} last={index === products.length - 1}>
                <ProductImage source={{ uri: product.image }} />
                <ProductInfo>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductPrice>{product.formattedPrice}</ProductPrice>
                  <ProductRemove onPress={() => removeProduct(product.id)}>
                    <Icon name="delete-forever" size={28} color="#999" />
                  </ProductRemove>
                </ProductInfo>
                <ProductOrderInfo>
                  <ProductAmountControl>
                    <ProductAmountButton onPress={() => decrement(product)}>
                      <Icon
                        name="remove-circle-outline"
                        size={22}
                        color="#7159c1"
                      />
                    </ProductAmountButton>
                    <ProductAmount>{product.amount}</ProductAmount>
                    <ProductAmountButton onPress={() => increment(product)}>
                      <Icon
                        name="add-circle-outline"
                        size={22}
                        color="#7159c1"
                      />
                    </ProductAmountButton>
                  </ProductAmountControl>
                  <ProductSubtotal>{product.subtotal}</ProductSubtotal>
                </ProductOrderInfo>
              </Product>
            ))}
          </Box>
        </Container>
        <BottomBar
          empty={false}
          totalValue={total}
          buttonTitle="FINALIZAR"
          buttonIcon="payment"
        />
      </>
    );
  }

  return (
    <EmptyCart>
      <EmptyBox empty>
        <Icon name="remove-shopping-cart" color="#7159C1" size={128} />
        <Title>CARRINHO VAZIO :(</Title>
        <Message>Você não possui produtos em seu carrinho.</Message>
        <Button onPress={() => navigation.pop()}>
          <ButtonText>IR PARA PRODUTOS</ButtonText>
        </Button>
      </EmptyBox>
    </EmptyCart>
  );
};

export default Cart;
