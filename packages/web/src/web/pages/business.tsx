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
  return (
    <nav className="dg-nav dg-nav-solid">
      <button className="dg-brand" onClick={() => navigate("/")}>
        <img src="/dg-logo.png" alt="DG" />
        DAGUK TEXTILE
      </button>
      <div className="dg-navlinks">
        <button onClick={() => navigate("/company")} className={active === "company" ? "active" : ""}>Company</button>
        <button onClick={() => navigate("/business")} className={active === "business" ? "active" : ""}>Products</button>
        <button onClick={() => navigate("/contact")} className={active === "contact" ? "active" : ""}>Contact</button>
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

const products = [
  // 립 2*1 제품
  { code: "CM20SP140 2×1", name: "CM20SP140 2×1", cat: "립", img: "/products/rib-cm20sp140-2x1.png", desc: "20수 SP140 2×1 립. 쮸리립으로 많이 사용되며 신축성과 회복력이 우수합니다." },
  { code: "CM20SP70 2×1", name: "CM20SP70 2×1", cat: "립", img: "/products/rib-cm20sp70-2x1.png", desc: "20수 SP70 2×1 립. 쮸리립 용도로 활용되며 부드러운 터치감이 특징입니다." },
  { code: "CM30SP140 2×1", name: "CM30SP140 2×1", cat: "립", img: "/products/rib-cm30sp140-2x1.png", desc: "30수 SP140 2×1 립. 미니쮸리, 양면, 인터록 용도로 널리 사용됩니다." },
  { code: "CM30SP70 2×1", name: "CM30SP70 2×1", cat: "립", img: "/products/rib-cm30sp70-2x1.png", desc: "30수 SP70 2×1 립. 미니쮸리, 양면, 인터록 소재로 최적입니다." },
  { code: "CM30이합 SP140 2×1", name: "CM30이합 SP140 2×1", cat: "립", img: "/products/rib-cm30twop-sp140-2x1.png", desc: "30수 투플라이 SP140 2×1 립. 쮸리 및 헤비쮸리 용도에 적합한 중량감 있는 원단입니다." },
  { code: "CM30이합 SP70 2×1", name: "CM30이합 SP70 2×1", cat: "립", img: "/products/rib-cm30twop-sp70-2x1.png", desc: "30수 투플라이 SP70 2×1 립. 쮸리·헤비쮸리에 사용되는 두꺼운 립 원단입니다." },
  // 립 1*1 노스판
  { code: "CM30단사 1×1", name: "CM30단사 1×1 노스판", cat: "립", img: "/products/rib-cm30single-1x1.png", desc: "30수 단사 노스판 1×1 립. 싱글립으로 많이 사용되며 넥밴드·소매 밴드에 적합합니다." },
  { code: "CM20단사 1×1", name: "CM20단사 1×1 노스판", cat: "립", img: "/products/rib-cm20single-1x1.png", desc: "20수 단사 노스판 1×1 립. 싱글립 용도로 가볍고 부드러운 착용감을 제공합니다." },
  { code: "CM40단사 1×1", name: "CM40단사 1×1 노스판", cat: "립", img: "/products/rib-cm40single-1x1.png", desc: "40수 단사 노스판 1×1 립. 고밀도 싱글립으로 섬세하고 매끄러운 표면이 특징입니다." },
  { code: "CM30이합 1×1", name: "CM30이합 1×1 노스판", cat: "립", img: "/products/rib-cm30twop-1x1.png", desc: "30수 이합 노스판 1×1 립. 쮸리 용도에 적합한 중량감 있는 립 원단입니다." },
  { code: "CM20이합 1×1", name: "CM20이합 1×1 노스판", cat: "립", img: "/products/rib-cm20twop-1x1.png", desc: "20수 이합 노스판 1×1 립. 헤비쮸리 용도로 두껍고 탄탄한 조직감을 자랑합니다." },
  // CVC
  { code: "CVC20단사 1×1", name: "CVC20단사 1×1 노스판", cat: "립", img: "/products/cvc-1x1-rib.png", desc: "면 60% 폴리에스터 40% CVC 혼방 20수 단사 1×1 립. 부드러운 터치감과 형태 안정성을 동시에 갖춘 싱글립 원단입니다." },
  { code: "CVC30단사 1×1", name: "CVC30단사 1×1", cat: "립", img: "/products/cvc-1x1-rib.png", desc: "CVC 혼방 30수 단사 1×1 립. 흡습성과 내구성이 뛰어나 넥밴드·소매 밴드에 적합합니다." },
  { code: "CVC30SP140 2×1", name: "CVC30SP140 2×1", cat: "립", img: "/products/golgi-2x1-rib.png", desc: "CVC 혼방 30수 SP140 2×1 립. 쮸리·양면 용도에 적합하며 혼방 소재 특유의 형태 회복력이 우수합니다." },
  { code: "CVC40 1×1", name: "CVC40 1×1 노스판", cat: "립", img: "/products/cvc-1x1-rib.png", desc: "CVC 혼방 40수 1×1 노스판 립. 고밀도 싱글립으로 섬세하고 매끄러운 표면이 특징입니다." },
  { code: "CVC30이합 노스판", name: "CVC30이합 노스판", cat: "립", img: "/products/cvc-1x1-rib.png", desc: "CVC 혼방 30수 이합 노스판 립. 두께감 있는 쮸리 용도에 적합하며 혼방 소재의 안정적인 조직감이 특징입니다." },
  // TC
  { code: "TC 65/35", name: "TC 65/35", cat: "립", img: "/products/rib-tc65-35.png", desc: "폴리에스터 65% 면 35% 혼방 립. 내구성이 높고 구김이 적어 다양한 용도에 활용됩니다." },
  // 골지
  { code: "DG-G01", name: "골지 2×1", cat: "골지", img: "/products/golgi-2x1-rib.png", desc: "2×1 조직의 골지 원단. 두 줄 올라오고 한 줄 들어가는 리브 패턴으로 탄탄한 신축성과 입체감이 특징입니다." },
  { code: "DG-G02", name: "골지 더블 2×1", cat: "골지", img: "/products/golgi-2x1-rib.png", desc: "더블 구조의 2×1 골지. 앞뒤 동일한 조직으로 셋업·트레이닝복 소재로 선호됩니다." },
  // 후라이스
  { code: "DG-F01", name: "후라이스 1×1", cat: "후라이스", img: "/products/fryce-1x1-rib.png", desc: "1×1 조직의 후라이스. 밀도 높은 루프 구조로 보온성·내구성이 뛰어나며 겨울 이너·기모 가공에 사용됩니다." },
  { code: "DG-F02", name: "후라이스 기모 1×1", cat: "후라이스", img: "/products/fryce-1x1-rib.png", desc: "1×1 후라이스에 기모 가공을 더한 원단. 보온성이 높아 겨울 이너·방한 의류에 적합합니다." },
  // 와플
  { code: "DG-W01", name: "와플 싱글", cat: "와플", img: "/hwoasung/p1.jpg", desc: "격자형 요철 조직으로 흡습성·통기성이 뛰어납니다. 여름 이너·캐주얼 상의에 활용됩니다." },
  { code: "DG-W02", name: "와플 더블", cat: "와플", img: "/hwoasung/p2.jpg", desc: "두꺼운 더블 와플 조직. 보온성·볼륨감을 살린 아우터·셋업 소재로 선호됩니다." },
  // 편직 기계
  { code: "DG-M01", name: "편직 기계 20수", cat: "편직 기계", img: "/hwoasung/p3.jpg", desc: "20게이지 원통 편직기. 중간 두께 원단 생산에 최적화되어 있습니다." },
  { code: "DG-M02", name: "편직 기계 28수", cat: "편직 기계", img: "/hwoasung/p4.jpg", desc: "28게이지 고밀도 편직기. 얇고 섬세한 고급 원단 생산에 사용됩니다." },
];

export default function Business() {
  useScrollReveal();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"all" | "편직 기계" | "립" | "골지" | "후라이스" | "와플">("all");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const filtered = activeTab === "all" ? products : products.filter((p) => p.cat === activeTab);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="grain" />
      <Nav active="business" />

      {/* Page Hero */}
      <div className="dg-page-hero">
        <div className="eyetag reveal"><span className="ln" /><span>Products</span></div>
        <h1 className="reveal">Knitting · Greige<br />&amp; Finishing</h1>
        <p className="tagline reveal">Daimaru, Rib, Golgi — full lineup. From sample to mass production.</p>
      </div>

      <hr className="dg-divider" />

      {/* UNIT 01 */}
      <div className="dg-section">
        <div className="dg-eyebrow reveal"><span className="ln" /><span>Unit 01</span><span className="sub">편직 / 생지</span></div>
        <div className="dg-two-col">
          <div className="reveal">
            <h2 className="dg-big" style={{ fontSize: "clamp(28px,3.8vw,48px)" }}>편직 / 생지</h2>
            <p className="dg-lead" style={{ marginTop: 28 }}>
              최신 고성능 환편기와 다양한 게이지의 설비 인프라를 통해, 어떠한 샘플 스펙에도 즉각적으로 대응하는 탄탄한 생산 기반을 갖추고 있습니다.
            </p>
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
              {["고성능 환편기 25대 운용", "다양한 게이지 — 7G·12G·14G·18G", "면·폴리·레이온·혼방 전 소재 대응", "즉시 생산 가능 — 일반 납기 대비 단축"].map((v) => (
                <div key={v} style={{ display: "flex", gap: 12, fontSize: 14, color: "var(--dim)", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--glow)" }}>—</span><span>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal" style={{ order: -1 }}>
            <img src="/hwoasung/knitting_unit.jpg" alt="편직 생지" className="dg-img" />
          </div>
        </div>
      </div>

      <hr className="dg-divider" />

      {/* UNIT 02 */}
      <div className="dg-section">
        <div className="dg-eyebrow reveal"><span className="ln" /><span>Unit 02</span><span className="sub">가공 인벤토리</span></div>
        <div className="dg-two-col">
          <div className="reveal">
            <img src="/hwoasung/p3.jpg" alt="골지 원단 클로즈업" className="dg-img" />
          </div>
          <div className="reveal">
            <h2 className="dg-big" style={{ fontSize: "clamp(28px,3.8vw,48px)" }}>가공 인벤토리</h2>
            <p className="dg-lead" style={{ marginTop: 28 }}>
              다국텍스타일이 엄선하고 데이터화한 프리미엄 편직 원단 인벤토리입니다. 다이마루·립·골지 전 라인업을 즉시 확인하고 샘플을 요청하세요.
            </p>
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
              {["기성 재고 즉시 출고 가능", "색상·중량·게이지 전 스펙 제공", "최소 주문량 협의 가능 (소량 OK)", "샘플 요청 후 3일 내 발송"].map((v) => (
                <div key={v} style={{ display: "flex", gap: 12, fontSize: 14, color: "var(--dim)", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--glow)" }}>—</span><span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="dg-divider" />

      {/* Archive */}
      <div className="dg-section">
        <div className="dg-eyebrow reveal"><span className="ln" /><span>Archive</span></div>
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 48 }}>
          <h2 className="dg-big" style={{ fontSize: "clamp(28px,3.8vw,48px)" }}>제품 아카이브</h2>
          <div style={{ display: "flex", gap: 8 }}>
            {(["all", "편직 기계", "립", "골지", "후라이스", "와플"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: "10px 18px",
                fontSize: 10,
                letterSpacing: ".15em",
                fontWeight: 700,
                background: activeTab === tab ? "var(--fg)" : "transparent",
                color: activeTab === tab ? "var(--bg)" : "var(--dim)",
                border: "1px solid",
                borderColor: activeTab === tab ? "var(--fg)" : "var(--line)",
                transition: "all .3s",
                cursor: "pointer",
              }}>
                {tab === "all" ? "전체" : tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 32 }}>
          {filtered.map((p, i) => (
            <div key={p.code}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: "pointer" }}>
              <div style={{ position: "relative", overflow: "hidden", marginBottom: 12 }}>
                <img src={p.img} alt={p.name} style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", transition: "transform .7s cubic-bezier(.16,1,.3,1)", transform: hoveredIdx === i ? "scale(1.05)" : "scale(1)" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(4,5,7,.8)", display: "flex", alignItems: "flex-end", padding: 16, transition: "opacity .3s", opacity: hoveredIdx === i ? 1 : 0 }}>
                  <p style={{ fontSize: 12, color: "rgba(233,237,242,.7)", lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </div>
              <p style={{ fontSize: 10, fontFamily: "monospace", color: "var(--glow)", letterSpacing: ".1em", marginBottom: 4 }}>{p.code}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--fg)" }}>{p.name}</p>
              <p style={{ fontSize: 11, color: "var(--dim)", letterSpacing: ".06em" }}>{p.cat}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="dg-divider" />

      {/* Process */}
      <div className="dg-section">
        <div className="dg-eyebrow reveal"><span className="ln" /><span>Process</span></div>
        <h2 className="dg-big reveal" style={{ fontSize: "clamp(28px,3.8vw,48px)", marginBottom: 56 }}>샘플부터 납품까지</h2>

        <div className="reveal-stagger dg-process-grid">
          {[
            { step: "01", title: "샘플 접수", desc: "사진·실물 샘플 또는 스펙 문서를 보내주세요. 원단명 몰라도 됩니다." },
            { step: "02", title: "스펙 분석", desc: "조직·게이지·소재를 분석해 최적 스펙을 제안합니다. 보통 1~2일 내." },
            { step: "03", title: "샘플 생산", desc: "스펙 확정 후 샘플 원단 제작. 소량 테스트 가능합니다." },
            { step: "04", title: "본 납품", desc: "샘플 승인 후 일정 협의하여 대량 생산 및 납품." },
          ].map((s) => (
            <div key={s.step} style={{ background: "var(--bg)", padding: "40px 28px" }}>
              <span style={{ fontSize: 10, letterSpacing: ".22em", color: "var(--glow)", display: "block", marginBottom: 20 }}>{s.step}</span>
              <h3 style={{ fontFamily: "var(--kr)", fontSize: 18, fontWeight: 600, color: "var(--fg)", marginBottom: 14 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.9, fontWeight: 300 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="dg-divider" />

      {/* CTA */}
      <div className="dg-section" style={{ textAlign: "center", padding: "80px 36px" }}>
        <h2 className="reveal" style={{ fontFamily: "var(--kr)", fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "var(--fg)", marginBottom: 16 }}>샘플 문의하기</h2>
        <p className="reveal" style={{ color: "var(--dim)", marginBottom: 40 }}></p>
        <div className="reveal">
          <button className="dg-btn" onClick={() => navigate("/contact")}>지금 문의하기 →</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
