import { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { useLocation } from "wouter";

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ src, name, cat, onClose }: { src: string; name: string; cat: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.88)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <img
        src={src}
        alt={name}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "min(800px, 90vw)",
          maxHeight: "80vh",
          objectFit: "contain",
          display: "block",
          borderRadius: 2,
        }}
      />
      <div onClick={(e) => e.stopPropagation()} style={{ marginTop: 20, textAlign: "center" }}>
        <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{name}</p>
        <p style={{ color: "#aaa", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase" }}>{cat}</p>
      </div>
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 20, right: 24,
          background: "none", border: "none", color: "#fff",
          fontSize: 28, cursor: "pointer", lineHeight: 1,
        }}
      >×</button>
    </div>
  );
}

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

const W = {
  bg: "#ffffff",
  fg: "#111111",
  dim: "#666666",
  line: "#e5e5e5",
  sub: "#999999",
} as const;

function Footer() {
  const [, navigate] = useLocation();
  return (
    <footer style={{ background: "#f7f7f7", borderTop: `1px solid ${W.line}`, padding: "56px 36px 32px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 40, marginBottom: 48 }}>
        <div>
          <div className="dg-fbrand" style={{ marginBottom: 12, color: "#111" }}>Daguk Textile</div>
          <p style={{ fontSize: 12, color: W.dim, lineHeight: 1.8 }}>다국텍스타일</p>
        </div>
        <div>
          <h4 style={{ fontSize: 11, letterSpacing: ".15em", color: W.sub, marginBottom: 16, fontWeight: 600 }}>NAVIGATE</h4>
          {[{ l: "Company", p: "/company" }, { l: "Products", p: "/business" }, { l: "Contact", p: "/contact" }].map((n) => (
            <button key={n.p} onClick={() => navigate(n.p)} style={{
              background: "none", border: "none", padding: 0, display: "block",
              color: W.dim, fontSize: 13, lineHeight: 2.2, cursor: "pointer",
            }}>{n.l}</button>
          ))}
        </div>
        <div>
          <h4 style={{ fontSize: 11, letterSpacing: ".15em", color: W.sub, marginBottom: 16, fontWeight: 600 }}>CONTACT</h4>
          <p style={{ fontSize: 12, color: W.dim, lineHeight: 2 }}>031-543-6782</p>
          <p style={{ fontSize: 12, color: W.dim, lineHeight: 2 }}>dagook1869@daum.net</p>
          <p style={{ fontSize: 12, color: W.dim, lineHeight: 2 }}>경기도 포천시 가산면 메나리길 29</p>
        </div>
      </div>
      <p style={{ fontSize: 11, color: W.sub, borderTop: `1px solid ${W.line}`, paddingTop: 24 }}>
        © {new Date().getFullYear()} Daguk Textile. All rights reserved.
      </p>
    </footer>
  );
}

const products: { code: string; name: string; cat: string; img: string; tag?: string; hideCaption?: boolean }[] = [
  { code: "CM20SP140 2×1", name: "CM20SP140 2×1", cat: "립", img: "/products/rib-2x1-white.png" },
  { code: "CM20SP70 2×1", name: "CM20SP70 2×1", cat: "립", img: "/products/rib-2x1-beige.png" },
  { code: "CM30SP140 2×1", name: "CM30SP140 2×1", cat: "립", img: "/products/rib-2x1-gray.png" },
  { code: "CM30SP70 2×1", name: "CM30SP70 2×1", cat: "립", img: "/products/golgi-2x1-orange.png" },
  { code: "CM30이합 SP140 2×1", name: "CM30이합 SP140 2×1", cat: "립", img: "/products/rib-2x1-navy.png" },
  { code: "CM30이합 SP70 2×1", name: "CM30이합 SP70 2×1", cat: "립", img: "/products/rib-2x1-gray.png" },
  { code: "CVC30SP140 2×1", name: "CVC30SP140 2×1", cat: "립", img: "/products/rib-2x1-beige.png" },
  { code: "TC 65/35 SP140 2×1", name: "TC 65/35 SP140 2×1", cat: "립", img: "/products/tc-sp140-navy.png" },
  { code: "TC 65/35 SP70 2×1", name: "TC 65/35 SP70 2×1", cat: "립", img: "/products/tc-sp70-burgundy.png" },

  { code: "CM30단사 1×1", name: "CM30단사 1×1 노스판", cat: "후라이스", img: "/products/rib-1x1-white.png" },
  { code: "CM20단사 1×1", name: "CM20단사 1×1 노스판", cat: "후라이스", img: "/products/rib-1x1-beige.png" },
  { code: "CM40단사 1×1", name: "CM40단사 1×1 노스판", cat: "후라이스", img: "/products/rib-1x1-gray.png" },
  { code: "CM30이합 1×1", name: "CM30이합 1×1 노스판", cat: "후라이스", img: "/products/rib-1x1-charcoal.png" },
  { code: "CM20이합 1×1", name: "CM20이합 1×1 노스판", cat: "후라이스", img: "/products/rib-1x1-gray.png" },
  { code: "CVC20단사 1×1", name: "CVC20단사 1×1 노스판", cat: "후라이스", img: "/products/cvc20-1x1-ivory.png" },
  { code: "CVC30단사 1×1", name: "CVC30단사 1×1", cat: "후라이스", img: "/products/cvc30-1x1-blush.png" },
  { code: "CVC40 1×1", name: "CVC40 1×1 노스판", cat: "후라이스", img: "/products/cvc40-1x1-stone.png" },
  { code: "CVC30이합 노스판", name: "CVC30이합 노스판", cat: "후라이스", img: "/products/cvc30ihap-1x1-sage.png" },
  { code: "TC 65/35 단사 1×1", name: "TC 65/35 단사 1×1", cat: "후라이스", img: "/products/tc-single-ivory.png" },
  { code: "TC 65/35 이합 1×1", name: "TC 65/35 이합 1×1", cat: "후라이스", img: "/products/tc-double-green.png" },

  { code: "DG-G03", name: "스트라이프 8×2 골지", cat: "골지", img: "/products/stripe-golgi-navy-real.png" },
  { code: "DG-G04", name: "포인텔 골지", cat: "골지", img: "/products/pointelle-cream-v3.png", tag: "NEW" },

  { code: "DG-F03", name: "스트라이프 1×1 후라이스", cat: "후라이스", img: "/products/stripe-fryce-1x1.jpg" },
  { code: "텐셀울 1×1", name: "텐셀울 혼방 1×1", cat: "후라이스", img: "/products/fryce-tencel-wool.png" },
  { code: "DG-W01", name: "와플 20수", cat: "와플", img: "/products/waffle-20s-drape.png" },

  { code: "CP CM40 PE75", name: "CP이중지 CM40 PE75", cat: "다이마루", img: "/products/daemaru-02.png" },
];

const TABS = ["all", "립", "골지", "후라이스", "와플", "다이마루"] as const;
type Tab = typeof TABS[number];

export default function Business() {
  useScrollReveal();
  const [, navigate] = useLocation();
  useEffect(() => {
    document.body.classList.add("light-page");
    return () => document.body.classList.remove("light-page");
  }, []);
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; name: string; cat: string } | null>(null);
  const filtered = (activeTab === "all" ? products : products.filter((p) => p.cat === activeTab))
    .filter((p) => p.cat !== "가공 인벤토리" && p.cat !== "편직 기계");

  return (
    <div style={{ background: W.bg, minHeight: "100vh", fontFamily: "Pretendard Variable, Pretendard, sans-serif" }}>
      {lightbox && <Lightbox src={lightbox.src} name={lightbox.name} cat={lightbox.cat} onClose={() => setLightbox(null)} />}
      <NavBar active="business" />

      {/* Page Hero */}
      <div className="biz-hero" style={{ padding: "80px 36px 64px", borderBottom: `1px solid ${W.line}` }}>
        <p style={{ fontSize: 10, letterSpacing: ".25em", color: W.sub, marginBottom: 24, textTransform: "uppercase" }}>Construction</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,64px)", fontWeight: 700, color: W.fg, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: 24 }}>
          편직 구조
        </h1>
        <p style={{ fontSize: 15, color: W.dim, maxWidth: 480, lineHeight: 2, letterSpacing: ".01em" }}>
          다이마루 · 립 · 골지 전 라인업.<br />샘플부터 대량 납품까지.
        </p>
      </div>

      {/* Unit 01 — 편직/생지 */}
      <div className="biz-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${W.line}` }}>
        <div style={{ padding: "64px 36px" }}>
          <p style={{ fontSize: 10, letterSpacing: ".2em", color: W.sub, marginBottom: 28 }}>UNIT 01 — 편직 / 생지</p>
          <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 700, color: W.fg, marginBottom: 24, lineHeight: 1.3 }}>편직 / 생지</h2>
          <p style={{ fontSize: 14, color: W.dim, lineHeight: 1.9, marginBottom: 32 }}>
            최신 고성능 환편기와 다양한 게이지의 설비 인프라를 통해, 어떠한 샘플 스펙에도 즉각적으로 대응하는 탄탄한 생산 기반을 갖추고 있습니다.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["원형 환편기 25대 풀가동 — 쌍용·금용·경보", "게이지 13.5G~24G 전 구간 커버", "36인치 7대 · 32인치 18대 — 광폭·정폭 동시 대응", "침수 최대 2,454 — 세밀 조직부터 굵은 립까지", "면·폴리·레이온·혼방 전 소재 대응"].map((v) => (
              <div key={v} style={{ display: "flex", gap: 12, fontSize: 13, color: W.dim, alignItems: "flex-start" }}>
                <span style={{ color: W.sub, flexShrink: 0 }}>—</span><span>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="biz-unit-img" style={{ overflow: "hidden", padding: "32px 32px 32px 0" }}>
          <img src="/hwoasung/knitting_unit.jpg" alt="편직 생지" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 360 }} />
        </div>
      </div>

      {/* Archive */}
      <div className="biz-archive" style={{ padding: "64px 36px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: ".2em", color: W.sub, marginBottom: 12 }}>ARCHIVE</p>
            <h2 style={{ fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 700, color: W.fg }}>제품 아카이브</h2>
          </div>
        </div>

        {/* 탭 필터 */}
        <div style={{ display: "flex", gap: 0, flexWrap: "wrap", borderBottom: `1px solid ${W.line}`, marginBottom: 40 }}>
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "12px 20px",
              fontSize: 12,
              letterSpacing: ".08em",
              fontWeight: activeTab === tab ? 700 : 400,
              background: "none",
              color: activeTab === tab ? W.fg : W.sub,
              border: "none",
              borderBottom: activeTab === tab ? `2px solid ${W.fg}` : "2px solid transparent",
              cursor: "pointer",
              transition: "all .2s",
              marginBottom: -1,
            }}>
              {tab === "all" ? "전체" : tab}
            </button>
          ))}
        </div>

        {/* 카드 그리드 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "40px 20px",
        }} className="biz-grid">
          {filtered.map((p, i) => (
            <div key={p.code}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setLightbox({ src: p.img, name: p.name, cat: p.cat })}
              style={{ cursor: "zoom-in" }}>
              <div style={{ overflow: "hidden", marginBottom: 12, background: "#f5f5f5", position: "relative", aspectRatio: "1/1", width: "100%" }}>
                <img
                  src={p.img}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center center",
                    display: "block",
                    transition: "transform .6s cubic-bezier(.16,1,.3,1)",
                    transform: hoveredIdx === i ? "scale(1.05)" : "scale(1)",
                  }}
                />
                {p.tag && (
                  <span style={{
                    position: "absolute", top: 10, left: 10,
                    background: W.fg, color: "#fff",
                    fontSize: 9, letterSpacing: ".15em", fontWeight: 700,
                    padding: "3px 8px",
                  }}>{p.tag}</span>
                )}
              </div>
              {!p.hideCaption && <p style={{ fontSize: 12, fontWeight: 600, color: W.fg, marginBottom: 4, lineHeight: 1.5, letterSpacing: ".01em" }}>{p.name}</p>}
              {!p.hideCaption && <p style={{ fontSize: 10, color: W.sub, letterSpacing: ".12em", textTransform: "uppercase" }}>{p.cat}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="biz-process" style={{ background: "#f7f7f7", borderTop: `1px solid ${W.line}`, padding: "72px 36px" }}>
        <p style={{ fontSize: 10, letterSpacing: ".2em", color: W.sub, marginBottom: 16 }}>PROCESS</p>
        <h2 style={{ fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 700, color: W.fg, marginBottom: 56 }}>샘플부터 납품까지</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2 }}>
          {[
            { step: "01", title: "샘플 접수", desc: "사진 · 실물 샘플 또는 스펙 문서를 보내주세요. 원단명 몰라도 됩니다." },
            { step: "02", title: "스펙 분석", desc: "조직 · 게이지 · 소재를 분석해 최적 스펙을 제안합니다. 보통 1~2일 내." },
            { step: "03", title: "샘플 생산", desc: "스펙 확정 후 샘플 원단 제작. 소량 테스트 가능합니다." },
            { step: "04", title: "본 납품", desc: "샘플 승인 후 일정 협의하여 대량 생산 및 납품." },
          ].map((s) => (
            <div key={s.step} style={{ background: "#fff", padding: "40px 28px", border: `1px solid ${W.line}` }}>
              <span style={{ fontSize: 10, letterSpacing: ".22em", color: W.sub, display: "block", marginBottom: 20 }}>{s.step}</span>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: W.fg, marginBottom: 14 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: W.dim, lineHeight: 1.9, fontWeight: 300 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="biz-cta" style={{ padding: "96px 36px", textAlign: "center", borderTop: `1px solid ${W.line}` }}>
        <h2 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: W.fg, marginBottom: 16 }}>샘플 문의하기</h2>
        <p style={{ color: W.dim, marginBottom: 40, fontSize: 15 }}>원단 스펙 · 수량 · 납기 — 편하게 물어보세요.</p>
        <button
          onClick={() => navigate("/contact")}
          style={{
            background: W.fg, color: "#fff", border: "none",
            padding: "16px 40px", fontSize: 13, letterSpacing: ".1em",
            fontWeight: 600, cursor: "pointer", transition: "opacity .2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = ".75")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          지금 문의하기 →
        </button>
      </div>

      <Footer />

      {/* 모바일 반응형 */}
      <style>{`
        @media (max-width: 768px) {
          .biz-two-col { grid-template-columns: 1fr !important; }
          .biz-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px 12px !important; }
          .biz-unit-img { padding: 0 20px 24px 20px !important; }
          .biz-two-col > div { padding-left: 20px !important; padding-right: 20px !important; padding-top: 36px !important; padding-bottom: 36px !important; }
          /* 히어로 섹션 */
          .biz-hero { padding: 48px 20px 36px !important; }
          /* 아카이브 섹션 */
          .biz-archive { padding: 40px 20px !important; }
          /* 프로세스 섹션 */
          .biz-process { padding: 40px 20px !important; }
          /* CTA 섹션 */
          .biz-cta { padding: 52px 20px !important; }
        }
      `}</style>
    </div>
  );
}
