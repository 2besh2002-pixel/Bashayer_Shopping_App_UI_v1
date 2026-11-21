jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

import AsyncStorage from "@react-native-async-storage/async-storage";

import { activeStore } from "../store-configs";
import { useSettingsStore } from "../src/stores/settingsStore";

test("Arabic is the default when no language preference is saved", () => {
  expect(activeStore.defaultLanguage).toBe("ar");
  expect(useSettingsStore.getState().lang).toBe("ar");
});

test("restores the selected language from persisted settings", async () => {
  await AsyncStorage.clear();
  useSettingsStore.setState({ lang: "ar" });
  useSettingsStore.getState().setLang("en");
  expect(await AsyncStorage.getItem("naseej:settings")).toContain('"lang":"en"');

  useSettingsStore.setState({ lang: "ar" });
  await AsyncStorage.setItem(
    "naseej:settings",
    JSON.stringify({ state: { lang: "en", currency: "SAR", unit: "cm" }, version: 0 }),
  );
  await useSettingsStore.persist.rehydrate();

  expect(useSettingsStore.getState().lang).toBe("en");
});
