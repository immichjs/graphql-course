module.exports = {
  priceWithDiscount: (product) => product.discount
    ? product.price * (1 - product.discount)
    : product.price
}
