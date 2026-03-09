import { Order } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  order: Order | null;
  productRatings: { [key: string]: number };
  onRatingChange: (productId: string, rating: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const RatingModal = ({
  visible,
  onClose,
  order,
  productRatings,
  onRatingChange,
  onSubmit,
  isSubmitting,
}: RatingModalProps) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      {/* backdrop layer */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="items-center justify-center flex-1 px-4 bg-black/70">
          <TouchableWithoutFeedback>
            <View className="bg-surface rounded-3xl p-6 w-full max-w-md max-h-[80%]">
              <View className="items-center mb-4">
                <View className="items-center justify-center w-16 h-16 mb-3 rounded-full bg-primary/20">
                  <Ionicons name="star" size={32} color="#1DB954" />
                </View>
                <Text className="mb-1 text-2xl font-bold text-text-primary">
                  Rate Your Products
                </Text>
                <Text className="text-sm text-center text-text-secondary">
                  Rate each product from your order
                </Text>
              </View>

              <ScrollView className="mb-4">
                {order?.orderItems.map((item, index) => {
                  const productId = item.product._id;
                  const currentRating = productRatings[productId] || 0;

                  return (
                    <View
                      key={item._id}
                      className={`bg-background-lighter rounded-2xl p-4 ${
                        index < order.orderItems.length - 1 ? "mb-3" : ""
                      }`}
                    >
                      <View className="flex-row items-center mb-3">
                        <Image
                          source={item.image}
                          style={{ height: 64, width: 64, borderRadius: 8 }}
                        />
                        <View className="flex-1 ml-3">
                          <Text
                            className="text-sm font-semibold text-text-primary"
                            numberOfLines={2}
                          >
                            {item.name}
                          </Text>
                          <Text className="mt-1 text-xs text-text-secondary">
                            Qty: {item.quantity} • ${item.price.toFixed(2)}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <TouchableOpacity
                            key={star}
                            onPress={() => onRatingChange(productId, star)}
                            activeOpacity={0.7}
                            className="mx-1.5"
                          >
                            <Ionicons
                              name={star <= currentRating ? "star" : "star-outline"}
                              size={32}
                              color={star <= currentRating ? "#1DB954" : "#666"}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  );
                })}
              </ScrollView>

              <View className="gap-3">
                <TouchableOpacity
                  className="items-center py-4 bg-primary rounded-2xl"
                  activeOpacity={0.8}
                  onPress={onSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="#121212" />
                  ) : (
                    <Text className="text-base font-bold text-background">Submit All Ratings</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  className="items-center py-4 border bg-surface-lighter rounded-2xl border-background-lighter"
                  activeOpacity={0.7}
                  onPress={onClose}
                  disabled={isSubmitting}
                >
                  <Text className="text-base font-bold text-text-secondary">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RatingModal;