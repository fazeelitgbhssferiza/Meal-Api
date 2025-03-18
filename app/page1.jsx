"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { ProductCard } from "./components/product-card"

export default function App() {
  const [products, setProducts] = useState(null)
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)

  const getData = async (apiUrl) => {
    setLoading(true)
    try {
      const products = await axios.get(`http://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`)
      setProducts(products.data)
    } catch (error) {
      setErr(error instanceof Error ? "Invalid URL or internet connection" : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData(apiUrl)
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    )
  }

  if (err) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Error!: {err}</h1>
      </div>
    )
  }

  if (!products || !products.length) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Products not found yet!</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Total Products: {products.length}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

