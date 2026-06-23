import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { NavBar } from "./NavBar";

// ─── Scroll reveal ────────────────────────────────────────────────────────────
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

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const vidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = vidRef.current;
    if (vid) { vid.play().catch(() => {}); }

    // 히어로 벗어났다 돌아올 때 강제 재생
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && vid) {
            vid.play().catch(() => {});
          }
        });
      },
      { threshold: 0.01 }
    );
    if (vid) io.observe(vid);

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let sy = 0;
    let raf: number;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 14;
      ty = (e.clientY / window.innerHeight - 0.5) * 14;
    };
    const onLeave = () => { tx = 0; ty = 0; };
    const onScroll = () => {
      sy = window.scrollY;
      // 스크롤 복귀 시 멈춘 영상 강제 재생
      if (sy < 20 && vid && vid.paused) {
        vid.play().catch(() => {});
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function frame() {
      cx = lerp(cx, tx, 0.05);
      cy = lerp(cy, ty, 0.05);
      if (vid) {
        const parallax = Math.min(sy * 0.04, 60);
        vid.style.transform = `scale(1.08) translate(${cx.toFixed(2)}px,${(cy - parallax).toFixed(2)}px)`;
      }
      raf = requestAnimationFrame(frame);
    }
    frame();

    const onVisible = () => { if (!document.hidden && vid && vid.paused) vid.play().catch(() => {}); };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <section id="hero" className="dg-hero">
      <video
        ref={vidRef}
        id="heroVid"
        className="dg-hero-bg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ willChange: "transform", filter: "saturate(0.9) contrast(1.05)" }}
      >
        <source src="/hwoasung/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="dg-hero-veil" />

      <div className="dg-hero-title">
        <p className="hero-quote">&ldquo;The Original in Rib Knit&rdquo;</p>
        <div className="hero-brand-row">
          <span className="hero-brand-kr">다국텍스타일</span>
          {/* D 심볼 인라인 SVG */}
          <svg className="hero-brand-sym" viewBox="-1 -1 55 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 37V0L27.5 0.25C35 0.75 52 8.5 47.3 28.2C44 43 25.8 45.7 17.8 45V13L26 12.7V37C31 37.1 40.7 34.1 39.7 20.3C39.3 14.6 35.6 10.8 30.8 9.2C24 6.8 14.9 8 8.2 8V37H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      <div className="scroll-hint">
        <span>SCROLL</span>
        <span className="bar" />
      </div>
    </section>
  );
}

// ─── Company block ────────────────────────────────────────────────────────────
function CompanyBlock() {
  return (
    <section style={{ background: "var(--bg)" }}>
      <div className="dg-block">
        <div className="dg-eyebrow reveal">
          <span className="ln" />
          <span>Company</span>
          <span className="sub">Since 1991</span>
        </div>
        <h2 className="dg-big reveal">
          1991년부터 이어온<br />니트 편직의 본질
        </h2>
        <p className="dg-lead reveal">
          다국텍스타일은 30년이 넘는 시간 동안 다이마루 립·골지 편직 원단을 자체 생산해온 전문 제조사입니다.
          정직한 소통과 투명한 공정 관리를 바탕으로 납품을 합니다.
        </p>

        <div className="dg-metrics reveal-stagger" style={{ marginTop: 60 }}>
          {[
            { num: "1991", lbl: "Founded", sub: "30년+ 장력" },
            { num: "25+", lbl: "Circular Knitting", sub: "원통 편직기" },
            { num: "24h", lbl: "Production Line", sub: "풀 가동" },
            { num: "100%", lbl: "In-house Production", sub: "자체 생산" },
          ].map((m) => (
            <div className="dg-metric" key={m.lbl}>
              <div className="num">{m.num}</div>
              <div className="lbl">{m.lbl}<br /><span className="sub">{m.sub}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────
function Products() {
  const [, navigate] = useLocation();
  const items = [
    { i: "01", en: "Rib", kr: "립 편직" },
    { i: "02", en: "Golgi", kr: "골지 편직" },
    { i: "03", en: "Fryce", kr: "후라이스" },
    { i: "04", en: "Waffle Knit", kr: "와플 편직" },
    { i: "05", en: "Machine Spec", kr: "편직 기계 사양" },
  ];

  return (
    <section style={{ background: "var(--bg)" }}>
      <div className="dg-block">
        <div className="dg-eyebrow reveal">
          <span className="ln" />
          <span>Products</span>
          <span className="sub">Fabric Library</span>
        </div>
        <h2 className="dg-big reveal" style={{ marginTop: 24, marginBottom: 0 }}>
          Fabric Library
        </h2>

        <div className="dg-prod-list">
          {items.map((item) => (
            <div
              key={item.i}
              className="prow"
              onClick={() => navigate("/business")}
              style={{ cursor: "pointer" }}
            >
              <span className="pi">{item.i}</span>
              <span className="pname">{item.en}</span>
              <span className="pkr">{item.kr}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Location ─────────────────────────────────────────────────────────────────
function Location() {
  return (
    <section style={{ background: "var(--bg)", padding: "80px 36px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="dg-eyebrow reveal">
          <span className="ln" />
          <span>Contact</span>
          <span className="sub">찾아오는 길</span>
        </div>
        <h2 className="dg-big reveal" style={{ marginBottom: 48 }}>
          다국텍스타일
        </h2>
        <div className="reveal dg-location-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 32, display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { lbl: "주소", val: "경기도 포천시 가산면 메나리길 29" },
              { lbl: "전화", val: "031-543-6782" },
              { lbl: "이메일", val: "dagook1869@daum.net" },
              { lbl: "운영시간", val: "평일 09:00 – 18:00" },
            ].map((r) => (
              <div key={r.lbl} style={{ display: "flex", gap: 24 }}>
                <span style={{ fontSize: 11, letterSpacing: ".2em", color: "var(--dim)", textTransform: "uppercase", minWidth: 64, paddingTop: 2 }}>{r.lbl}</span>
                <span style={{ fontSize: 15, fontWeight: 300, color: "var(--fg)", lineHeight: 1.6 }}>{r.val}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 32 }}>
            <iframe
              src="https://maps.google.com/maps?q=경기도+포천시+가산면+메나리길+29&output=embed"
              width="100%"
              height="280"
              style={{ border: "none", filter: "invert(90%) hue-rotate(180deg)", borderRadius: 4 }}
              loading="lazy"
              title="Daguk Textile 위치"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
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
          <button onClick={() => navigate("/company")} style={{ background: "none", border: "none", padding: 0, display: "block", color: "var(--fg)", fontSize: 14, fontWeight: 300, lineHeight: 2, opacity: .85, cursor: "pointer" }}>Company</button>
          <button onClick={() => navigate("/business")} style={{ background: "none", border: "none", padding: 0, display: "block", color: "var(--fg)", fontSize: 14, fontWeight: 300, lineHeight: 2, opacity: .85, cursor: "pointer" }}>Products</button>
          <button onClick={() => navigate("/contact")} style={{ background: "none", border: "none", padding: 0, display: "block", color: "var(--fg)", fontSize: 14, fontWeight: 300, lineHeight: 2, opacity: .85, cursor: "pointer" }}>Contact</button>
        </div>
        <div>
          <h4>Contact</h4>
          <p>031-543-6782</p>
          <p>dagook1869@daum.net</p>
          <p>경기도 포천시 가산면 메나리길 29</p>
        </div>
      </div>
      <div style={{ maxWidth: 1180, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 32, paddingTop: 20, fontSize: 12, opacity: 0.5, lineHeight: 2 }}>
        <p>상호명: 다국텍스타일 &nbsp;|&nbsp; 대표자: 이창업 &nbsp;|&nbsp; 사업자등록번호: 207-72-62958</p>
        <p>주소: 경기도 포천시 가산면 메나리길 29 &nbsp;|&nbsp; TEL: 031-543-6782 &nbsp;|&nbsp; FAX: 031-543-6792 &nbsp;|&nbsp; HP: 010-3213-1828</p>
      </div>
      <p className="dg-copy">© {new Date().getFullYear()} Daguk Textile. All rights reserved.</p>
    </footer>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Index() {
  useScrollReveal();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="grain" />
      <NavBar dark={true} />
      <Hero />
      <CompanyBlock />
      <Products />
      <Location />
      <Footer />
    </div>
  );
}
