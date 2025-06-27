import React from 'react';

const InventoryTable = ({ inventory }) => {
    return (
        <table className="w-full text-left border-collapse mt-6">
          <thead>
            <tr className="text-white text-lg border-b border-white">
              <th className="pb-2">Product</th>
              <th className="pb-2">SKU</th>
              <th className="pb-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id} className="text-white hover:bg-white/10 transition">
                <td className="py-2">{item.name}</td>
                <td className="py-2">{item.sku}</td>
                <td className="py-2">{item.current_stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
    );
};

export default InventoryTable;