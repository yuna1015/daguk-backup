import { useEffect, useState } from "react";
import { useLocation } from "wouter";

function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.07 }
    );
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Nav({ active }: { active?: string }) {
  const [, navigate] = useLocation();
  const links = [{ l: "Company", p: "/company" }, { l: "Products", p: "/business" }, { l: "Contact", p: "/contact" }];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#fff", borderBottom: "1px solid #e5e5e5",
      display: "flex", alignItems: "center",
      padding: "0 36px", height: 60, gap: 0,
    }}>
      <button onClick={() => navigate("/")} style={{
        background: "none", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 8,
        fontFamily: "Pretendard Variable, sans-serif",
        fontSize: 12, fontWeight: 700, letterSpacing: ".14em", color: "#111",
        padding: 0, flexShrink: 0,
      }}>
        <img src="/dg-logo-dark.png" alt="DG" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} style={{ height: 32, display: "block" }} />
      </button>
      <span style={{ margin: "0 18px", color: "#ccc", fontSize: 16, fontWeight: 300, lineHeight: 1 }}>|</span>
      <div style={{ display: "flex", gap: 24 }}>
        {links.map((n) => {
          const key = n.p.replace("/", "");
          const isActive = active === key;
          return (
            <button key={n.p} onClick={() => navigate(n.p)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 12, letterSpacing: ".08em",
              fontWeight: isActive ? 700 : 400,
              color: isActive ? "#111" : "#666",
              padding: "2px 0",
              borderBottom: isActive ? "1px solid #111" : "1px solid transparent",
              transition: "all .2s",
            }}>{n.l}</button>
          );
        })}
      </div>
    </nav>
  );
}

function Footer() {
  const [, navigate] = useLocation();
  return (
    <footer className="dg-footer">
      <div className="dg-fwrap">
        <div>
          <div className="dg-fbrand">Daguk Textile</div>
          <p style={{ marginTop: 12 }}>다국텍스타일</p>
        </div>
        <div>
          <h4>Navigate</h4>
          {[{ l: "Company", p: "/company" }, { l: "Products", p: "/business" }, { l: "Contact", p: "/contact" }].map((n) => (
            <button key={n.p} onClick={() => navigate(n.p)} style={{ background: "none", border: "none", padding: 0, display: "block", color: "var(--fg)", fontSize: 14, fontWeight: 300, lineHeight: 2, opacity: .85, cursor: "pointer" }}>{n.l}</button>
          ))}
        </div>
        <div>
          <h4>Contact</h4>
          <p>031-543-6782</p>
          <p>dagook1869@daum.net</p>
          <p>경기도 포천시 가산면 메나리길 29</p>
        </div>
      </div>
      <p className="dg-copy">© {new Date().getFullYear()} Daguk Textile. All rights reserved.</p>
    </footer>
  );
}

const partners = [
  "WMISSION", "MATIN KIM", "DOFFJASON", "OPEN YY",
  "INSILENCE", "MARDI MERCREDI", "KOLON INDUSTRIES", "BCBG",
  "ADER", "YOUSER", "RE RHÉE", "SOGNAREBY",
  "MONOPHOBIA", "THUG CLUB", "LEDUM", "SHOEHI SEOUL",
  "FREAKS", "HYK",
];

export default function ContactPage() {
  useScrollReveal();
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ company: "", name: "", tel: "", email: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const info = [
    { label: "ADDRESS", value: "경기도 포천시 가산면 메나리길 29" },
    { label: "TEL", value: "031-543-6782" },
    { label: "FAX", value: "031-543-6792" },
    { label: "EMAIL", value: "dagook1869@daum.net" },
    { label: "HOURS", value: "평일 09:00 – 18:00 (토·일 휴무)" },
  ];

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="grain" />
      <Nav active="contact" />

      {/* Page Hero */}
      <div className="dg-page-hero">
        <div className="eyetag reveal"><span className="ln" /><span>Contact</span></div>
        <h1 className="reveal">비즈니스<br />문의</h1>

      </div>

      <hr className="dg-divider" />

      {/* Info + Form */}
      <div className="dg-section">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: 80 }} className="dg-two-col contact-wrap">

          {/* Info */}
          <div className="reveal">
            <div className="dg-eyebrow" style={{ marginBottom: 24 }}><span className="ln" /><span>연락처</span></div>
            <div style={{ borderTop: "1px solid var(--line)" }}>
              {info.map((item) => (
                <div key={item.label} style={{ display: "flex", gap: 28, padding: "18px 0", borderBottom: "1px solid var(--line)" }}>
                  <span style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--dim)", textTransform: "uppercase", width: 68, flexShrink: 0, paddingTop: 2 }}>{item.label}</span>
                  <span style={{ fontSize: 14, color: "var(--fg)", fontWeight: 300, lineHeight: 1.7 }}>{item.value}</span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 28, fontSize: 13, color: "var(--dim)", lineHeight: 1.9 }}>
              카카오톡 채널 <span style={{ color: "var(--fg)" }}>@다국텍스타일</span>로도 문의 가능합니다.
            </p>
          </div>

          {/* Form */}
          <div className="reveal">
            <div className="dg-eyebrow" style={{ marginBottom: 24 }}><span className="ln" /><span>문의 양식</span></div>
            {submitted ? (
              <div style={{ padding: "60px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 20, color: "var(--glow)" }}>✓</div>
                <h3 style={{ fontFamily: "var(--kr)", fontSize: 24, fontWeight: 700, color: "var(--fg)", marginBottom: 12 }}>문의가 접수되었습니다.</h3>
                <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9 }}>
                  영업일 기준 1~2일 내로 연락드리겠습니다.<br />
                  급하신 경우 031-543-6782로 전화 주세요.
                </p>
                <button className="dg-btn-ghost" style={{ marginTop: 32 }}
                  onClick={() => { setSubmitted(false); setForm({ company: "", name: "", tel: "", email: "", type: "", message: "" }); }}>
                  새 문의하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="dg-form">
                <div className="dg-contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  <div className="field">
                    <label>회사명</label>
                    <input type="text" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="(주)브랜드명" />
                  </div>
                  <div className="field">
                    <label>담당자명</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="홍길동" />
                  </div>
                </div>
                <div className="dg-contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  <div className="field">
                    <label>연락처</label>
                    <input type="tel" required value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} placeholder="010-0000-0000" />
                  </div>
                  <div className="field">
                    <label>이메일</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="brand@example.com" />
                  </div>
                </div>
                <div className="field">
                  <label>문의 유형</label>
                  <select required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                    style={{ background: "#080a0e", color: "var(--fg)" }}>
                    <option value="">선택해주세요</option>
                    <option value="sample">샘플 요청</option>
                    <option value="spec">스펙 확인</option>
                    <option value="order">주문 문의</option>
                    <option value="visit">공장 방문</option>
                    <option value="other">기타</option>
                  </select>
                </div>
                <div className="field">
                  <label>문의 내용</label>
                  <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="원단 종류, 예상 수량, 납기 등 자유롭게 작성해주세요." />
                </div>
                <button type="submit" className="dg-btn">문의 보내기 →</button>
              </form>
            )}
          </div>
        </div>
      </div>

      <hr className="dg-divider" />

      {/* Map */}
      <div className="dg-section">
        <div className="dg-eyebrow reveal"><span className="ln" /><span>Location</span></div>
        <div className="reveal" style={{ width: "100%", aspectRatio: "21/9", overflow: "hidden", border: "1px solid var(--line)" }}>
          <iframe
            src="https://maps.google.com/maps?q=경기도+포천시+가산면+메나리길+29&output=embed&z=15"
            style={{ width: "100%", height: "100%", filter: "invert(90%) hue-rotate(180deg) grayscale(20%) brightness(0.85)", border: "none" }}
            loading="lazy"
            title="DAGUK TEXTILE 위치"
          />
        </div>
        <p className="reveal" style={{ marginTop: 12, fontSize: 11, color: "var(--dim)" }}>경기도 포천시 가산면 메나리길 29 — 방문 전 사전 연락 바랍니다</p>
      </div>

      <Footer />
    </div>
  );
}
