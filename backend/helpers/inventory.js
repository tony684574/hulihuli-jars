function getSignedQuantity(movementType, quantity) {
  const inbound = ['restock', 'return', 'disperse_in'];
  const outbound = ['sale', 'adjustment', 'disperse_out'];

  if (!inbound.includes(movementType) && !outbound.includes(movementType)) {
    throw new Error(`Invalid movement type: ${movementType}`);
  }

  if (isNaN(quantity) || quantity <= 0) {
    throw new Error('Quantity must be a positive number');
  }

  const absQty = Math.abs(quantity);
  return inbound.includes(movementType) ? absQty : -absQty;
}

module.exports = {
  getSignedQuantity,
};
