export async function listProducts() {
  const res = await fetch('http://localhost:3001/products')
  const data = await res.json()
  console.log(data)
  return data
}
