import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
  items: [],
  isOpen: false,

  // ── Drawer Controls ──────────────────────────────
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  // ── Cart Operations ──────────────────────────────
  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.productId === product._id
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.productId === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            productId: product._id,
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1,
          },
        ],
      };
    });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity < 1) {
      get().removeItem(productId);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ items: [], isOpen: false }),

  // ── Computed Values ──────────────────────────────
  get totalItems() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  get totalPrice() {
    return get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },

  getTotalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    },
  }),
  {
    name: 'yarniq-cart-storage',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ items: state.items }), // Only persist cart items, not drawer state
  }
));

export default useCartStore;
