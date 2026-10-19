'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Product, OrderStatus, Gender, GarmentSilhouette } from '@/types';
import {
  X,
  Plus,
  Package,
  ShoppingBag,
  TrendingUp,
  AlertCircle,
  Edit2,
  Check,
  Save,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    theme,
    products,
    orders,
    isAdminOpen,
    setIsAdminOpen,
    addProduct,
    updateProduct,
    updateOrderStatus,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'analytics'>('products');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form states
  const [newName, setNewName] = useState('');
  const [newBanglaName, setNewBanglaName] = useState('');
  const [newGender, setNewGender] = useState<Gender>('men');
  const [newCategory, setNewCategory] = useState('panjabi');
  const [newSubCategory, setNewSubCategory] = useState('Embroidered Panjabi');
  const [newPrice, setNewPrice] = useState(4500);
  const [newStock, setNewStock] = useState(15);
  const [newFabric, setNewFabric] = useState('100% Fine Handloom Cotton');
  const [newSilhouette, setNewSilhouette] = useState<GarmentSilhouette>('panjabi-straight');

  if (!isAdminOpen) return null;

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setEditPrice(p.price);
    setEditStock(p.stock);
  };

  const saveEdit = (id: string) => {
    updateProduct(id, { price: editPrice, stock: editStock });
    setEditingId(null);
  };

  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newProd: Product = {
      id: `${newGender[0]}-${Date.now().toString().slice(-4)}`,
      name: newName.trim(),
      banglaName: newBanglaName.trim() || undefined,
      gender: newGender,
      category: newCategory,
      subCategory: newSubCategory,
      price: Number(newPrice),
      rating: 5.0,
      reviewsCount: 1,
      stock: Number(newStock),
      isNewArrival: true,
      collection: 'regular',
      colors: [
        {
          name: newGender === 'men' ? 'Forest Green' : 'Royal Crimson',
          hex: newGender === 'men' ? '#17382F' : '#6B1D2F',
        },
      ],
      sizes: newGender === 'men' ? ['38', '40', '42', '44'] : ['38', '40', '42'],
      fabric: newFabric,
      weavingOrWork: 'Handcrafted Heritage Weave',
      description: 'Exclusive artisanal garment created at the ISMAIL FASHION design studio.',
      careInstructions: ['Dry clean or cold hand wash'],
      silhouetteType: newSilhouette,
      patternDetail: 'Fine tonal geometric detailing',
      details: {
        weaveOrigin: 'Dhaka Atelier, Bangladesh',
      },
    };

    addProduct(newProd);
    setShowAddModal(false);
    setNewName('');
    setNewBanglaName('');
  };

  // Metrics
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.finalTotal, 0);
  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={() => setIsAdminOpen(false)} />

      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-stone-200 z-10 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-bold tracking-wider text-[#D4B779]">
              ISMAIL FASHION
            </span>
            <span className="text-xs uppercase tracking-widest text-stone-400 font-bangla">
              ইসমাইল ফ্যাশন অ্যাডমিন কনসোল
            </span>
            <span className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded">
              Demo Environment
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="p-1 rounded-md text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Notice Banner */}
        <div className="px-6 py-2 bg-amber-50 border-b border-amber-200/80 text-[11px] text-amber-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>
            <strong>Local Storage Mode:</strong> Product changes and order status updates are stored in your current browser session. Connect to a production database (e.g. Firebase / Postgres) when deploying.
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-stone-200 flex items-center justify-between bg-stone-50 text-xs font-medium">
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`py-3 transition-colors relative cursor-pointer ${
                activeTab === 'products'
                  ? 'text-stone-900 font-bold border-b-2 border-stone-900'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Inventory &amp; Pricing ({products.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`py-3 transition-colors relative cursor-pointer ${
                activeTab === 'orders'
                  ? 'text-stone-900 font-bold border-b-2 border-stone-900'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Customer Orders ({orders.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`py-3 transition-colors relative cursor-pointer ${
                activeTab === 'analytics'
                  ? 'text-stone-900 font-bold border-b-2 border-stone-900'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Store Metrics Overview
            </button>
          </div>

          {activeTab === 'products' && (
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="my-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Garment</span>
            </button>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: PRODUCTS INVENTORY */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                      <th className="py-2.5">Garment Details</th>
                      <th>Collection</th>
                      <th>Category</th>
                      <th>Price (৳ BDT)</th>
                      <th>Stock Units</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {products.map((p) => {
                      const isEditing = editingId === p.id;
                      return (
                        <tr key={p.id} className="hover:bg-stone-50/70">
                          <td className="py-3 pr-4">
                            <span className="font-semibold text-stone-900 block">{p.name}</span>
                            <span className="text-[10px] text-stone-600 block">{p.fabric}</span>
                          </td>
                          <td className="capitalize">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                                p.gender === 'men'
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-rose-50 text-rose-800 border border-rose-200'
                              }`}
                            >
                              {p.gender}&apos;s Wear
                            </span>
                          </td>
                          <td className="text-stone-600">{p.subCategory}</td>
                          <td className="tabular-nums font-semibold">
                            {isEditing ? (
                              <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(Number(e.target.value))}
                                className="w-20 px-2 py-1 border border-stone-300 rounded text-xs"
                              />
                            ) : (
                              `৳${p.price.toLocaleString()}`
                            )}
                          </td>
                          <td className="tabular-nums">
                            {isEditing ? (
                              <input
                                type="number"
                                value={editStock}
                                onChange={(e) => setEditStock(Number(e.target.value))}
                                className="w-16 px-2 py-1 border border-stone-300 rounded text-xs"
                              />
                            ) : (
                              <span
                                className={
                                  p.stock <= 5 ? 'text-amber-600 font-bold' : 'text-stone-700'
                                }
                              >
                                {p.stock} units
                              </span>
                            )}
                          </td>
                          <td className="text-right">
                            {isEditing ? (
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  type="button"
                                  onClick={() => saveEdit(p.id)}
                                  className="p-1.5 text-emerald-600 hover:text-emerald-800"
                                  title="Save"
                                >
                                  <Save className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingId(null)}
                                  className="p-1.5 text-stone-400 hover:text-stone-600"
                                  title="Cancel"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => startEdit(p)}
                                className="p-1.5 text-stone-500 hover:text-stone-900 inline-flex items-center gap-1 text-[11px]"
                              >
                                <Edit2 className="w-3.5 h-3.5" /> Edit
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOMER ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-xl border border-stone-200/90 bg-white space-y-3 shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100">
                      <div>
                        <span className="font-mono text-xs font-bold text-stone-900 mr-2">
                          #{ord.id}
                        </span>
                        <span className="text-xs text-stone-600">
                          by <strong>{ord.customerName}</strong> ({ord.phoneNumber})
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-stone-600">Status:</span>
                        <select
                          value={ord.status}
                          onChange={(e) =>
                            updateOrderStatus(ord.id, e.target.value as OrderStatus)
                          }
                          className="text-xs border border-stone-200 rounded px-2 py-1 bg-stone-50 cursor-pointer font-medium"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
                      <div>
                        <span className="font-semibold text-stone-800 block mb-0.5">
                          Delivery Address:
                        </span>
                        <p>
                          {ord.address}, {ord.district} ({ord.deliveryZone})
                        </p>
                        {ord.orderNotes && (
                          <p className="text-[11px] text-stone-500 italic mt-1">
                            Notes: &ldquo;{ord.orderNotes}&rdquo;
                          </p>
                        )}
                      </div>

                      <div>
                        <span className="font-semibold text-stone-800 block mb-0.5">
                          Items &amp; Payment:
                        </span>
                        <ul className="space-y-0.5">
                          {ord.items.map((it, i) => (
                            <li key={i}>
                              {it.productName} ({it.colorName}, {it.size}) x{it.quantity} — ৳
                              {(it.price * it.quantity).toLocaleString()}
                            </li>
                          ))}
                        </ul>
                        <div className="pt-1 mt-1 border-t border-stone-100 flex justify-between font-bold text-stone-900">
                          <span>Total Amount:</span>
                          <span className="tabular-nums">৳{ord.finalTotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ANALYTICS OVERVIEW */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl border border-stone-200 bg-stone-50 space-y-1">
                  <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Total Recorded Sales
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                    ৳{totalRevenue.toLocaleString()}
                  </h4>
                  <p className="text-[10px] text-stone-600">Across {orders.length} orders</p>
                </div>

                <div className="p-5 rounded-xl border border-stone-200 bg-stone-50 space-y-1">
                  <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">
                    <ShoppingBag className="w-3.5 h-3.5 text-amber-600" /> Pending Processing
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                    {pendingCount}
                  </h4>
                  <p className="text-[10px] text-stone-600">Awaiting atelier packaging</p>
                </div>

                <div className="p-5 rounded-xl border border-stone-200 bg-stone-50 space-y-1">
                  <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">
                    <Package className="w-3.5 h-3.5 text-red-600" /> Low Stock Alerts
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                    {lowStockCount}
                  </h4>
                  <p className="text-[10px] text-stone-600">Garments with ≤ 5 units left</p>
                </div>
              </div>

              <div className="p-4 bg-stone-100 rounded-xl text-xs text-stone-600 space-y-1">
                <h5 className="font-semibold text-stone-800">Production Integration Guide</h5>
                <p>
                  To hook up this frontend with real database collections, configure Firebase Firestore or a PostgreSQL database using AI Studio integration skills.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Add Product Modal Sub-view */}
        {showAddModal && (
          <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="font-serif text-lg font-semibold text-stone-900">
                  Add New Traditional Garment
                </h4>
                <X
                  className="w-4 h-4 cursor-pointer text-stone-500"
                  onClick={() => setShowAddModal(false)}
                />
              </div>

              <form onSubmit={handleAddNewProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Garment Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Imperial Silk Wedding Panjabi"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Bangla Name</label>
                  <input
                    type="text"
                    placeholder="e.g. রয়েল সিল্ক ওয়েডিং পাঞ্জাবি"
                    value={newBanglaName}
                    onChange={(e) => setNewBanglaName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md font-serif"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Collection</label>
                    <select
                      value={newGender}
                      onChange={(e) => setNewGender(e.target.value as Gender)}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="men">Men&apos;s Collection</option>
                      <option value="women">Women&apos;s Collection</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      {newGender === 'men' ? (
                        <>
                          <option value="panjabi">Panjabi</option>
                          <option value="kabli-kurta">Kabli &amp; Kurta</option>
                          <option value="waistcoats">Waistcoats (Koti)</option>
                          <option value="pajama-sets">Pajama Sets</option>
                        </>
                      ) : (
                        <>
                          <option value="sarees">Sarees</option>
                          <option value="three-piece">Three Piece</option>
                          <option value="kurtis">Kurtis</option>
                          <option value="hijab-dupatta">Hijab &amp; Dupatta</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Price in BDT (৳) *</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Stock Count *</label>
                    <input
                      type="number"
                      required
                      value={newStock}
                      onChange={(e) => setNewStock(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Fabric Specifications</label>
                  <input
                    type="text"
                    value={newFabric}
                    onChange={(e) => setNewFabric(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 py-1.5 border rounded-md text-stone-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-stone-900 text-white rounded-md font-semibold"
                  >
                    Add to Catalog
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
