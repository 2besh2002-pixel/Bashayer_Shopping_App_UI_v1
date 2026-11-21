jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

import { act, render } from "@testing-library/react-native";
import { StyleSheet } from "react-native";

import { AppText } from "../src/components/ui/AppText";
import { AppTextInput } from "../src/components/ui/AppTextInput";
import { Screen } from "../src/components/ui/Screen";
import { useSettingsStore } from "../src/stores/settingsStore";

test("shared screen, typography, and input switch direction with language", async () => {
  useSettingsStore.getState().setLang("ar");
  const view = await render(
    <Screen>
      <AppText>Sample label</AppText>
      <AppTextInput testID="language-input" />
    </Screen>,
  );

  const textDirection = () =>
    StyleSheet.flatten(view.getByText("Sample label").props.style).writingDirection;
  const inputStyle = () => StyleSheet.flatten(view.getByTestId("language-input").props.style);

  expect(textDirection()).toBe("rtl");
  expect(inputStyle().direction).toBe("rtl");

  await act(async () => {
    useSettingsStore.getState().setLang("en");
  });

  expect(textDirection()).toBe("ltr");
  expect(inputStyle().direction).toBe("ltr");
});
