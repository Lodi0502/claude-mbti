/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  // GitHub Pages 프로젝트 페이지(https://lodi0502.github.io/claude-mbti/)는
  // 서브 경로에 배포되므로, 프로덕션 빌드에서만 base를 저장소 이름으로 맞춘다.
  base: command === "build" ? "/claude-mbti/" : "/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    globals: true,
  },
}));
