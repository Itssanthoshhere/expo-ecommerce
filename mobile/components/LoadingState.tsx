import { View, Text, ActivityIndicator } from "react-native";

interface LoadingStateProps {
  message?: string;
  color?: string;
}

const LoadingState = ({
  message = "Loading...",
  color = "#00D9FF",
}: LoadingStateProps) => {
  return (
    <View className="items-center justify-center flex-1 bg-background">
      <ActivityIndicator size={"large"} color={color} />
      <Text className="mt-4 text-text-secondary">{message}</Text>
    </View>
  );
};

export default LoadingState;
