import { Platform, Linking } from "react-native";

export function openInMaps(lat: number, lng: number, label?: string) {
  const url = Platform.select({
    ios: `http://maps.apple.com/?daddr=${lat},${lng}`,
    android: `google.navigation:q=${lat},${lng}`,
    default: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
  });

  if (url) {
    Linking.openURL(url);
  }
}