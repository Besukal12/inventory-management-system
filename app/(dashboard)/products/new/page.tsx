"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
    lowStockAt: "",
    categoryId: "",
    supplierId: "",
    isActive: "true",
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [saving, setSaving] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setStatus("idle");
    setMessage("");

    const response = await fetch("/api/products/create_Product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name.trim(),
        sku: form.sku.trim(),
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity, 10),
        lowStockAt: parseInt(form.lowStockAt, 10),
        categoryId: form.categoryId,
        supplierId: form.supplierId,
        isActive: form.isActive === "true",
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setStatus("success");
      setMessage(result.message || "Product created successfully.");
      router.push("/products");
    } else {
      setStatus("error");
      setMessage(result.message || result.error || "Failed to create product.");
    }

    setSaving(false);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch("/api/categories/get_category",
          { method: "GET", headers: { "Content-Type": "application/json" } }
        )
        if (!response.ok) {
          throw new Error("Failed to fetch categories")
        }

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    const loadSuppliers = async () => {
      try {
        const response = await fetch("/api/supplier/get_supplier");
        if (!response.ok) {
          throw new Error("Failed to fetch suppliers");
        }
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error("Failed to fetch suppliers", error);
      }
    };

    loadCategories();
    loadSuppliers();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/products" className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Product</h1>
          <p className="text-muted-foreground">Add a new product to your catalog.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Product Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="e.g. Wireless Mouse"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">SKU</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="e.g. WM-001"
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Price ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="0.00"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Initial Stock</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="0"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Low Stock Alert</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  placeholder="5"
                  name="lowStockAt"
                  value={form.lowStockAt}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Category</label>
                <select
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none appearance-none bg-white"
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Supplier</label>
                <select
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none appearance-none bg-white"
                  name="supplierId"
                  value={form.supplierId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Active</label>
                <select
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none appearance-none bg-white"
                  name="isActive"
                  value={form.isActive}
                  onChange={handleChange}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Link 
                href="/products"
                className="px-6 py-3 rounded-full font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 px-6 py-3 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Product"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
