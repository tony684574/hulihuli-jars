export async function createSale(saleData) {
    const response = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleData)
    });

    if (!response.ok) throw new Error('Failed to create sale');
    return response.json();
}