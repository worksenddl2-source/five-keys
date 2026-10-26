// 서버 없이 브라우저만으로 동작하는 단일 HTML 버전의 진입점 (scripts/build-standalone.mjs 참고)
import { createRoot } from "react-dom/client";
import App from "@/components/App";

createRoot(document.getElementById("root")!).render(<App />);
