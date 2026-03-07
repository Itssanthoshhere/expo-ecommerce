import SafeScreen from "@/components/SafeScreen";
import { useAddresses } from "@/hooks/useAddressess";
import useCart from "@/hooks/useCart";
import { useApi } from "@/lib/api";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useState } from "react";
import { Address } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import OrderSummary from "@/components/OrderSummary";
import AddressSelectionModal from "@/components/AddressSelectionModal";

import * as Sentry from "@sentry/react-native";

const CartScreen = () => {
  const api = useApi();
  const {
    addToCart,
    isAddingToCart,
    cart,
    cartItemCount,
    cartTotal,
    clearCart,
    isClearing,
    isError,
    isLoading,
    isRemoving,
    isUpdating,
    removeFromCart,
    updateQuantity,
  } = useCart();
  const { addresses } = useAddresses();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);

  const cartItems = cart?.items || [];
  const subtotal = cartTotal;
  const shipping = 10.0; // $10 shipping fee
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (
    productId: string,
    currentQuantity: number,
    change: number,
  ) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    updateQuantity({ productId, quantity: newQuantity });
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    Alert.alert("Remove Item", `Remove ${productName} from cart?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => removeFromCart(productId),
      },
    ]);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // check if user has addresses
    if (!addresses || addresses.length === 0) {
      Alert.alert(
        "No Address",
        "Please add a shipping address in your profile before checking out.",
        [{ text: "OK" }],
      );
      return;
    }

    // show address selection modal
    setAddressModalVisible(true);
  };

  const handleProceedWithPayment = async (selectedAddress: Address) => {
    setAddressModalVisible(false);

    // log chechkout initiated
    Sentry.logger.info("Checkout initiated", {
      itemCount: cartItemCount,
      total: total.toFixed(2),
      city: selectedAddress.city,
    });

    try {
      setPaymentLoading(true);

      // create payment intent with cart items and shipping address
      const { data } = await api.post("/payment/create-intent", {
        cartItems,
        shippingAddress: {
          fullName: selectedAddress.fullName,
          streetAddress: selectedAddress.streetAddress,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode,
          phoneNumber: selectedAddress.phoneNumber,
        },
      });

      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "Your Store Name",
      });

      if (initError) {
        Sentry.logger.error("Payment sheet init failed", {
          errorCode: initError.code,
          errorMessage: initError.message,
          cartTotal: total,
          itemCount: cartItems.length,
        });

        Alert.alert("Error", initError.message);
        setPaymentLoading(false);
        return;
      }

      // present payment sheet
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        Sentry.logger.error("Payment cancelled", {
          errorCode: presentError.code,
          errorMessage: presentError.message,
          cartTotal: total,
          itemCount: cartItems.length,
        });

        Alert.alert("Payment cancelled", presentError.message);
      } else {
        Sentry.logger.info("Payment successful", {
          total: total.toFixed(2),
          itemCount: cartItems.length,
        });

        Alert.alert(
          "Success",
          "Your payment was successful! Your order is being processed.",
          [{ text: "OK", onPress: () => {} }],
        );
        clearCart();
      }
    } catch (error) {
      Sentry.logger.error("Payment failed", {
        error: error instanceof Error ? error.message : "Unknown error",
        cartTotal: total,
        itemCount: cartItems.length,
      });

      Alert.alert("Error", "Failed to process payment");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (isLoading) return <LoadingUI />;
  if (isError) return <ErrorUI />;
  if (cartItems.length === 0) return <EmptyUI />;

  return (
    <SafeScreen>
      <Text className="px-6 pb-5 text-3xl font-bold tracking-tight text-text-primary">
        Cart
      </Text>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 240 }}
      >
        <View className="gap-2 px-6">
          {cartItems.map((item, index) => (
            <View
              key={item._id}
              className="overflow-hidden bg-surface rounded-3xl "
            >
              <View className="flex-row p-4">
                {/* product image */}
                <View className="relative">
                  <Image
                    source={item.product.images[0]}
                    className="bg-background-lighter"
                    contentFit="cover"
                    style={{ width: 112, height: 112, borderRadius: 16 }}
                  />
                  <View className="absolute top-2 right-2 bg-primary rounded-full px-2 py-0.5">
                    <Text className="text-xs font-bold text-background">
                      ×{item.quantity}
                    </Text>
                  </View>
                </View>

                <View className="justify-between flex-1 ml-4">
                  <View>
                    <Text
                      className="text-lg font-bold leading-tight text-text-primary"
                      numberOfLines={2}
                    >
                      {item.product.name}
                    </Text>
                    <View className="flex-row items-center mt-2">
                      <Text className="text-2xl font-bold text-primary">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </Text>
                      <Text className="ml-2 text-sm text-text-secondary">
                        ${item.product.price.toFixed(2)} each
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center mt-3">
                    <TouchableOpacity
                      className="items-center justify-center rounded-full bg-background-lighter w-9 h-9"
                      activeOpacity={0.7}
                      onPress={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity,
                          -1,
                        )
                      }
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                      ) : (
                        <Ionicons name="remove" size={18} color="#FFFFFF" />
                      )}
                    </TouchableOpacity>

                    <View className="mx-4 min-w-[32px] items-center">
                      <Text className="text-lg font-bold text-text-primary">
                        {item.quantity}
                      </Text>
                    </View>

                    <TouchableOpacity
                      className="items-center justify-center rounded-full bg-primary w-9 h-9"
                      activeOpacity={0.7}
                      onPress={() =>
                        handleQuantityChange(item.product._id, item.quantity, 1)
                      }
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <ActivityIndicator size="small" color="#121212" />
                      ) : (
                        <Ionicons name="add" size={18} color="#121212" />
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      className="items-center justify-center ml-auto rounded-full bg-red-500/10 w-9 h-9"
                      activeOpacity={0.7}
                      onPress={() =>
                        handleRemoveItem(item.product._id, item.product.name)
                      }
                      disabled={isRemoving}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#EF4444"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
        />
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 px-6 pt-4 pb-32 border-t bg-background/95 backdrop-blur-xl border-surface"
      >
        {/* Quick Stats */}
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <Ionicons name="cart" size={20} color="#1DB954" />
            <Text className="ml-2 text-text-secondary">
              {cartItemCount} {cartItemCount === 1 ? "item" : "items"}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-xl font-bold text-text-primary">
              ${total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity
          className="overflow-hidden bg-primary rounded-2xl"
          activeOpacity={0.9}
          onPress={handleCheckout}
          disabled={paymentLoading}
        >
          <View className="flex-row items-center justify-center py-5">
            {paymentLoading ? (
              <ActivityIndicator size="small" color="#121212" />
            ) : (
              <>
                <Text className="mr-2 text-lg font-bold text-background">
                  Checkout
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#121212" />
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <AddressSelectionModal
        visible={addressModalVisible}
        onClose={() => setAddressModalVisible(false)}
        onProceed={handleProceedWithPayment}
        isProcessing={paymentLoading}
      />
    </SafeScreen>
  );
};

export default CartScreen;

function LoadingUI() {
  return (
    <View className="items-center justify-center flex-1 bg-background">
      <ActivityIndicator size="large" color="#00D9FF" />
      <Text className="mt-4 text-text-secondary">Loading cart...</Text>
    </View>
  );
}

function ErrorUI() {
  return (
    <View className="items-center justify-center flex-1 px-6 bg-background">
      <Ionicons name="alert-circle-outline" size={64} color="#FF6B6B" />
      <Text className="mt-4 text-xl font-semibold text-text-primary">
        Failed to load cart
      </Text>
      <Text className="mt-2 text-center text-text-secondary">
        Please check your connection and try again
      </Text>
    </View>
  );
}

function EmptyUI() {
  return (
    <View className="flex-1 bg-background">
      <View className="px-6 pt-16 pb-5">
        <Text className="text-3xl font-bold tracking-tight text-text-primary">
          Cart
        </Text>
      </View>
      <View className="items-center justify-center flex-1 px-6">
        <Ionicons name="cart-outline" size={80} color="#666" />
        <Text className="mt-4 text-xl font-semibold text-text-primary">
          Your cart is empty
        </Text>
        <Text className="mt-2 text-center text-text-secondary">
          Add some products to get started
        </Text>
      </View>
    </View>
  );
}
