import { Clock, Loader2, Mail, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "../hooks/useQueries";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL: FormData = { name: "", email: "", subject: "", message: "" };

function InputField({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
        style={{
          background: "oklch(var(--input))",
          border: "1px solid oklch(var(--border))",
          color: "oklch(var(--foreground))",
        }}
        onFocus={(e) => {
          (e.target as HTMLElement).style.borderColor =
            "oklch(72% 0.24 290 / 0.6)";
          (e.target as HTMLElement).style.boxShadow =
            "0 0 0 3px oklch(72% 0.24 290 / 0.1)";
        }}
        onBlur={(e) => {
          (e.target as HTMLElement).style.borderColor = "";
          (e.target as HTMLElement).style.boxShadow = "";
        }}
      />
      {error && (
        <p className="text-xs" style={{ color: "oklch(var(--destructive))" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { mutateAsync: submitContact, isPending } = useSubmitContact();

  const setField = (key: keyof FormData) => (val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await submitContact(form);
      toast.success("Message sent! I'll get back to you soon.");
      setForm(INITIAL);
    } catch {
      toast.error("Failed to send. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Background blob */}
      <div
        className="absolute -right-32 bottom-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: "oklch(72% 0.24 290)" }}
      />
      <div
        className="absolute -left-32 top-0 w-80 h-80 rounded-full blur-3xl opacity-8"
        style={{ background: "oklch(75% 0.25 192)" }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="font-mono text-xs tracking-widest uppercase mb-3 block"
            style={{ color: "oklch(75% 0.25 192)" }}
          >
            Get In Touch
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl gradient-text mb-4">
            Contact Me
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Have a project in mind? Let's build something extraordinary
            together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="font-display font-bold text-xl mb-2">
                Let's talk
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
            </div>

            {[
              {
                icon: Mail,
                label: "Email",
                value: "sarfaraj@kashmani.dev",
                color: "oklch(72% 0.24 290)",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Kashmir, India (Remote Worldwide)",
                color: "oklch(65% 0.2 220)",
              },
              {
                icon: Clock,
                label: "Availability",
                value: "Open to new projects",
                color: "oklch(75% 0.25 192)",
                badge: true,
              },
            ].map(({ icon: Icon, label, value, color, badge }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-4 rounded-xl glass"
                style={{ border: "1px solid oklch(var(--border))" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: `${color.replace(")", " / 0.1)")}`,
                    border: `1px solid ${color.replace(")", " / 0.2)")}`,
                  }}
                >
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-foreground flex items-center gap-2">
                    {value}
                    {badge && (
                      <span
                        className="px-1.5 py-0.5 rounded text-xs"
                        style={{
                          background: "oklch(65% 0.2 150 / 0.1)",
                          color: "oklch(65% 0.2 150)",
                        }}
                      >
                        ✓ Active
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5"
              style={{ border: "1px solid oklch(var(--border))" }}
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField
                  label="Name"
                  id="name"
                  value={form.name}
                  onChange={setField("name")}
                  placeholder="John Doe"
                  error={errors.name}
                />
                <InputField
                  label="Email"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={setField("email")}
                  placeholder="john@example.com"
                  error={errors.email}
                />
              </div>

              <InputField
                label="Subject"
                id="subject"
                value={form.subject}
                onChange={setField("subject")}
                placeholder="Project Inquiry"
                error={errors.subject}
              />

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground block"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setField("message")(e.target.value)}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-200"
                  style={{
                    background: "oklch(var(--input))",
                    border: "1px solid oklch(var(--border))",
                    color: "oklch(var(--foreground))",
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLElement).style.borderColor =
                      "oklch(72% 0.24 290 / 0.6)";
                    (e.target as HTMLElement).style.boxShadow =
                      "0 0 0 3px oklch(72% 0.24 290 / 0.1)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLElement).style.borderColor = "";
                    (e.target as HTMLElement).style.boxShadow = "";
                  }}
                />
                {errors.message && (
                  <p
                    className="text-xs"
                    style={{ color: "oklch(var(--destructive))" }}
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 hover:scale-[1.01] hover:shadow-neon-purple"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(72% 0.24 290), oklch(65% 0.2 220))",
                  color: "white",
                }}
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
