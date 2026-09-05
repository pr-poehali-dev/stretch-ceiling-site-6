import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

const SHOWN_KEY = "contacts_popup_shown";
const DELAY_MS = 25000;

const WHATSAPP_LINK = "https://wa.me/79290326345";
const TELEGRAM_LINK = "https://t.me/79290326345";
const MAX_LINK = "https://max.ru/79290326345";

const CONTACTS = [
  {
    icon: "MessageCircle",
    label: "WhatsApp",
    sub: "Напишите — ответим за 5 минут",
    href: WHATSAPP_LINK,
    color: "#25D366",
  },
  {
    icon: "Send",
    label: "Telegram",
    sub: "Быстрая связь в мессенджере",
    href: TELEGRAM_LINK,
    color: "#06B6D4",
  },
  {
    icon: "MessageSquare",
    label: "MAX",
    sub: "Свяжитесь через MAX",
    href: MAX_LINK,
    color: "#7C3AED",
  },
];

const ContactsPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SHOWN_KEY)) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SHOWN_KEY, "1");
    }, DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        style={{
          background: "rgba(26,20,56,0.9)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff",
        }}
      >
        <DialogHeader>
          <DialogTitle
            className="text-2xl font-black text-white"
            style={{ fontFamily: "Oswald, sans-serif" }}
          >
            Остались вопросы?
          </DialogTitle>
          <DialogDescription style={{ color: "rgba(255,255,255,0.65)" }}>
            Напишите нам в удобном мессенджере — договоримся о бесплатном замере
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-2">
          {CONTACTS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-lg transition-all hover-lift"
              style={{
                background: c.color + "1F",
                border: `1px solid ${c.color}59`,
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: c.color + "30" }}
              >
                <Icon name={c.icon as any} size={20} style={{ color: c.color }} />
              </div>
              <div>
                <div>{c.label}</div>
                <div
                  className="text-xs font-normal"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {c.sub}
                </div>
              </div>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactsPopup;
