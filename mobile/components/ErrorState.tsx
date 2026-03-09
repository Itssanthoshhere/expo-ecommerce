import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please check your connection and try again",
  onRetry,
}: ErrorStateProps) {
  return (
    <View className="items-center justify-center flex-1 px-6 bg-background">
      <Ionicons name="alert-circle-outline" size={64} color="#FF6B6B" />
      <Text className="mt-4 text-xl font-semibold text-text-primary">
        {title}
      </Text>
      <Text className="mt-2 text-center text-text-secondary">
        {description}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="px-6 py-3 mt-4 bg-primary rounded-xl"
        >
          <Text className="font-semibold text-background">Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
