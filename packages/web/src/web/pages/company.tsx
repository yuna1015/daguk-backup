import { useEffect } from "react";
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
        <img src="/dg-logo-dark.png" alt="DG" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} style={{ height: 32, display: "block", verticalAlign: "middle", flexShrink: 0 }} />
      </button>
      <span style={{ margin: "0 18px", color: "#ccc", fontSize: 16, fontWeight: 300, lineHeight: "60px", alignSelf: "center" }}>|</span>
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

export default function Company() {
  useScrollReveal();
  const [, navigate] = useLocation();

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="grain" />
      <Nav active="company" />

      {/* Page Hero */}
      <div className="dg-page-hero">
        <div className="eyetag reveal"><span className="ln" /><span>Company</span></div>
        <h1 className="reveal">다국텍스타일</h1>
        <p className="tagline reveal">1991년부터 이어온 니트 편직의 본질</p>
      </div>

      <hr className="dg-divider" />

      {/* Story */}
      <div className="dg-section">
        <div>
          <div className="reveal" style={{ paddingTop: 12 }}>
            <div className="dg-eyebrow"><span className="ln" /><span>Since 1991</span></div>
            <h2 className="dg-big" style={{ fontSize: "clamp(28px,3.8vw,48px)" }}>
              1991년부터 이어온<br />니트 편직의 본질
            </h2>
            <p className="dg-lead" style={{ marginTop: 28 }}>
              다국텍스타일은 30년이 넘는 시간 동안 다이마루 립·골지 편직 원단을 자체 생산해온 전문 제조사입니다. 정직한 소통과 투명한 공정 관리를 바탕으로 납품을 합니다.
              
            </p>
          </div>
        </div>
      </div>

      <hr className="dg-divider" />

      {/* Values */}
      <div className="dg-section">
        <div className="dg-eyebrow reveal"><span className="ln" /><span>Core Values</span></div>
        <h2 className="dg-big reveal">Our Standards</h2>

        <div className="reveal-stagger dg-values-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "1px",
          background: "var(--line)",
          marginTop: 56,
        }}>
          {[
            { n: "01", title: "정직한 소통", desc: "공정 단계마다 투명하게 공유합니다. 납기 지연이 생기면 먼저 연락드립니다." },
            { n: "02", title: "안정적인 생산 운영", desc: "자체 편직 라인 25대를 안정적으로 운영하며, 각 롯의 편차를 줄이기 위해 기본 검수를 반복합니다." },
            { n: "03", title: "30년 파트너십", desc: "단순 거래가 아닌 지속적인 협력 관계를 추구합니다. 신규 브랜드도 장기 파트너로 성장시킵니다." },
          ].map((v) => (
            <div key={v.n} style={{ background: "var(--bg)", padding: "48px 32px" }}>
              <span style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--glow)", display: "block", marginBottom: 20 }}>{v.n}</span>
              <h3 style={{ fontFamily: "var(--kr)", fontSize: 22, fontWeight: 600, color: "var(--fg)", marginBottom: 18 }}>{v.title}</h3>
              <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, fontWeight: 300 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="dg-divider" />

      {/* Stats */}
      <div className="dg-section">
        <div className="dg-metrics reveal-stagger">
          {[
            { num: "1991", lbl: "Founded", sub: "설립 연도" },
            { num: "25대", lbl: "Machines", sub: "편직 기계" },
            { num: "24h", lbl: "Production", sub: "생산 가동" },
            { num: "100%", lbl: "자체 생산", sub: "In-house Knitting / 자체 편직" },
          ].map((m) => (
            <div className="dg-metric" key={m.lbl}>
              <div className="num">{m.num}</div>
              <div className="lbl">{m.lbl}<br /><span className="sub">{m.sub}</span></div>
            </div>
          ))}
        </div>
      </div>

      <hr className="dg-divider" />

      {/* Location */}
      <div className="dg-section">
        <div className="dg-eyebrow reveal"><span className="ln" /><span>Location</span></div>
        <h2 className="dg-big reveal" style={{ fontSize: "clamp(28px,3.8vw,48px)", marginBottom: 56 }}>찾아오는 길</h2>

        <div className="dg-two-col reveal">
          <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--line)" }}>
            {[
              { label: "ADDRESS", value: "경기도 포천시 가산면 메나리길 29" },
              { label: "TEL", value: "031-543-6782" },
              { label: "FAX", value: "031-543-6792" },
              { label: "EMAIL", value: "dagook1869@daum.net" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: 32, padding: "20px 0", borderBottom: "1px solid var(--line)" }}>
                <span style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--dim)", textTransform: "uppercase", width: 72, flexShrink: 0, paddingTop: 2 }}>{item.label}</span>
                <span style={{ fontSize: 14, color: "var(--fg)", fontWeight: 300 }}>{item.value}</span>
              </div>
            ))}
            <p style={{ marginTop: 20, fontSize: 11, color: "var(--dim)" }}>※ 방문 전 사전 연락 바랍니다</p>
          </div>
          <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden", border: "1px solid var(--line)" }}>
            <iframe
              src="https://maps.google.com/maps?q=경기도+포천시+가산면+메나리길+29&output=embed&z=15"
              style={{ width: "100%", height: "100%", filter: "invert(90%) hue-rotate(180deg) grayscale(20%) brightness(0.85)", border: "none" }}
              loading="lazy"
              title="DAGUK TEXTILE 위치"
            />
          </div>
        </div>
      </div>

      <hr className="dg-divider" />

      {/* CTA */}
      <div className="dg-section" style={{ textAlign: "center", padding: "80px 36px" }}>
        <h2 className="reveal" style={{ fontFamily: "var(--kr)", fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "var(--fg)", marginBottom: 16 }}>파트너가 되어주세요.</h2>
        <p className="reveal" style={{ color: "var(--dim)", marginBottom: 40 }}>제품·샘플 문의 언제든지 환영합니다.</p>
        <div className="reveal" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="dg-btn" onClick={() => navigate("/contact")}>비즈니스 문의 →</button>
          <button className="dg-btn-ghost" onClick={() => navigate("/business")}>제품 보기</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
