import React, { useState, useEffect, useMemo } from 'react';
import {
  Smartphone,
  Headphones,
  BatteryCharging,
  Package,
  ShoppingCart,
  User,
  ShieldCheck,
  Lock,
  Search,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Copy,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  Settings,
  Store,
  Upload,
  AlertCircle,
  Menu,
  X,
  Truck,
  Building2
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Samsung Galaxy M34 5G',
    price: 18999,
    category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80',
    stock: 12,
    description: '6GB RAM, 128GB Storage, 6000mAh Battery, Super AMOLED Display.'
  },
  {
    id: 2,
    name: 'OnePlus Nord CE 3 Lite',
    price: 19999,
    category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80',
    stock: 8,
    description: '108MP Camera, 67W Fast Charging, 8GB RAM, 128GB Storage.'
  },
  {
    id: 3,
    name: 'boAt Rockerz 450 Bluetooth Headphones',
    price: 1499,
    category: 'Audio & Earbuds',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
    stock: 25,
    description: 'Immersive sound, 40H playback, ergonomic lightweight build.'
  },
  {
    id: 4,
    name: 'Realme Buds T300 TWS Earbuds',
    price: 2299,
    category: 'Audio & Earbuds',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=80',
    stock: 15,
    description: '30dB Active Noise Cancellation, 38H Total Playback.'
  },
  {
    id: 5,
    name: 'Duracell 20W Fast USB-C Charger Adapter',
    price: 899,
    category: 'Chargers & Cables',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=500&q=80',
    stock: 30,
    description: 'PD Fast charging compatible with iPhone, Samsung and Android.'
  },
  {
    id: 6,
    name: 'Tough Braided Type-C Cable 1.5m',
    price: 349,
    category: 'Chargers & Cables',
    image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=500&q=80',
    stock: 40,
    description: 'High durability braided fast data transfer and charging cable.'
  },
  {
    id: 7,
    name: 'Designer Silicone Back Cover (Transparent)',
    price: 299,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=500&q=80',
    stock: 50,
    description: 'Shockproof crystal clear TPU bumper cover.'
  },
  {
    id: 8,
    name: '9H Tempered Glass Screen Protector',
    price: 199,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=500&q=80',
    stock: 60,
    description: 'Edge-to-edge scratch resistant toughened glass.'
  }
];

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/store');
  const [shopName, setShopName] = useState('Shyam Telecom');
  const [shopAddress, setShopAddress] = useState('Sahnewal Khurd, Belga Road');
  const [shopPhone, setShopPhone] = useState('+91 98888 77777');
  const [adminPin, setAdminPin] = useState('3684@7973');

  // Editable Homepage Hero Content State
  const [heroBadge, setHeroBadge] = useState('100% Genuine Products & Best Prices');
  const [heroTitle, setHeroTitle] = useState('Welcome to Shyam Telecom');
  const [heroSubtitle, setHeroSubtitle] = useState('Upgrade your smartphone experience with our latest collection of 5G handsets, premium earbuds, fast chargers, and durable accessories right here.');
  const [shopGuaranteeTitle, setShopGuaranteeTitle] = useState('Shop Guarantee');
  const [guaranteePoints, setGuaranteePoints] = useState([
    'Genuine Bill & Warranty Support',
    'Home Delivery or Store Pickup',
    'Morning & Evening Delivery Slots',
    'Cash on Delivery & UPI Supported'
  ]);
  
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('shyam_telecom_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('shyam_telecom_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('shyam_telecom_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('shyam_telecom_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [customerInbox, setCustomerInbox] = useState(() => {
    const saved = localStorage.getItem('shyam_telecom_inbox');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('shyam_telecom_admin_auth') === 'true';
  });

  const [enteredAdminPin, setEnteredAdminPin] = useState('');
  const [adminPinError, setAdminPinError] = useState(false);

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersDrawerOpen, setIsOrdersDrawerOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('select'); // 'select' | 'gmail' | 'guest'
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [gmailInput, setGmailInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toast Popup State with spring animation
  const [toastMessage, setToastMessage] = useState(null);

  // Checkout Form State
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery' | 'pickup'
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [checkoutLandmark, setCheckoutLandmark] = useState('');
  const [checkoutTimeSlot, setCheckoutTimeSlot] = useState('Morning (8:00 AM – 10:00 AM)');
  const [checkoutPayment, setCheckoutPayment] = useState('COD');
  const [orderSuccessMessage, setOrderSuccessMessage] = useState(null);

  // Admin Product Modal / Management state
  const [editingProduct, setEditingProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Smartphones');
  const [newProdStock, setNewProdStock] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImage, setNewProdImage] = useState('');

  // Admin Order Cancellation modal state
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [cancelReasonText, setCancelReasonText] = useState('');

  useEffect(() => {
    localStorage.setItem('shyam_telecom_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('shyam_telecom_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shyam_telecom_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shyam_telecom_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('shyam_telecom_inbox', JSON.stringify(customerInbox));
  }, [customerInbox]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/store');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setCheckoutName(currentUser.name || '');
      setCheckoutPhone(currentUser.phone || '');
    }
  }, [currentUser]);

  const showToast = (text) => {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }, [cart]);

  const unreadInboxCount = useMemo(() => {
    return customerInbox.filter(msg => !msg.read).length;
  }, [customerInbox]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`Successfully added "${product.name}" to cart! 🛒`);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const handleGmailLogin = (e) => {
    e.preventDefault();
    if (!gmailInput.trim() || !gmailInput.includes('@')) {
      alert('Please enter a valid Gmail address.');
      return;
    }
    const emailStr = gmailInput.trim();
    const nameStr = emailStr.split('@')[0];
    const formattedName = nameStr.charAt(0).toUpperCase() + nameStr.slice(1);

    const newUser = {
      type: 'gmail',
      email: emailStr,
      name: formattedName,
      phone: ''
    };
    setCurrentUser(newUser);

    const welcomeMsg = {
      id: Date.now(),
      title: 'Welcome to Shyam Telecom!',
      body: `You have successfully logged in to Shyam Telecom (${shopAddress}) with Gmail ID ${emailStr}. Enjoy browsing our genuine mobile accessories and smartphones!`,
      date: new Date().toLocaleString(),
      read: false
    };
    setCustomerInbox(prev => [welcomeMsg, ...prev]);

    setIsAuthModalOpen(false);
    setGmailInput('');
    showToast(`Welcome, ${formattedName}! Successfully logged in via Gmail.`);
  };

  const handleGuestLogin = (e) => {
    e.preventDefault();
    const newUser = {
      type: 'guest',
      email: '',
      name: guestName.trim() || 'Valued Guest',
      phone: guestPhone.trim() || ''
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    setGuestName('');
    setGuestPhone('');
    showToast(`Welcome, ${newUser.name}! Logged in as Guest.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCustomerInbox([]);
    showToast('Logged out successfully.');
  };

  const markInboxMessageRead = (msgId) => {
    setCustomerInbox(prev => prev.map(m => m.id === msgId ? { ...m, read: true } : m));
  };

  const markAllInboxRead = () => {
    setCustomerInbox(prev => prev.map(m => ({ ...m, read: true })));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!checkoutName.trim() || !checkoutPhone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }
    if (deliveryType === 'delivery' && !checkoutAddress.trim()) {
      alert('Please enter your delivery street or village address.');
      return;
    }

    const newOrder = {
      id: 'ST-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleString(),
      customerName: checkoutName,
      customerPhone: checkoutPhone,
      deliveryType,
      address: deliveryType === 'delivery' ? checkoutAddress : `Store Pickup at ${shopAddress}`,
      landmark: checkoutLandmark || 'None',
      timeSlot: checkoutTimeSlot,
      payment: checkoutPayment,
      items: [...cart],
      total: cartTotal,
      status: 'Pending',
      cancelReason: ''
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    setOrderSuccessMessage(newOrder.id);
    showToast(`Order ${newOrder.id} placed successfully! 🎉`);
  };

  const imageUploadHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProdImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice || !newProdStock) {
      alert('Please fill in product name, price and stock.');
      return;
    }

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? {
        ...p,
        name: newProdName,
        price: Number(newProdPrice),
        category: newProdCategory,
        stock: Number(newProdStock),
        description: newProdDesc,
        image: newProdImage || p.image
      } : p));
      showToast('Product updated successfully!');
    } else {
      const newP = {
        id: Date.now(),
        name: newProdName,
        price: Number(newProdPrice),
        category: newProdCategory,
        stock: Number(newProdStock),
        description: newProdDesc,
        image: newProdImage || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=500&q=80'
      };
      setProducts(prev => [newP, ...prev]);
      showToast('New product added to catalog!');
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdStock('');
    setNewProdDesc('');
    setNewProdImage('');
  };

  const startEditProduct = (prod) => {
    setEditingProduct(prod);
    setNewProdName(prod.name);
    setNewProdPrice(prod.price);
    setNewProdCategory(prod.category);
    setNewProdStock(prod.stock);
    setNewProdDesc(prod.description);
    setNewProdImage(prod.image);
    setIsProductModalOpen(true);
  };

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to remove this item from the shop?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast('Product removed from catalog.');
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    if (newStatus === 'Cancelled') {
      setCancellingOrderId(orderId);
      return;
    }
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus, cancelReason: '' } : o));
    showToast(`Order ${orderId} status updated to ${newStatus}`);
  };

  const confirmOrderCancellation = (orderId) => {
    if (!cancelReasonText.trim()) {
      alert('Please write a cancellation reason for the customer.');
      return;
    }
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Cancelled', cancelReason: cancelReasonText.trim() } : o));
    setCancellingOrderId(null);
    setCancelReasonText('');
    showToast(`Order ${orderId} cancelled with reason.`);
  };

  const deleteOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to permanently delete order ${orderId}?`)) {
      setOrders(prev => prev.filter(o => o.id !== orderId));
      showToast(`Order ${orderId} deleted successfully.`);
    }
  };

  const renderToastNotification = () => {
    if (!toastMessage) return null;
    return (
      <div className="fixed bottom-6 right-6 z-50 bg-blue-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-blue-700 animate-[bounce_0.6s_ease-in-out_1]">
        <CheckCircle className="w-5 h-5 text-yellow-300 shrink-0" />
        <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
      </div>
    );
  };

  const renderCustomerHeader = () => (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-md">
      <div className="bg-blue-900 text-white text-[11px] sm:text-xs py-2 px-3 sm:px-4 text-center font-medium flex items-center justify-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
        <span className="truncate">Visit us at {shopAddress} or Call {shopPhone}</span>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 sm:p-2.5 rounded-2xl shadow-md">
            <Store className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-extrabold text-blue-900 tracking-tight">{shopName}</h1>
            <p className="text-[11px] sm:text-xs text-gray-500 font-medium">Genuine Mobiles & Accessories</p>
          </div>
        </div>

        {/* Desktop Navigation Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {currentUser && currentUser.type === 'gmail' && (
            <button
              onClick={() => setIsInboxOpen(true)}
              className="relative p-2.5 text-gray-700 hover:text-blue-600 rounded-full hover:bg-gray-100 transition flex items-center gap-1.5"
              title="Gmail Inbox Notifications"
            >
              <Mail className="w-6 h-6" />
              {unreadInboxCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow animate-pulse">
                  {unreadInboxCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => setIsOrdersDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-xl transition"
          >
            <Package className="w-5 h-5" />
            <span>My Orders</span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 px-4 py-2 rounded-2xl shadow-sm">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-blue-900 leading-tight">{currentUser.name}</p>
                <p className="text-[10px] text-gray-500 leading-tight">
                  {currentUser.type === 'gmail' ? currentUser.email : 'Guest Customer'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 text-xs text-red-600 hover:text-red-800 font-semibold underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-md transition"
            >
              <User className="w-4 h-4" />
              <span>Customer Login / Guest</span>
            </button>
          )}

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-blue-900 hover:bg-blue-800 text-white p-3 rounded-2xl shadow-md transition flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-blue-900 text-xs font-extrabold rounded-full w-5 h-5 flex items-center justify-center shadow animate-bounce">
                {cart.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Hamburger & Cart */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-blue-900 text-white p-2.5 rounded-xl shadow transition"
          >
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-blue-900 text-xs font-extrabold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 text-gray-700 hover:text-blue-900 rounded-xl hover:bg-gray-100 transition"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-5 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          {currentUser && (
            <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-2xl border border-blue-200">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-blue-900">{currentUser.name}</p>
                <p className="text-[10px] text-gray-500">{currentUser.type === 'gmail' ? currentUser.email : 'Guest'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-red-600 font-semibold underline px-2 py-1"
              >
                Logout
              </button>
            </div>
          )}

          {currentUser && currentUser.type === 'gmail' && (
            <button
              onClick={() => { setIsInboxOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 text-gray-800 font-bold text-xs"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>Gmail Inbox</span>
              </div>
              {unreadInboxCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadInboxCount} new
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => { setIsOrdersDrawerOpen(true); setIsMobileMenuOpen(false); }}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-800 font-bold text-xs"
          >
            <Package className="w-5 h-5 text-blue-600" />
            <span>My Orders Tracking</span>
          </button>

          {!currentUser && (
            <button
              onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl text-xs shadow flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Customer Login / Guest</span>
            </button>
          )}
        </div>
      )}
    </header>
  );

  const renderStoreView = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      {renderCustomerHeader()}

      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 shadow-xl mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <span className="bg-yellow-400 text-blue-950 text-[11px] sm:text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider inline-block shadow">
              {heroBadge}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {heroTitle}
            </h2>
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              {heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
              <a
                href="#catalog"
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-950 font-bold px-6 py-3.5 rounded-2xl shadow-lg transition text-sm"
              >
                Browse Items
              </a>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-3.5 rounded-2xl backdrop-blur-sm text-sm font-medium">
                <Phone className="w-4 h-4 text-yellow-300" />
                <span>Call/WhatsApp: {shopPhone}</span>
              </div>
            </div>
          </div>
          <div className="bg-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl max-w-sm w-full">
            <h3 className="text-base sm:text-lg font-bold mb-3 flex items-center gap-2 text-yellow-300">
              <ShieldCheck className="w-5 h-5" /> {shopGuaranteeTitle}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-blue-100 font-medium">
              {guaranteePoints.map((pt, idx) => (
                <li key={idx} className="flex items-center gap-2">✓ {pt}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search smartphones, chargers, earbuds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {['All', 'Smartphones', 'Audio & Earbuds', 'Chargers & Cables', 'Accessories'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition shadow-sm ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800">No items found</h3>
            <p className="text-gray-500 text-sm mt-1">Try searching for something else or switch categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-blue-900/80 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      {product.category}
                    </span>
                    {product.stock <= 5 && product.stock > 0 && (
                      <span className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                        Only {product.stock} left
                      </span>
                    )}
                    {product.stock === 0 && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h4 className="font-extrabold text-gray-900 text-base line-clamp-1 mb-1">{product.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">{product.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-blue-900">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-gray-400 font-semibold">Inclusive of all taxes</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 ${
                      product.stock === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 active:scale-95'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <div>
          <p>© 2026 {shopName}. Located at {shopAddress}. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="#/store" className="hover:text-blue-600 font-medium">Customer Store</a>
          {}
          <a href="#/admin" className="text-gray-300 hover:text-gray-500 text-[10px] font-medium tracking-tight">
            admin portal
          </a>
        </div>
      </footer>
    </div>
  );

  const renderAuthModal = () => {
    if (!isAuthModalOpen) return null;
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-300">
          <button
            onClick={() => { setIsAuthModalOpen(false); setAuthMode('select'); }}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900">Customer Login / Access</h3>
            <p className="text-xs text-gray-500 mt-1">Sign in with Gmail for instant order tracking & welcome rewards, or continue as guest.</p>
          </div>

          {authMode === 'select' && (
            <div className="space-y-3">
              <button
                onClick={() => setAuthMode('gmail')}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg transition flex items-center justify-center gap-3 text-sm active:scale-95"
              >
                <Mail className="w-5 h-5" />
                <span>Sign in with Gmail / Google</span>
              </button>

              <button
                onClick={() => setAuthMode('guest')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3.5 px-4 rounded-2xl transition flex items-center justify-center gap-3 text-sm active:scale-95"
              >
                <User className="w-5 h-5" />
                <span>Continue Instantly as Guest</span>
              </button>
            </div>
          )}

          {authMode === 'gmail' && (
            <form onSubmit={handleGmailLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Enter your Gmail Address</label>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={gmailInput}
                  onChange={(e) => setGmailInput(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('select')}
                  className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-2xl text-xs transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-2xl text-xs shadow-lg transition flex items-center justify-center gap-2"
                >
                  <span>Verify & Login</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {authMode === 'guest' && (
            <form onSubmit={handleGuestLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Kumar"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('select')}
                  className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-2xl text-xs transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl text-xs shadow-lg transition flex items-center justify-center gap-2"
                >
                  <span>Start Shopping</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  };

  const renderInboxDrawer = () => {
    if (!isInboxOpen) return null;
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-5 bg-blue-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Mail className="w-6 h-6 text-yellow-300" />
              <div>
                <h3 className="font-extrabold text-base">Gmail Login Inbox</h3>
                <p className="text-xs text-blue-200">Notifications & Welcome Emails</p>
              </div>
            </div>
            <button
              onClick={() => setIsInboxOpen(false)}
              className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-xs font-bold text-gray-700">
            <span>{customerInbox.length} Message(s) ({unreadInboxCount} unread)</span>
            {unreadInboxCount > 0 && (
              <button
                onClick={markAllInboxRead}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {customerInbox.length === 0 ? (
              <div className="text-center py-20">
                <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium text-sm">Your inbox is empty.</p>
              </div>
            ) : (
              customerInbox.map(msg => (
                <div
                  key={msg.id}
                  onClick={() => markInboxMessageRead(msg.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    msg.read ? 'bg-white border-gray-200 text-gray-700' : 'bg-blue-50/70 border-blue-200 text-blue-950 font-semibold shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold">{msg.title}</span>
                    <span className="text-[10px] text-gray-400">{msg.date}</span>
                  </div>
                  <p className="text-xs leading-relaxed mb-3">{msg.body}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px]">
                    <span className={msg.read ? 'text-gray-400' : 'text-blue-600 font-bold'}>
                      {msg.read ? 'Read' : 'Unread'}
                    </span>
                    {!msg.read && (
                      <button
                        onClick={(e) => { e.stopPropagation(); markInboxMessageRead(msg.id); }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold shadow"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderCartDrawer = () => {
    if (!isCartOpen) return null;
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-5 bg-blue-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="w-6 h-6 text-yellow-300" />
              <div>
                <h3 className="font-extrabold text-base">Your Shopping Cart</h3>
                <p className="text-xs text-blue-200">{cart.reduce((s, i) => s + i.qty, 0)} items selected</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <h4 className="font-bold text-gray-800 text-lg">Your cart is empty</h4>
                <p className="text-gray-500 text-xs mt-1">Add items from the store to place an order.</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h5>
                    <p className="text-blue-900 font-extrabold text-xs mt-0.5">₹{item.price.toLocaleString('en-IN')}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateCartQty(item.id, -1)}
                        className="w-7 h-7 bg-white border border-gray-300 rounded-lg flex items-center justify-center font-bold text-xs hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="text-xs font-extrabold">{item.qty}</span>
                      <button
                        onClick={() => updateCartQty(item.id, 1)}
                        className="w-7 h-7 bg-white border border-gray-300 rounded-lg flex items-center justify-center font-bold text-xs hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => updateCartQty(item.id, -item.qty)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-gray-200 space-y-3 shadow-lg">
              <div className="flex items-center justify-between text-base font-extrabold text-gray-900">
                <span>Subtotal Amount:</span>
                <span className="text-blue-900 text-xl">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <button
                onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
              >
                <span>Proceed to Checkout</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCheckoutModal = () => {
    if (!isCheckoutOpen) return null;
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
        <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative my-auto animate-in zoom-in-95 duration-300">
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <h3 className="text-xl font-extrabold text-gray-900">Complete Your Order</h3>
            <p className="text-xs text-gray-500 mt-1">Provide your details for home delivery or store pickup from {shopName}.</p>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Amit Sharma"
                value={checkoutName}
                onChange={(e) => setCheckoutName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Contact Phone Number</label>
              <input
                type="tel"
                required
                placeholder="9888811111"
                value={checkoutPhone}
                onChange={(e) => setCheckoutPhone(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Order Fulfillment Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`py-3 px-3 rounded-2xl text-xs font-bold transition border flex items-center justify-center gap-2 ${
                    deliveryType === 'delivery'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <Truck className="w-4 h-4 shrink-0" />
                  <span>Home Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`py-3 px-3 rounded-2xl text-xs font-bold transition border flex items-center justify-center gap-2 ${
                    deliveryType === 'pickup'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>Store Pickup</span>
                </button>
              </div>
            </div>

            {deliveryType === 'delivery' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Street / Village Address</label>
                  <textarea
                    required
                    rows="2"
                    placeholder="House No, Street name, Village/Locality..."
                    value={checkoutAddress}
                    onChange={(e) => setCheckoutAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Nearby Landmark (Optional)</label>
                  <input
                    type="text"
                    placeholder="Near Gurudwara / Main Market"
                    value={checkoutLandmark}
                    onChange={(e) => setCheckoutLandmark(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Preferred Delivery Time Slot</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Morning (8:00 AM – 10:00 AM)',
                  'Evening (4:00 PM – 6:00 PM)'
                ].map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setCheckoutTimeSlot(slot)}
                    className={`p-3 rounded-2xl text-xs font-bold transition border text-left ${
                      checkoutTimeSlot === slot
                        ? 'bg-blue-900 text-white border-blue-900 shadow-md'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-extrabold">{slot.split(' (')[0]}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{slot.split(' (')[1]?.replace(')', '')}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Payment Method</label>
              <select
                value={checkoutPayment}
                onChange={(e) => setCheckoutPayment(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="COD">Cash on Delivery / Pickup</option>
                <option value="UPI">UPI on Delivery / Google Pay / PhonePe</option>
              </select>
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center justify-between text-sm">
              <span className="font-bold text-gray-700">Total Payable:</span>
              <span className="font-black text-blue-900 text-lg">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Confirm & Place Order</span>
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderOrdersDrawer = () => {
    if (!isOrdersDrawerOpen) return null;
    const myOrders = currentUser
      ? orders.filter(o => o.customerPhone === currentUser.phone || o.customerName === currentUser.name)
      : orders;

    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-5 bg-blue-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Package className="w-6 h-6 text-yellow-300" />
              <div>
                <h3 className="font-extrabold text-base">My Orders History</h3>
                <p className="text-xs text-blue-200">Track status and live updates from {shopName}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOrdersDrawerOpen(false)}
              className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {myOrders.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <h4 className="font-bold text-gray-800 text-lg">No orders placed yet</h4>
                <p className="text-gray-500 text-xs mt-1">Your placed orders will appear here for live tracking.</p>
              </div>
            ) : (
              myOrders.map(order => (
                <div key={order.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <div>
                      <span className="font-black text-blue-900 text-sm">{order.id}</span>
                      <p className="text-[10px] text-gray-400">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      order.status === 'Out for Delivery' ? 'bg-purple-100 text-purple-800' :
                      order.status === 'Packed' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  {order.status === 'Cancelled' && order.cancelReason && (
                    <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-xs text-red-900">
                      <span className="font-bold block mb-0.5">Cancellation Reason from Shop:</span>
                      <p>{order.cancelReason}</p>
                    </div>
                  )}

                  <div className="space-y-1 text-xs text-gray-600">
                    <p><b>Customer:</b> {order.customerName} ({order.customerPhone})</p>
                    <p><b>Type:</b> {order.deliveryType === 'delivery' ? 'Home Delivery' : 'Store Pickup'}</p>
                    <p><b>Address:</b> {order.address}</p>
                    {order.timeSlot && (
                      <p className="flex items-center gap-1 text-blue-700 font-bold">
                        <Clock className="w-3.5 h-3.5" /> Slot: {order.timeSlot}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-gray-200 space-y-2">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Ordered Items</span>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs font-medium text-gray-800">
                        <span>{item.name} x {item.qty}</span>
                        <span className="font-bold">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-gray-200 flex items-center justify-between font-extrabold text-sm text-gray-900">
                    <span>Total Amount:</span>
                    <span className="text-blue-900 text-base">₹{order.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderOrderSuccessBanner = () => {
    if (!orderSuccessMessage) return null;
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl space-y-4 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-gray-900">Order Placed Successfully!</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Your order <span className="font-bold text-blue-900">{orderSuccessMessage}</span> has been received by <span className="font-bold">{shopName}</span>. We will prepare your items for your chosen delivery slot.
          </p>
          <button
            onClick={() => { setOrderSuccessMessage(null); setIsOrdersDrawerOpen(true); }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition text-sm"
          >
            View My Orders & Track Status
          </button>
        </div>
      </div>
    );
  };

  const renderAdminLogin = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-3xl max-w-md w-full p-8 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Owner Portal Security</h2>
          <p className="text-xs text-gray-500 mt-1">Enter your private Shop Owner PIN to access management dashboard.</p>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          if (enteredAdminPin === adminPin) {
            setIsAdminLoggedIn(true);
            sessionStorage.setItem('shyam_telecom_admin_auth', 'true');
            setAdminPinError(false);
          } else {
            setAdminPinError(true);
          }
        }} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter Owner PIN"
              value={enteredAdminPin}
              onChange={(e) => { setEnteredAdminPin(e.target.value); setAdminPinError(false); }}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-center text-gray-900 tracking-widest text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {adminPinError && (
              <p className="text-xs text-red-600 font-semibold mt-2">Incorrect PIN. Please try again.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition text-sm"
          >
            Unlock Owner Dashboard
          </button>
        </form>

        <div className="pt-4 border-t border-gray-100 text-xs">
          <a href="#/store" className="text-blue-600 hover:underline flex items-center justify-center gap-1 font-semibold">
            <ArrowLeft className="w-4 h-4" /> Return to Customer Website
          </a>
        </div>
      </div>
    </div>
  );

  const [adminTab, setAdminTab] = useState('orders');

  const renderAdminDashboard = () => (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-blue-900">Owner Portal Dashboard</h1>
              <p className="text-[11px] sm:text-xs text-gray-500 font-medium">{shopName} • {shopAddress}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#/store"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Customer Store</span>
            </a>
            <button
              onClick={() => {
                setIsAdminLoggedIn(false);
                sessionStorage.removeItem('shyam_telecom_admin_auth');
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold shadow-md transition"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 sm:p-8 rounded-3xl border border-blue-800 shadow-xl text-white">
          <h3 className="text-base font-extrabold mb-2 flex items-center gap-2 text-yellow-300">
            <Copy className="w-5 h-5" /> Your Two Separate Website Links
          </h3>
          <p className="text-xs text-blue-100 mb-4">
            Share the Customer Link with your customers on WhatsApp or social media. Keep your Admin Link private.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold tracking-wider text-yellow-300 block mb-0.5">1. Public Customer Link</span>
                <span className="text-xs font-mono text-blue-100 select-all truncate block">{window.location.origin + window.location.pathname}#/store</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin + window.location.pathname + '#/store');
                  showToast('Customer Link copied to clipboard!');
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-950 px-3 py-2 rounded-xl text-xs font-extrabold shadow transition shrink-0"
              >
                Copy Link
              </button>
            </div>

            <div className="bg-black/20 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase font-bold tracking-wider text-yellow-300 block mb-0.5">2. Private Owner Admin Link</span>
                <span className="text-xs font-mono text-blue-100 select-all truncate block">{window.location.origin + window.location.pathname}#/admin</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin + window.location.pathname + '#/admin');
                  showToast('Admin Link copied to clipboard!');
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-950 px-3 py-2 rounded-xl text-xs font-extrabold shadow transition shrink-0"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 border-b border-gray-200">
          {[
            { id: 'orders', label: `Customer Orders (${orders.length})` },
            { id: 'catalog', label: `Manage Products (${products.length})` },
            { id: 'settings', label: 'Shop Settings & Homepage Text Editor' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              className={`px-4 sm:px-5 py-3 rounded-2xl text-xs font-extrabold whitespace-nowrap transition shadow-sm ${
                adminTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {adminTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-blue-900">Incoming Customer Orders</h3>
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium text-sm">No customer orders received yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-black text-blue-900 text-base">{order.id}</span>
                          <span className="text-xs text-gray-400">{order.date}</span>
                        </div>
                        <p className="text-xs font-bold text-gray-800 mt-1">{order.customerName} • {order.customerPhone}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="bg-gray-50 border border-gray-200 text-gray-900 font-bold text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option value="Pending">Status: Pending</option>
                          <option value="Packed">Status: Packed</option>
                          <option value="Out for Delivery">Status: Out for Delivery</option>
                          <option value="Completed">Status: Completed</option>
                          <option value="Cancelled">Status: Cancelled</option>
                        </select>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-xl transition"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl flex items-center gap-2 text-xs text-blue-900">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                      <div>
                        <span className="font-bold">Requested Delivery Time Slot: </span>
                        <span className="font-extrabold text-blue-950">{order.timeSlot || 'Morning (8:00 AM – 10:00 AM)'}</span>
                      </div>
                    </div>

                    {order.status === 'Cancelled' && (
                      <div className="bg-red-50 border border-red-200 p-4 rounded-2xl space-y-2">
                        <span className="text-xs font-bold text-red-700">Cancellation Reason:</span>
                        <p className="text-xs text-red-900">{order.cancelReason || 'No reason specified'}</p>
                        {cancellingOrderId === order.id && (
                          <div className="pt-2 space-y-2">
                            <input
                              type="text"
                              placeholder="Update cancellation reason..."
                              value={cancelReasonText}
                              onChange={(e) => setCancelReasonText(e.target.value)}
                              className="w-full bg-white border border-red-300 text-gray-900 p-2.5 rounded-xl text-xs"
                            />
                            <button
                              onClick={() => confirmOrderCancellation(order.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm"
                            >
                              Update Reason
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {cancellingOrderId === order.id && order.status !== 'Cancelled' && (
                      <div className="bg-red-50 border border-red-200 p-4 rounded-2xl space-y-3">
                        <span className="text-xs font-bold text-red-700 block">Why are you cancelling this order? (Required)</span>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'Item currently out of stock at shop',
                            'Delivery address outside service area',
                            'Customer requested cancellation'
                          ].map(preset => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => setCancelReasonText(preset)}
                              className="bg-white hover:bg-red-100 border border-red-200 text-xs text-red-800 px-3 py-1.5 rounded-xl font-medium"
                            >
                              {preset}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Or type custom cancellation reason..."
                          value={cancelReasonText}
                          onChange={(e) => setCancelReasonText(e.target.value)}
                          className="w-full bg-white border border-red-300 text-gray-900 p-2.5 rounded-xl text-xs"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => confirmOrderCancellation(order.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm"
                          >
                            Confirm Cancel & Send Reason
                          </button>
                          <button
                            onClick={() => setCancellingOrderId(null)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-bold"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
                      <div>
                        <p><b>Fulfillment:</b> {order.deliveryType === 'delivery' ? 'Home Delivery' : 'Store Pickup'}</p>
                        <p><b>Address:</b> {order.address}</p>
                        {order.landmark !== 'None' && <p><b>Landmark:</b> {order.landmark}</p>}
                      </div>
                      <div>
                        <p><b>Payment:</b> {order.payment}</p>
                        <p><b>Total Amount:</b> <span className="font-extrabold text-blue-900 text-sm">₹{order.total.toLocaleString('en-IN')}</span></p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 space-y-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ordered Items</span>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs text-gray-800">
                          <span>{item.name} x {item.qty}</span>
                          <span className="font-bold">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {adminTab === 'catalog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-blue-900">Shop Product Catalog</h3>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setNewProdName('');
                  setNewProdPrice('');
                  setNewProdStock('');
                  setNewProdDesc('');
                  setNewProdImage('');
                  setIsProductModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2 text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 bg-gray-100">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 bg-blue-900/80 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                        {product.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="font-extrabold text-gray-900 text-sm line-clamp-1">{product.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-black text-blue-900 text-base">₹{product.price.toLocaleString('en-IN')}</span>
                        <span className="text-xs font-bold text-gray-500">Stock: {product.stock}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex gap-2">
                    <button
                      onClick={() => startEditProduct(product)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {adminTab === 'settings' && (
          <div className="space-y-8 max-w-2xl mx-auto">
            {/* Shop General Settings */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold text-blue-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" /> Edit Shop Details & Admin PIN
              </h3>

              <form onSubmit={(e) => {
                e.preventDefault();
                showToast('Shop settings successfully updated!');
              }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Shop Name</label>
                  <input
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Shop Address / Location</label>
                  <input
                    type="text"
                    value={shopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Shop Contact Phone Number</label>
                  <input
                    type="text"
                    value={shopPhone}
                    onChange={(e) => setShopPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Secret Admin Login PIN</label>
                  <input
                    type="text"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-blue-900 font-mono tracking-widest px-4 py-3 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition text-sm"
                >
                  Save Shop Details & PIN
                </button>
              </form>
            </div>

            {/* Homepage & Hero Text Editor */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold text-blue-900 flex items-center gap-2">
                <Store className="w-5 h-5 text-blue-600" /> Edit Homepage & Hero Banner Text
              </h3>
              <p className="text-xs text-gray-500">Customize all titles, badges, and guarantee bullet points shown on the top of your public website.</p>

              <form onSubmit={(e) => {
                e.preventDefault();
                showToast('Homepage text successfully updated!');
              }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Hero Badge Text (Yellow top tag)</label>
                  <input
                    type="text"
                    value={heroBadge}
                    onChange={(e) => setHeroBadge(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Main Hero Title</label>
                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Hero Subtitle / Description</label>
                  <textarea
                    rows="3"
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Guarantee Box Title</label>
                  <input
                    type="text"
                    value={shopGuaranteeTitle}
                    onChange={(e) => setShopGuaranteeTitle(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Guarantee Bullet Points (Comma Separated)</label>
                  <textarea
                    rows="3"
                    value={guaranteePoints.join(', ')}
                    onChange={(e) => setGuaranteePoints(e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition text-sm"
                >
                  Save Homepage Text
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white border border-gray-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-auto animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-gray-900 mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fast Charger 33W"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="999"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Stock Qty</label>
                  <input
                    type="number"
                    required
                    placeholder="20"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl text-sm font-medium"
                >
                  <option value="Smartphones">Smartphones</option>
                  <option value="Audio & Earbuds">Audio & Earbuds</option>
                  <option value="Chargers & Cables">Chargers & Cables</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-blue-600" />
                  <span>Upload Local Product Image (.jpg / .png)</span>
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={imageUploadHandler}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 text-xs"
                />
                {newProdImage && (
                  <div className="mt-2 flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-200">
                    <img src={newProdImage} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                    <span className="text-xs text-green-600 font-bold">Image loaded successfully!</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  placeholder="Product specifications..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-2xl text-sm font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition text-sm"
              >
                Save Product to Catalog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      {currentHash === '#/admin' ? (
        isAdminLoggedIn ? renderAdminDashboard() : renderAdminLogin()
      ) : (
        renderStoreView()
      )}

      {renderAuthModal()}
      {renderInboxDrawer()}
      {renderCartDrawer()}
      {renderCheckoutModal()}
      {renderOrdersDrawer()}
      {renderOrderSuccessBanner()}
      {renderToastNotification()}
    </div>
  );
}