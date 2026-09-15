import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";

beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
});

describe("App", () => {
  it("인트로 화면에서 시작 버튼을 누르면 첫 번째 질문으로 이동한다", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("MBTI");

    await user.click(screen.getByRole("button", { name: "테스트 시작하기" }));

    expect(screen.getByText("1 / 12")).toBeInTheDocument();
  });

  it("질문에 답하면 다음 문항으로 진행률이 증가한다", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "테스트 시작하기" }));
    const [, firstOption] = screen.getAllByRole("button");
    await user.click(firstOption);

    await screen.findByText("2 / 12");
  });
});
