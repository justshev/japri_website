import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Send,
  Phone,
  MoreVertical,
  AlertTriangle,
  Shield,
  Info,
  CheckCircle,
  XCircle,
  Package,
  ArrowLeft,
  Image as ImageIcon,
  Paperclip,
  MessageCircle,
} from "lucide-react";
import {
  useConversations,
  useMessages,
  useSendMessage,
  useMarkAsRead,
  useCreateConversation,
} from "@/hooks/use-chat";
import { useAuth } from "@/hooks/use-auth";

const Chat = () => {
  const [searchParams] = useSearchParams();
  const sellerId = searchParams.get("seller");
  const productId = searchParams.get("product");
  const [message, setMessage] = useState("");
  const [showSafetyTips, setShowSafetyTips] = useState(true);
  const [activeConversationId, setActiveConversationId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const { data: convsRes, isLoading: convsLoading } = useConversations();
  const { data: msgsRes } = useMessages(activeConversationId);
  const sendMsg = useSendMessage(activeConversationId);
  const markAsRead = useMarkAsRead(activeConversationId);
  const createConversation = useCreateConversation();

  const conversations = convsRes?.data ?? [];
  const messages_list = msgsRes?.data?.messages ?? [];

  // Auto-select first conversation or create one if coming from product page
  useEffect(() => {
    if (sellerId && !activeConversationId) {
      createConversation.mutate(
        { participantId: sellerId, productId: productId || undefined },
        {
          onSuccess: (res) => {
            if (res?.data?.id) setActiveConversationId(res.data.id);
          },
        },
      );
    } else if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations, sellerId, productId, activeConversationId]);

  // Mark as read when switching conversations
  useEffect(() => {
    if (activeConversationId) {
      markAsRead.mutate();
    }
  }, [activeConversationId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages_list]);

  const activeConv = conversations.find((c) => c.id === activeConversationId);
  const participant = activeConv?.participant;

  const handleSend = () => {
    if (!message.trim() || !activeConversationId) return;
    sendMsg.mutate({ content: message.trim() });
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const timeAgo = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diff < 60) return "baru saja";
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}j`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}h lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const safetyTipItems = [
    {
      icon: Shield,
      title: "Verifikasi Penjual",
      description:
        "Pastikan penjual memiliki badge terverifikasi dan ulasan positif dari pembeli lain",
      color: "text-success",
    },
    {
      icon: XCircle,
      title: "Jangan Transfer Duluan",
      description:
        "Hindari transfer uang sebelum menerima barang, gunakan COD jika memungkinkan",
      color: "text-destructive",
    },
    {
      icon: CheckCircle,
      title: "Gunakan COD",
      description:
        "Bayar di tempat (Cash on Delivery) adalah metode paling aman untuk transaksi",
      color: "text-primary",
    },
    {
      icon: Info,
      title: "Simpan Bukti",
      description:
        "Screenshot percakapan dan simpan bukti transfer sebagai dokumentasi",
      color: "text-info",
    },
  ];

  const scamIndicators = [
    "Harga terlalu murah dari pasaran",
    "Memaksa untuk transfer cepat",
    "Tidak mau COD dengan berbagai alasan",
    "Akun baru tanpa ulasan",
    "Meminta transfer ke rekening pribadi berbeda nama",
    "Tidak mau video call untuk verifikasi",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="section-container">
          {/* Back Navigation */}
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Kembali ke Marketplace</span>
          </Link>

          {/* Safety Warning Banner */}
          {showSafetyTips && (
            <div className="mb-6 p-4 rounded-2xl bg-warning/10 border border-warning/30">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Tips Keamanan Bertransaksi
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Platform ini hanya memfasilitasi komunikasi antara penjual
                      dan pembeli. Segala transaksi adalah tanggung jawab
                      masing-masing pihak.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      {safetyTipItems.map((tip, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <tip.icon
                            className={`w-4 h-4 ${tip.color} flex-shrink-0 mt-0.5`}
                          />
                          <span className="text-muted-foreground">
                            {tip.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowSafetyTips(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-280px)] min-h-[500px]">
            {/* Conversation List */}
            <div className="lg:col-span-1 rounded-2xl bg-card border border-border/50 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-border/50">
                <h2 className="font-display font-semibold text-foreground">
                  Pesan
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {convsLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-4 flex items-center gap-3">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </div>
                  ))
                ) : conversations.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <MessageCircle className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Belum ada percakapan</p>
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setActiveConversationId(conv.id)}
                      className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left ${
                        conv.id === activeConversationId ? "bg-muted/30" : ""
                      }`}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary overflow-hidden">
                          {conv.participant?.avatar ? (
                            <img
                              src={conv.participant.avatar}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            getInitials(conv.participant?.fullName || "?")
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground text-sm truncate">
                            {conv.participant?.fullName || "Pengguna"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {conv.lastMessage
                              ? timeAgo(conv.lastMessage.createdAt)
                              : ""}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conv.lastMessage?.content || "Belum ada pesan"}
                        </p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2 rounded-2xl bg-card border border-border/50 overflow-hidden flex flex-col">
              {/* Chat Header */}
              {participant ? (
                <div className="p-4 border-b border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary overflow-hidden">
                        {participant.avatar ? (
                          <img
                            src={participant.avatar}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          getInitials(participant.fullName)
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {participant.fullName}
                        </span>
                        {participant.isVerified && (
                          <CheckCircle className="w-4 h-4 text-success" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 border-b border-border/50">
                  <span className="text-muted-foreground text-sm">
                    Pilih percakapan
                  </span>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {!activeConversationId ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>Pilih percakapan untuk mulai chat</p>
                    </div>
                  </div>
                ) : messages_list.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p className="text-sm">
                      Belum ada pesan. Mulai percakapan!
                    </p>
                  </div>
                ) : (
                  messages_list.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === user?.id ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] p-3 rounded-2xl ${
                          msg.senderId === user?.id
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted text-foreground rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.senderId === user?.id
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {formatTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      activeConversationId
                        ? "Ketik pesan..."
                        : "Pilih percakapan..."
                    }
                    className="flex-1"
                    disabled={!activeConversationId}
                  />
                  <Button
                    size="icon"
                    disabled={
                      !message.trim() ||
                      !activeConversationId ||
                      sendMsg.isPending
                    }
                    onClick={handleSend}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Safety Tips Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Seller Info */}
              {participant && (
                <div className="rounded-2xl bg-card border border-border/50 p-4">
                  <h3 className="font-semibold text-foreground mb-3">
                    Info Penjual
                  </h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary overflow-hidden">
                      {participant.avatar ? (
                        <img
                          src={participant.avatar}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getInitials(participant.fullName)
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-foreground">
                          {participant.fullName}
                        </span>
                        {participant.isVerified && (
                          <CheckCircle className="w-4 h-4 text-success" />
                        )}
                      </div>
                      {participant.isVerified && (
                        <span className="text-xs text-success">
                          Terverifikasi
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Scam Indicators */}
              <div className="rounded-2xl bg-destructive/5 border border-destructive/20 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <h3 className="font-semibold text-foreground">
                    Tanda-tanda Penipuan
                  </h3>
                </div>
                <ul className="space-y-2">
                  {scamIndicators.map((indicator, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{indicator}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safe Transaction Tips */}
              <div className="rounded-2xl bg-success/5 border border-success/20 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-success" />
                  <h3 className="font-semibold text-foreground">
                    Transaksi Aman
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    Utamakan COD (bayar di tempat)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    Cek produk sebelum bayar
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    Minta bukti foto/video produk
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    Simpan screenshot percakapan
                  </li>
                </ul>
              </div>

              {/* Report */}
              <div className="rounded-2xl bg-card border border-border/50 p-4">
                <h3 className="font-semibold text-foreground mb-2">
                  Ada Masalah?
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Laporkan jika menemukan indikasi penipuan atau perilaku
                  mencurigakan
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 text-destructive border-destructive/50 hover:bg-destructive/10"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Laporkan Penjual
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chat;
