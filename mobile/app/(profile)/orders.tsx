import RatingModal from "@/components/RatingModal";
import SafeScreen from "@/components/SafeScreen";
import { useOrders } from "@/hooks/useOrders";
import { useReviews } from "@/hooks/useReviews";
import { capitalizeFirstLetter, formatDate, getStatusColor } from "@/lib/utils";
import { Order } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function OrdersScreen() {
  const { data: orders, isLoading, isError } = useOrders();
  const { createReviewAsync, isCreatingReview } = useReviews();

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // {"123": 5 stars, "124": 4 stars} { "productId": rating } [key-value pair of productId and rating]
  const [productRatings, setProductRatings] = useState<{
    [key: string]: number;
  }>({});

  const handleOpenRating = (order: Order) => {
    setShowRatingModal(true);
    setSelectedOrder(order);

    // init ratings for all product to 0 - resettin the state for each product
    const initialRatings: { [key: string]: number } = {};
    order.orderItems.forEach((item) => {
      const productId = item.product._id;
      initialRatings[productId] = 0;
    });
    setProductRatings(initialRatings);
  };

  const handleSubmitRating = async () => {
    if (!selectedOrder) return;

    // check if all products have been rated
    const allRated = Object.values(productRatings).every(
      (rating) => rating > 0,
    );
    if (!allRated) {
      Alert.alert("Error", "Please rate all products");
      return;
    }

    try {
      await Promise.all(
        selectedOrder.orderItems.map((item) => {
          createReviewAsync({
            productId: item.product._id,
            orderId: selectedOrder._id,
            rating: productRatings[item.product._id],
          });
        }),
      );

      Alert.alert("Success", "Thank you for rating all products!");
      setShowRatingModal(false);
      setSelectedOrder(null);
      setProductRatings({});
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.error || "Failed to submit rating",
      );
    }
  };

  return (
    <SafeScreen>
      {/* Header */}
      <View className="flex-row items-center px-6 pb-5 border-b border-surface">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-text-primary">My Orders</Text>
      </View>

      {isLoading ? (
        <LoadingUI />
      ) : isError ? (
        <ErrorUI />
      ) : !orders || orders.length === 0 ? (
        <EmptyUI />
      ) : (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="px-6 py-4">
            {orders.map((order) => {
              const totalItems = order.orderItems.reduce(
                (sum, item) => sum + item.quantity,
                0,
              );
              const firstImage = order.orderItems[0]?.image || "";

              return (
                <View
                  key={order._id}
                  className="p-5 mb-4 bg-surface rounded-3xl"
                >
                  <View className="flex-row mb-4">
                    <View className="relative">
                      <Image
                        source={firstImage}
                        style={{ height: 80, width: 80, borderRadius: 8 }}
                        contentFit="cover"
                      />

                      {/* BADGE FOR MORE ITEMS */}
                      {order.orderItems.length > 1 && (
                        <View className="absolute items-center justify-center rounded-full -bottom-1 -right-1 bg-primary size-7">
                          <Text className="text-xs font-bold text-background">
                            +{order.orderItems.length - 1}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View className="flex-1 ml-4">
                      <Text className="mb-1 text-base font-bold text-text-primary">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </Text>
                      <Text className="mb-2 text-sm text-text-secondary">
                        {formatDate(order.createdAt)}
                      </Text>
                      <View
                        className="self-start px-3 py-1.5 rounded-full"
                        style={{
                          backgroundColor: getStatusColor(order.status) + "20",
                        }}
                      >
                        <Text
                          className="text-xs font-bold"
                          style={{ color: getStatusColor(order.status) }}
                        >
                          {capitalizeFirstLetter(order.status)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* ORDER ITEMS SUMMARY */}
                  {order.orderItems.map((item, index) => (
                    <Text
                      key={item._id}
                      className="flex-1 text-sm text-text-secondary"
                      numberOfLines={1}
                    >
                      {item.name} × {item.quantity}
                    </Text>
                  ))}

                  <View className="flex-row items-center justify-between pt-3 border-t border-background-lighter">
                    <View>
                      <Text className="mb-1 text-xs text-text-secondary">
                        {totalItems} items
                      </Text>
                      <Text className="text-xl font-bold text-primary">
                        ${order.totalPrice.toFixed(2)}
                      </Text>
                    </View>

                    {order.status === "delivered" &&
                      (order.hasReviewed ? (
                        <View className="flex-row items-center px-5 py-3 rounded-full bg-primary/20">
                          <Ionicons
                            name="checkmark-circle"
                            size={18}
                            color="#1DB954"
                          />
                          <Text className="ml-2 text-sm font-bold text-primary">
                            Reviewed
                          </Text>
                        </View>
                      ) : (
                        <TouchableOpacity
                          className="flex-row items-center px-5 py-3 rounded-full bg-primary"
                          activeOpacity={0.7}
                          onPress={() => handleOpenRating(order)}
                        >
                          <Ionicons name="star" size={18} color="#121212" />
                          <Text className="ml-2 text-sm font-bold text-background">
                            Leave Rating
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}

      <RatingModal
        visible={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        order={selectedOrder}
        productRatings={productRatings}
        onSubmit={handleSubmitRating}
        isSubmitting={isCreatingReview}
        onRatingChange={(productId, rating) =>
          setProductRatings((prev) => ({ ...prev, [productId]: rating }))
        }
      />
    </SafeScreen>
  );
}
export default OrdersScreen;

function LoadingUI() {
  return (
    <View className="items-center justify-center flex-1">
      <ActivityIndicator size="large" color="#00D9FF" />
      <Text className="mt-4 text-text-secondary">Loading orders...</Text>
    </View>
  );
}

function ErrorUI() {
  return (
    <View className="items-center justify-center flex-1 px-6">
      <Ionicons name="alert-circle-outline" size={64} color="#FF6B6B" />
      <Text className="mt-4 text-xl font-semibold text-text-primary">
        Failed to load orders
      </Text>
      <Text className="mt-2 text-center text-text-secondary">
        Please check your connection and try again
      </Text>
    </View>
  );
}

function EmptyUI() {
  return (
    <View className="items-center justify-center flex-1 px-6">
      <Ionicons name="receipt-outline" size={80} color="#666" />
      <Text className="mt-4 text-xl font-semibold text-text-primary">
        No orders yet
      </Text>
      <Text className="mt-2 text-center text-text-secondary">
        Your order history will appear here
      </Text>
    </View>
  );
}
