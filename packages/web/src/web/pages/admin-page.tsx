import { useEffect, useState } from "react";

type Inquiry = {
  id: number;
  company: string;
  name: string;
  tel: string | null;
  email: string | null;
  type: string | null;
  message: string;
  createdAt: string;
};

const STORAGE_KEY = "dg_admin_pw";

export default function AdminPage() {
  const [password, setPassword] = useState(() => sessionStorage.getItem(STORAGE_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [list, setList] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchList = async (pw: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/inquiries", { headers: { "x-admin-password": pw } });
      if (res.status === 401) {
        setAuthed(false);
        sessionStorage.removeItem(STORAGE_KEY);
        setError("비밀번호가 올바르지 않습니다.");
        return;
      }
      if (!res.ok) throw new Error("불러오기 실패");
      const data = await res.json();
      setList(data);
      setAuthed(true);
      sessionStorage.setItem(STORAGE_KEY, pw);
    } catch {
      setError("문의 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) fetchList(password);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchList(password);
  };

  const typeLabel: Record<string, string> = {
    sample: "샘플 요청",
    spec: "스펙 확인",
    order: "주문 문의",
    visit: "공장 방문",
    other: "기타",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0b0d", color: "#eee", fontFamily: "'Pretendard Variable', Pretendard, sans-serif", padding: "60px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>문의 관리</h1>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 32 }}>다국텍스타일 웹사이트로 접수된 비즈니스 문의 목록</p>

        {!authed ? (
          <form onSubmit={handleLogin} style={{ display: "flex", gap: 12, maxWidth: 360 }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="관리자 비밀번호"
              style={{ flex: 1, padding: "10px 14px", background: "#15171a", border: "1px solid #2a2d31", borderRadius: 6, color: "#eee", fontSize: 14 }}
            />
            <button type="submit" disabled={loading} style={{ padding: "10px 20px", background: "#e05a4a", border: "none", borderRadius: 6, color: "#fff", fontSize: 14, cursor: "pointer" }}>
              {loading ? "확인 중..." : "확인"}
            </button>
          </form>
        ) : (
          <>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>총 {list.length}건</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {list.length === 0 && <p style={{ color: "#666" }}>아직 접수된 문의가 없습니다.</p>}
              {list.map((item) => (
                <div key={item.id} style={{ border: "1px solid #22252a", borderRadius: 10, padding: 20, background: "#111214" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: 16 }}>{item.company}</span>
                      <span style={{ marginLeft: 10, fontSize: 13, color: "#aaa" }}>{item.name}</span>
                      {item.type && (
                        <span style={{ marginLeft: 10, fontSize: 11, color: "#e05a4a", border: "1px solid #e05a4a55", borderRadius: 4, padding: "2px 8px" }}>
                          {typeLabel[item.type] || item.type}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: 12, color: "#666" }}>{new Date(item.createdAt).toLocaleString("ko-KR")}</span>
                  </div>
                  <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#999", marginBottom: 12, flexWrap: "wrap" }}>
                    {item.tel && <span>📞 {item.tel}</span>}
                    {item.email && <span>✉️ {item.email}</span>}
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap", color: "#ddd" }}>{item.message}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {error && <p style={{ color: "#e05a4a", fontSize: 13, marginTop: 16 }}>{error}</p>}
      </div>
    </div>
  );
}
