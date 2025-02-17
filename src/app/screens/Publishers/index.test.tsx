import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import i18n from "~/../tests/unit/helpers/i18n";

import { AccountsProvider } from "../../context/AccountsContext";
import Publishers from "./index";

jest.mock("~/common/lib/utils", () => {
  return {
    call: jest.fn(() => ({
      allowances: [
        {
          host: "https://openai.com/dall-e-2/",
          name: "DALL·E 2",
          imageURL: "",
          enabled: true,
          lastPaymentAt: 1656408772800,
          totalBudget: 98756,
          remainingBudget: 98656,
          id: 1,
          usedBudget: 100,
          percentage: "0",
          paymentsCount: 1,
          paymentsAmount: "0100",
        },
      ],
    })),
  };
});

describe("Publishers", () => {
  test("renders active allowance", async () => {
    render(
      <AccountsProvider>
        <I18nextProvider i18n={i18n}>
          <MemoryRouter>
            <Publishers />
          </MemoryRouter>
        </I18nextProvider>
      </AccountsProvider>
    );

    expect(await screen.findByText("Your ⚡️ Websites")).toBeInTheDocument();
    expect(await screen.findByText("DALL·E 2")).toBeInTheDocument();
    expect(await screen.findByText("ACTIVE")).toBeInTheDocument();
  });
});
