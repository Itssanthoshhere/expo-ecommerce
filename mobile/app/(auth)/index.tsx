import useSocialAuth from "@/hooks/useSocialAuth";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const AuthScreen = () => {
  const { isLoading, handleSocialAuth } = useSocialAuth();

  return (
    <View className="items-center justify-center flex-1 px-8 bg-white">
      {/* DEMO IMAGE */}
      <Image
        source={require("../../assets/images/auth-image.png")}
        className="size-96"
        resizeMode="contain"
      />

      <View className="gap-2 mt-3">
        {/* GOOGLE SIGN IN BTN */}
        <TouchableOpacity
          className="flex-row items-center justify-center px-6 py-2 bg-white border border-gray-300 rounded-full"
          onPress={() => handleSocialAuth("oauth_google")}
          disabled={isLoading}
          style={{
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            elevation: 2, // this is for android
          }}
        >
          {isLoading ? (
            <ActivityIndicator size={"small"} color={"#4285f4"} />
          ) : (
            <View className="flex-row items-center justify-center">
              <Image
                source={require("../../assets/images/google.png")}
                className="mr-3 size-10"
                resizeMode="contain"
              />
              <Text className="text-base font-medium text-black">
                Continue with Google
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* APPLE SIGN IN BTN */}
        <TouchableOpacity
          className="flex-row items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-full"
          onPress={() => handleSocialAuth("oauth_apple")}
          disabled={isLoading}
          style={{
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            elevation: 2, // this is for android
          }}
        >
          {isLoading ? (
            <ActivityIndicator size={"small"} color={"#4285f4"} />
          ) : (
            <View className="flex-row items-center justify-center">
              <Image
                source={require("../../assets/images/apple.png")}
                className="mr-3 size-8"
                resizeMode="contain"
              />
              <Text className="text-base font-medium text-black">
                Continue with Apple
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Text className="px-2 mt-6 text-xs leading-4 text-center text-gray-500">
        By signing up, you agree to our{" "}
        <Text className="text-blue-500">Terms</Text>
        {", "}
        <Text className="text-blue-500">Privacy Policy</Text>
        {", and "}
        <Text className="text-blue-500">Cookie Use</Text>
      </Text>
    </View>
  );
};
