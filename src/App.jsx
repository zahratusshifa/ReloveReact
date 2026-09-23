import { useState } from "react";
import {
  Home,
  Heart,
  MessageCircle,
  Bell,
  User,
  Plus,
  Search,
  MapPin,
  Star,
  X,
  ShoppingBag,
  Send,
  LogOut,
  Package,
} from "lucide-react";

import "./App.css";

const initialProducts = [
  {
    id: 1,
    name: "Cardigan Rajut Sage Green",
    category: "Fashion",
    price: 35000,
    condition: "Sangat baik",
    location: "Sekaran, UNNES",
    seller: "Nabila Putri",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700",
    description:
      "Cardigan rajut warna sage green. Kondisi masih sangat baik dan cocok untuk aktivitas kuliah.",
  },
  {
    id: 2,
    name: "Totebag Canvas Cream",
    category: "Aksesori",
    price: 25000,
    condition: "Baik",
    location: "Sekaran, UNNES",
    seller: "Alya Rahma",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=700",
    description:
      "Totebag canvas warna cream untuk kuliah dan aktivitas sehari-hari.",
  },
  {
    id: 3,
    name: "Novel Laut Bercerita",
    category: "Buku",
    price: 45000,
    condition: "Baik",
    location: "Area UNNES",
    seller: "Dinda Safira",
    rating: "5.0",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=700",
    description:
      "Novel dengan kondisi baik. Tidak ada halaman yang hilang dan masih nyaman dibaca.",
  },
  {
    id: 4,
    name: "Desk Lamp Minimalis",
    category: "Elektronik",
    price: 40000,
    condition: "Sangat baik",
    location: "Sekaran, UNNES",
    seller: "Rafi Akbar",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700",
    description:
      "Lampu meja minimalis yang cocok untuk belajar di kos.",
  },
  {
    id: 5,
    name: "Shoulder Bag Brown",
    category: "Aksesori",
    price: 55000,
    condition: "Baik",
    location: "Area UNNES",
    seller: "Nabila Putri",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700",
    description:
      "Tas warna cokelat dengan desain minimalis untuk kuliah maupun hangout.",
  },
  {
    id: 6,
    name: "Kemeja Striped",
    category: "Fashion",
    price: 30000,
    condition: "Baik",
    location: "Sekaran, UNNES",
    seller: "Alya Rahma",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=700",
    description:
      "Kemeja striped yang masih nyaman dipakai dan cocok untuk outfit kuliah.",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);

function App() {
  const [page, setPage] = useState("home");
  const [products, setProducts] = useState(initialProducts);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  const [userName, setUserName] = useState("");
  const [loginName, setLoginName] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  const [sellForm, setSellForm] = useState({
    name: "",
    category: "Fashion",
    price: "",
    condition: "Sangat baik",
    location: "",
    image: "",
    description: "",
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Selamat datang di ReLove!",
      text: "Temukan barang preloved favoritmu.",
      read: false,
    },
  ]);

  const [chats, setChats] = useState([]);
  const [orders, setOrders] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState({ address: "", delivery: "COD", payment: "Tunai" });
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");

  const categories = [
    "Semua",
    "Fashion",
    "Aksesori",
    "Buku",
    "Elektronik",
  ];

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "Semua" || product.category === category;

    return matchSearch && matchCategory;
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const goTo = (nextPage) => {
    setSelectedProduct(null);
    setPage(nextPage);
  };

  const openChat = (product) => {
    let chat = chats.find(
      (item) => item.name === product.seller
    );

    if (!chat) {
      chat = {
        id: Date.now(),
        name: product.seller,
        product: product.name,
        messages: [
          {
            sender: "other",
            text: `Halo! Ada yang ingin ditanyakan tentang ${product.name}?`,
          },
        ],
      };

      setChats((prev) => [...prev, chat]);
    }

    setActiveChat(chat.id);
    setSelectedProduct(null);
    setPage("chat");
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim() || !activeChat) return;

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChat
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { sender: "me", text: message },
              ],
            }
          : chat
      )
    );

    setMessage("");
  };

  const addProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      ...sellForm,
      id: Date.now(),
      price: Number(sellForm.price),
      seller: userName,
      rating: "5.0",
      location: sellForm.location || "Area UNNES",
      image:
        sellForm.image ||
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700",
    };

    setProducts((prev) => [newProduct, ...prev]);

    setNotifications((prev) => [
      {
        id: Date.now(),
        title: "Barang berhasil dipublikasikan",
        text: `${newProduct.name} sekarang tampil di ReLove.`,
        read: false,
      },
      ...prev,
    ]);

    setSellForm({
      name: "",
      category: "Fashion",
      price: "",
      condition: "Sangat baik",
      location: "",
      image: "",
      description: "",
    });

    setPage("home");
  };

  const login = (e) => {
    e.preventDefault();

    if (!loginName.trim()) return;

    setUserName(loginName);
    setShowLogin(false);
  };

  if (showLogin) {
    return (
      <div className="login-screen">
        <form className="login-card" onSubmit={login}>
          <div className="brand-mark">r</div>

          <p className="eyebrow">SECOND LIFE, NEW LOVE</p>

          <h1>Welcome to ReLove</h1>

          <p className="muted">
            Temukan barang preloved favoritmu atau beri
            barangmu kesempatan kedua.
          </p>

          <label>Nama pengguna</label>

          <input
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
            placeholder="Masukkan nama kamu"
            required
          />

          <button className="primary-btn full-btn">
            Masuk ke ReLove
          </button>

          <small className="login-note">
            Demo aplikasi · Tidak memerlukan akun asli
          </small>
        </form>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="logo">
          <div className="brand-mark small">r</div>
          <span>relove</span>
        </div>

        <p className="sidebar-label">MENU UTAMA</p>

        <SidebarItem
          icon={<Home size={18} />}
          label="Beranda"
          active={page === "home"}
          onClick={() => goTo("home")}
        />

        <SidebarItem
          icon={<Heart size={18} />}
          label="Favorit"
          active={page === "favorites"}
          onClick={() => goTo("favorites")}
        />

        <SidebarItem
          icon={<MessageCircle size={18} />}
          label="Chat"
          active={page === "chat"}
          onClick={() => goTo("chat")}
        />

        <SidebarItem
          icon={<Bell size={18} />}
          label="Notifikasi"
          active={page === "notifications"}
          onClick={() => goTo("notifications")}
        />

        <SidebarItem
          icon={<User size={18} />}
          label="Profil"
          active={page === "profile"}
          onClick={() => goTo("profile")}
        />

        <div className="sidebar-bottom">
          <div className="mini-user">
            <div className="avatar">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{userName}</strong>
              <small>Member ReLove</small>
            </div>
          </div>

          <button
            className="logout-btn"
            onClick={() => setShowLogin(true)}
          >
            <LogOut size={16} /> Keluar
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="mobile-logo">
            <div className="brand-mark small">r</div>
            <span>relove</span>
          </div>

          <div className="topbar-right">
            <span className="location-label">
              <MapPin size={14} /> Sekaran, UNNES
            </span>

            <button
              className="icon-btn"
              onClick={() => goTo("notifications")}
            >
              <Bell size={19} />
            </button>

            <div className="avatar">
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {page === "home" && (
          <section className="page">
            <div className="welcome-row">
              <div>
                <p className="eyebrow">SELAMAT DATANG DI RELOVE</p>

                <h1>
                  Halo, {userName}! <span>✳</span>
                </h1>

                <p className="muted">
                  Temukan barang yang cocok untukmu hari ini.
                </p>
              </div>

              <button
                className="primary-btn"
                onClick={() => goTo("sell")}
              >
                <Plus size={17} /> Jual Barang
              </button>
            </div>

            <div className="hero-banner">
              <div>
                <span className="hero-tag">
                  SECOND LIFE, NEW LOVE
                </span>

                <h2>
                  Barang baik,
                  <br />
                  cerita baru.
                </h2>

                <p>
                  Temukan preloved berkualitas dari
                  <br />
                  teman-teman di sekitar kampus.
                </p>

                <button
                  className="hero-btn"
                  onClick={() =>
                    document
                      .getElementById("product-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Jelajahi barang →
                </button>
              </div>

              <div className="hero-decoration">
                <ShoppingBag size={75} strokeWidth={1} />
                <span>REUSE · RELOVE</span>
              </div>
            </div>

            <div className="search-row">
              <div className="search-box">
                <Search size={18} />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari barang preloved..."
                />

                {search && (
                  <button onClick={() => setSearch("")}>
                    <X size={16} />
                  </button>
                )}
              </div>

              <button
                className="filter-btn"
                onClick={() => {
                  setCategory("Semua");
                  setSearch("");
                }}
              >
                Reset
              </button>
            </div>

            <div className="section-heading">
              <div>
                <h2>Kategori Favorit</h2>
                <p className="muted">
                  Pilih kategori sesuai kebutuhanmu
                </p>
              </div>
            </div>

            <div className="category-list">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`category-chip ${
                    category === item ? "selected" : ""
                  }`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="section-heading" id="product-section">
              <div>
                <h2>Rekomendasi untukmu</h2>
                <p className="muted">
                  Barang pilihan dari komunitas kampus
                </p>
              </div>

              <span className="result-count">
                {filteredProducts.length} barang
              </span>
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onFavorite={() => toggleFavorite(product.id)}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <EmptyState text="Barang tidak ditemukan." />
            )}
          </section>
        )}

        {page === "favorites" && (
          <section className="page">
            <PageTitle
              title="Barang Favorit"
              subtitle="Kumpulan barang yang kamu simpan."
            />

            <div className="product-grid">
              {products
                .filter((item) => favorites.includes(item.id))
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite
                    onFavorite={() => toggleFavorite(product.id)}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
            </div>

            {favorites.length === 0 && (
              <EmptyState text="Belum ada barang favorit." />
            )}
          </section>
        )}

        {page === "sell" && (
          <section className="page narrow-page">
            <PageTitle
              title="Jual Barang"
              subtitle="Beri barangmu kesempatan kedua."
            />

            <form className="form-card" onSubmit={addProduct}>
              <label>Nama barang</label>

              <input
                required
                value={sellForm.name}
                onChange={(e) =>
                  setSellForm({ ...sellForm, name: e.target.value })
                }
                placeholder="Contoh: Cardigan rajut"
              />

              <label>Kategori</label>

              <select
                value={sellForm.category}
                onChange={(e) =>
                  setSellForm({
                    ...sellForm,
                    category: e.target.value,
                  })
                }
              >
                {categories
                  .filter((item) => item !== "Semua")
                  .map((item) => (
                    <option key={item}>{item}</option>
                  ))}
              </select>

              <label>Harga (Rp)</label>

              <input
                type="number"
                min="1000"
                required
                value={sellForm.price}
                onChange={(e) =>
                  setSellForm({ ...sellForm, price: e.target.value })
                }
                placeholder="Contoh: 35000"
              />

              <label>Kondisi barang</label>

              <select
                value={sellForm.condition}
                onChange={(e) =>
                  setSellForm({
                    ...sellForm,
                    condition: e.target.value,
                  })
                }
              >
                <option>Sangat baik</option>
                <option>Baik</option>
                <option>Cukup baik</option>
              </select>

              <label>Lokasi</label>

              <input
                value={sellForm.location}
                onChange={(e) =>
                  setSellForm({
                    ...sellForm,
                    location: e.target.value,
                  })
                }
                placeholder="Contoh: Sekaran, UNNES"
              />

              <label>Link foto barang (opsional)</label>

              <input
                value={sellForm.image}
                onChange={(e) =>
                  setSellForm({
                    ...sellForm,
                    image: e.target.value,
                  })
                }
                placeholder="https://..."
              />

              <label>Deskripsi barang</label>

              <textarea
                required
                rows="4"
                value={sellForm.description}
                onChange={(e) =>
                  setSellForm({
                    ...sellForm,
                    description: e.target.value,
                  })
                }
                placeholder="Jelaskan kondisi barangmu..."
              />

              <button className="primary-btn full-btn">
                <Plus size={17} /> Publikasikan Barang
              </button>
            </form>
          </section>
        )}

        {page === "chat" && (
          <section className="page">
            <PageTitle
              title="Pesan"
              subtitle="Terhubung dengan penjual dan pembeli."
            />

            <div className="chat-layout">
              <div className="chat-list">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    className={`chat-person ${
                      activeChat === chat.id ? "active" : ""
                    }`}
                    onClick={() => setActiveChat(chat.id)}
                  >
                    <div className="avatar">
                      {chat.name.charAt(0)}
                    </div>

                    <div>
                      <strong>{chat.name}</strong>
                      <small>{chat.product}</small>
                    </div>
                  </button>
                ))}

                {chats.length === 0 && (
                  <p className="muted">Belum ada percakapan.</p>
                )}
              </div>

              <div className="chat-window">
                {chats.find((chat) => chat.id === activeChat) ? (
                  <>
                    <div className="chat-header">
                      <strong>
                        {
                          chats.find((chat) => chat.id === activeChat)
                            .name
                        }
                      </strong>
                    </div>

                    <div className="chat-messages">
                      {chats
                        .find((chat) => chat.id === activeChat)
                        .messages.map((msg, index) => (
                          <div
                            key={index}
                            className={`message ${
                              msg.sender === "me" ? "mine" : ""
                            }`}
                          >
                            {msg.text}
                          </div>
                        ))}
                    </div>

                    <form
                      className="chat-input"
                      onSubmit={sendMessage}
                    >
                      <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tulis pesan..."
                      />

                      <button className="primary-btn">
                        <Send size={16} />
                      </button>
                    </form>
                  </>
                ) : (
                  <EmptyState text="Pilih percakapan untuk mulai chat." />
                )}
              </div>
            </div>
          </section>
        )}

        {page === "notifications" && (
          <section className="page narrow-page">
            <PageTitle
              title="Notifikasi"
              subtitle="Informasi terbaru dari ReLove."
            />

            <div className="notification-list">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`notification ${
                    item.read ? "" : "unread"
                  }`}
                >
                  <div className="notification-icon">
                    <Bell size={18} />
                  </div>

                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>

                  {!item.read && (
                    <button
                      className="text-btn"
                      onClick={() =>
                        setNotifications((prev) =>
                          prev.map((n) =>
                            n.id === item.id
                              ? { ...n, read: true }
                              : n
                          )
                        )
                      }
                    >
                      Tandai dibaca
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {page === "profile" && (
          <section className="page narrow-page">
            <PageTitle
              title="Profil Saya"
              subtitle="Informasi akun ReLove-mu."
            />

            <div className="profile-card">
              <div className="profile-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>

              <h2>{userName}</h2>
              <p className="muted">Member ReLove</p>

              <div className="profile-stats">
                <div>
                  <strong>{favorites.length}</strong>
                  <span>Favorit</span>
                </div>

                <div>
                  <strong>
                    {
                      products.filter(
                        (item) => item.seller === userName
                      ).length
                    }
                  </strong>
                  <span>Barang dijual</span>
                </div>
              </div>

              <button
                className="secondary-btn"
                onClick={() => goTo("sell")}
              >
                <Plus size={16} /> Jual Barang
              </button>
              <div className="order-history"><h3>Riwayat Pesanan</h3>{orders.length === 0 ? <p className="muted">Belum ada pesanan.</p> : orders.map(order => <div className="order-row" key={order.id}><strong>{order.product.name}</strong><span>{formatPrice(order.product.price)}</span><small>{order.status} · {order.delivery}</small></div>)}</div>
            </div>
          </section>
        )}

        {page === "checkout" && selectedProduct && (
          <section className="page narrow-page">
            <PageTitle title="Checkout" subtitle="Periksa pesananmu sebelum konfirmasi." />
            <div className="checkout-card">
              <div className="checkout-product"><img src={selectedProduct.image} alt={selectedProduct.name} /><div><strong>{selectedProduct.name}</strong><p>{formatPrice(selectedProduct.price)}</p><small>Penjual: {selectedProduct.seller}</small></div></div>
              <label>Alamat / titik temu</label>
              <textarea value={checkoutForm.address} onChange={e => setCheckoutForm({...checkoutForm, address:e.target.value})} placeholder="Masukkan alamat atau titik temu di sekitar kampus" required />
              <label>Metode serah terima</label>
              <select value={checkoutForm.delivery} onChange={e => setCheckoutForm({...checkoutForm, delivery:e.target.value})}><option>COD</option><option>Ambil di kampus</option></select>
              <label>Metode pembayaran (demo)</label>
              <select value={checkoutForm.payment} onChange={e => setCheckoutForm({...checkoutForm, payment:e.target.value})}><option>Tunai</option><option>Transfer (simulasi)</option><option>E-wallet (simulasi)</option></select>
              <div className="checkout-total"><span>Total pesanan</span><strong>{formatPrice(selectedProduct.price)}</strong></div>
              <p className="checkout-note">Ini simulasi checkout untuk prototipe. Belum ada pembayaran atau transaksi nyata.</p>
              <button className="primary-btn full-btn" onClick={() => { if (!checkoutForm.address.trim()) return; setOrders(prev => [{id:Date.now(), product:selectedProduct, address:checkoutForm.address, delivery:checkoutForm.delivery, payment:checkoutForm.payment, status:"Menunggu konfirmasi"}, ...prev]); setNotifications(prev => [{id:Date.now(), title:"Pesanan dibuat", text:`Pesanan ${selectedProduct.name} berhasil dibuat (demo).`, read:false}, ...prev]); setSelectedProduct(null); setCheckoutForm({address:"",delivery:"COD",payment:"Tunai"}); setPage("profile"); }}>Konfirmasi Pesanan</button>
              <button className="text-btn" onClick={() => setPage("home")}>Kembali belanja</button>
            </div>
          </section>
        )}

        <footer className="footer">
          ReLove © 2026 · Give things a second love.
        </footer>
      </main>

      <nav className="bottom-nav">
        <NavItem
          icon={<Home size={20} />}
          label="Home"
          active={page === "home"}
          onClick={() => goTo("home")}
        />

        <NavItem
          icon={<Heart size={20} />}
          label="Favorit"
          active={page === "favorites"}
          onClick={() => goTo("favorites")}
        />

        <button
          className="nav-sell"
          onClick={() => goTo("sell")}
        >
          <Plus size={23} />
        </button>

        <NavItem
          icon={<MessageCircle size={20} />}
          label="Chat"
          active={page === "chat"}
          onClick={() => goTo("chat")}
        />

        <NavItem
          icon={<User size={20} />}
          label="Profil"
          active={page === "profile"}
          onClick={() => goTo("profile")}
        />
      </nav>

      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="product-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              <X size={20} />
            </button>

            <img
              className="modal-image"
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />

            <div className="modal-body">
              <span className="product-category">
                {selectedProduct.category}
              </span>

              <h2>{selectedProduct.name}</h2>

              <h3 className="modal-price">
                {formatPrice(selectedProduct.price)}
              </h3>

              <div className="detail-tags">
                <span>{selectedProduct.condition}</span>
                <span>
                  <MapPin size={13} /> {selectedProduct.location}
                </span>
              </div>

              <p>{selectedProduct.description}</p>

              <div className="seller-info">
                <div className="avatar">
                  {selectedProduct.seller.charAt(0)}
                </div>

                <div>
                  <strong>{selectedProduct.seller}</strong>
                  <small>
                    <Star size={12} fill="currentColor" />{" "}
                    {selectedProduct.rating} · Penjual ReLove
                  </small>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="secondary-btn"
                  onClick={() => toggleFavorite(selectedProduct.id)}
                >
                  <Heart
                    size={17}
                    fill={
                      favorites.includes(selectedProduct.id)
                        ? "currentColor"
                        : "none"
                    }
                  />

                  {favorites.includes(selectedProduct.id)
                    ? "Tersimpan"
                    : "Favorit"}
                </button>

                <button className="primary-btn" onClick={() => setPage("checkout")}>
                  <ShoppingBag size={17} /> Checkout
                </button>
                <button className="secondary-btn" onClick={() => openChat(selectedProduct)}>
                  <MessageCircle size={17} /> Chat Penjual
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button
      className={`sidebar-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      className={`bottom-nav-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function ProductCard({
  product,
  isFavorite,
  onFavorite,
  onClick,
}) {
  return (
    <article className="product-card">
      <div className="product-image-wrap" onClick={onClick}>
        <img src={product.image} alt={product.name} />

        <span className="condition-badge">
          {product.condition}
        </span>
      </div>

      <button
        className={`favorite-btn ${isFavorite ? "liked" : ""}`}
        onClick={onFavorite}
      >
        <Heart
          size={17}
          fill={isFavorite ? "currentColor" : "none"}
        />
      </button>

      <div className="product-info" onClick={onClick}>
        <span className="product-category">{product.category}</span>

        <h3>{product.name}</h3>

        <strong className="product-price">
          {formatPrice(product.price)}
        </strong>

        <div className="product-location">
          <MapPin size={12} /> {product.location}
        </div>

        <button className="view-product-btn">
          Lihat Detail →
        </button>
      </div>
    </article>
  );
}

function PageTitle({ title, subtitle }) {
  return (
    <div className="page-title">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="empty-state">
      <Package size={32} />
      <p>{text}</p>
    </div>
  );
}

export default App;
