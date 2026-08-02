'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  TrendingUp,
  PackageCheck,
  Clock,
  PlusCircle,
  Activity,
  Boxes,
  Database,
  ExternalLink,
} from 'lucide-react';

interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: string;
  createdAt?: string;
}

const API_URL = 'http://localhost:3000';

export default function Dashboard() {
  const queryClient = useQueryClient();
  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(10000);

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API_URL}/orders`);
        return res.data;
      } catch {
        return [];
      }
    },
    refetchInterval: 3000,
  });

  const createOrderMutation = useMutation({
    mutationFn: async (newOrder: { customerId: string; items: OrderItem[] }) => {
      const res = await axios.post(`${API_URL}/orders`, newOrder);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setCustomerId('');
      setProductId('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId || !productId) return;

    createOrderMutation.mutate({
      customerId,
      items: [
        {
          productId,
          quantity: Number(quantity),
          unitPrice: Number(unitPrice),
        },
      ],
    });
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'PENDING').length;
  const totalRevenue = orders.reduce((acc, order) => {
    const orderTotal = order.items?.reduce(
      (sub, item) => sub + item.quantity * item.unitPrice,
      0,
    ) || 0;
    return acc + orderTotal;
  }, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">Nexus-Analytics</h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-Time Enterprise Operational Control
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="http://localhost:3000/api/docs"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition"
          >
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            Swagger API Docs
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
          <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            NestJS Engine Active
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Total Pedidos</p>
              <h3 className="text-2xl font-bold text-white mt-1">{totalOrders}</h3>
            </div>
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Boxes className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Pedidos Pendientes</p>
              <h3 className="text-2xl font-bold text-amber-400 mt-1">{pendingOrders}</h3>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Ingresos Totales</p>
              <h3 className="text-2xl font-bold text-emerald-400 mt-1">
                ${totalRevenue.toLocaleString('es-CL')}
              </h3>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 h-fit">
            <div className="flex items-center gap-2 mb-4">
              <PlusCircle className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-semibold text-white">
                Emitir Nueva Orden
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  ID Cliente
                </label>
                <input
                  type="text"
                  placeholder="Ej: CUST-2001"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  ID Producto
                </label>
                <input
                  type="text"
                  placeholder="Ej: PROD-SERVICIOS"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Precio Unitario ($)
                  </label>
                  <input
                    type="number"
                    step="1000"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={createOrderMutation.isPending}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-medium text-sm rounded-lg transition"
              >
                {createOrderMutation.isPending
                  ? 'Procesando en Backend...'
                  : 'Crear Orden'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base font-semibold text-white">
                  Monitoreo de Ordenes Registradas
                </h2>
              </div>
              <span className="text-xs text-slate-400">
                Sincronización autom. cada 3s
              </span>
            </div>

            {isLoading ? (
              <div className="py-12 text-center text-slate-500 text-sm">
                Cargando datos desde la API...
              </div>
            ) : orders.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-sm border border-dashed border-slate-800 rounded-lg">
                No hay órdenes registradas. Emite una desde el formulario.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="text-xs uppercase bg-slate-950/60 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3">ID Orden</th>
                      <th className="px-4 py-3">Cliente</th>
                      <th className="px-4 py-3">Items</th>
                      <th className="px-4 py-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-800/30">
                        <td className="px-4 py-3 font-mono text-indigo-400 font-medium">
                          {order.id}
                        </td>
                        <td className="px-4 py-3">{order.customerId}</td>
                        <td className="px-4 py-3">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="text-xs text-slate-400">
                              {item.productId} x{item.quantity} ($
                              {(item.quantity * item.unitPrice).toLocaleString('es-CL')})
                            </div>
                          ))}
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}