import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  title: string;
  description?: string;
  header?: string;
}

export function EmptyState({
  icon = "folder-open-outline",
  iconSize = 80,
  title,
  description,
  header,
}: EmptyStateProps) {
  return (
    <View className="flex-1 bg-background">
      {header && (
        <View className="px-6 pt-16 pb-5">
          <Text className="text-3xl font-bold tracking-tight text-text-primary">
            {header}
          </Text>
        </View>
      )}
      <View className="items-center justify-center flex-1 px-6">
        <Ionicons name={icon} size={iconSize} color="#666" />
        <Text className="mt-4 text-xl font-semibold text-text-primary">
          {title}
        </Text>
        {description && (
          <Text className="mt-2 text-center text-text-secondary">
            {description}
          </Text>
        )}
      </View>
    </View>
  );
}
