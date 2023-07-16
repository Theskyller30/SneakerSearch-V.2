import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from './CartItem'
import { convertPrice } from '../utils'
import { clearCart } from '../store/actions/cart'
import { makeOrder } from '../store/actions/order'

export default function Cart({ show, cart, total, handleShowCart }) {
  const dispatch = useDispatch()
  const [orderDone, setOrderDone] = useState(false)
  const orders = useSelector(({order}) => order)
  const order = { id: orders.length + 1, order: [...cart]}
  const cartItems = cart.map((item) => <CartItem key={item.id} item={item} />)

  const handleOrder = () => {
    dispatch(makeOrder(order))
    setOrderDone(true)
    dispatch(clearCart())
  }

  const doneOrder = () => {
    handleShowCart()
    setOrderDone(false)
  }

  const EmptyCart = () => {
    return (
      <div className="cart__info">
        <img className="cart__info-img" src="/assets/images/box.svg" alt="El carrito esta vacío" />
        <span className="cart__info-title">El carrito esta vacío</span>
        <p className="cart__info-text">Añade un sneakers para realizar un pedido.</p>
      </div>
    )
  }

  const CartOrder = () => {
    return (
      <div className="cart__info">
        <img className="cart__info-img" src="/assets/images/order.svg" alt="Заказ оформлен!" />
        <span className="cart__info-title cart__info-title--green">¡Se proceso tu compra!</span>
        <p className="cart__info-text">Pedido #{order.id - 1} Pronto serán enviados tus sneakers.</p>
        <button className="cart__info-btn btn" onClick={doneOrder}>Cerrar</button>
      </div>
    )
  }

  const CartContent = () => {
    return (
      <>
        <div className="cart__list">
          {cartItems}
        </div>
        <div className="cart__footer">
          <div className="cart__total">
            <div className="cart__total-price">
              <span>Precio:</span>
              <div className="cart__total-separator"></div>
              <span>{convertPrice(total)} Cop</span>
            </div>
            <div className="cart__total-tax">
              <span>Iva 19%:</span>
              <div className="cart__total-separator"></div>
              <span>{convertPrice(((total / 100) * 19).toFixed(0))} Cop.</span>
            </div>
          </div>
          <button className="cart__checkout btn btn--forward" onClick={handleOrder}>Realizar pedido</button>
        </div>
      </>
    )
  }

  return (
    <div className="cart" style={{ display: show ? 'block' : 'none' }}>
      <div className="cart__inner">
        <div className="cart__heading">
          <span className="cart__title">Carrito</span>
          <button className="cart__close" onClick={handleShowCart}>
            <img className="cart__close-img" src="/assets/images/icons/close.svg" alt="Закрыть" />
          </button>
        </div>
        <div className="cart__content">
          {cart.length === 0 && !orderDone ? <EmptyCart /> : cart.length !== 0 && !orderDone ? <CartContent /> : <CartOrder />}
        </div>
      </div>
    </div>
  )
}
