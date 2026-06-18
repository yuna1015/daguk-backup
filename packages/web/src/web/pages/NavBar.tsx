import { useState, useEffect } from "react";
import { useLocation } from "wouter";

const LINKS = [
  { l: "Company", p: "/company" },
  { l: "Products", p: "/business" },
  { l: "Contact", p: "/contact" },
];

export function NavBar({ active, dark = false }: { active?: string; dark?: boolean }) {
  const [, navigate] = useLocation();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 720);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // close on nav
  const go = (p: string) => { setOpen(false); navigate(p); };

  const fg = dark ? "#fff" : "#111";
  const bg = dark ? "rgba(4,5,7,.92)" : "#fff";
  const border = dark ? "1px solid rgba(255,255,255,.08)" : "1px solid #e5e5e5";
  const logo = dark ? "/dg-logo.png" : "/dg-logo-dark.png";

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 200,
        background: bg, borderBottom: border,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: mobile ? "0 20px" : "0 36px", height: 60,
      }}>
        {/* 왼쪽: 로고 + 브랜드명 */}
        <button onClick={() => go("/")} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 10, padding: 0, flexShrink: 0,
        }}>
          <img src={logo} alt="DG"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            style={{ height: 24, display: "block" }} />
          <span style={{
            fontFamily: "Pretendard Variable, sans-serif",
            fontSize: 13, fontWeight: 500, letterSpacing: ".22em",
            textTransform: "uppercase", color: fg,
          }}>DAGUK TEXTILE</span>
        </button>

        {/* 데스크탑: 링크 */}
        {!mobile && (
          <div style={{ display: "flex", gap: 30 }}>
            {LINKS.map((n) => {
              const key = n.p.replace("/", "");
              const isActive = active === key;
              return (
                <button key={n.p} onClick={() => go(n.p)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "Pretendard Variable, sans-serif",
                  fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? fg : dark ? "rgba(255,255,255,.5)" : "#888",
                  padding: 0,
                  borderBottom: isActive ? `1px solid ${fg}` : "1px solid transparent",
                  transition: "all .2s",
                }}>{n.l}</button>
              );
            })}
          </div>
        )}

        {/* 모바일: 햄버거 */}
        {mobile && (
          <button onClick={() => setOpen(!open)} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", gap: 5, padding: 6,
          }}>
            <span style={{
              display: "block", width: 22, height: 1.5, background: fg,
              transform: open ? "rotate(45deg) translate(4.5px, 4.5px)" : "none",
              transition: "transform .2s",
            }} />
            <span style={{
              display: "block", width: 22, height: 1.5, background: fg,
              opacity: open ? 0 : 1, transition: "opacity .15s",
            }} />
            <span style={{
              display: "block", width: 22, height: 1.5, background: fg,
              transform: open ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none",
              transition: "transform .2s",
            }} />
          </button>
        )}
      </nav>

      {/* 모바일 드롭다운 메뉴 */}
      {mobile && open && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0, zIndex: 199,
          background: bg, borderBottom: border,
          display: "flex", flexDirection: "column",
        }}>
          {LINKS.map((n) => {
            const key = n.p.replace("/", "");
            const isActive = active === key;
            return (
              <button key={n.p} onClick={() => go(n.p)} style={{
                background: "none", border: "none", borderBottom: `1px solid ${dark ? "rgba(255,255,255,.08)" : "#f0f0f0"}`,
                cursor: "pointer", padding: "18px 20px", textAlign: "left",
                fontFamily: "Pretendard Variable, sans-serif",
                fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? fg : dark ? "rgba(255,255,255,.55)" : "#888",
              }}>{n.l}</button>
            );
          })}
        </div>
      )}
    </>
  );
}
