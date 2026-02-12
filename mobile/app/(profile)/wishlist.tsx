import SafeScreen from "@/components/SafeScreen";
import useCart from "@/hooks/useCart";
import useWishlist from "@/hooks/useWishlist";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function WishlistScreen() {
  const {
    wishlist,
    isLoading,
    isError,
    removeFromWishlist,
    isRemovingFromWishlist,
  } = useWishlist();

  const { addToCart, isAddingToCart } = useCart();

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    Alert.alert("Remove from wishlist", `Remove ${productName} from wishlist`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",

        onPress: () => removeFromWishlist(productId),
      },
    ]);
  };

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () =>
          Alert.alert("Success", `${productName} added to cart!`),
        onError: (error: any) => {
          Alert.alert(
            "Error",
            error?.response?.data?.error || "Failed to add to cart",
          );
        },
      },
    );
  };

  if (isLoading) return <LoadingUI />;
  if (isError) return <ErrorUI />;

  return (
    <SafeScreen>
      {/* HEADER */}
      <View className="flex-row items-center px-6 pb-5 border-b border-surface">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-text-primary">Wishlist</Text>
        <Text className="ml-auto text-sm text-text-secondary">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
        </Text>
      </View>

      {wishlist.length === 0 ? (
        <View className="items-center justify-center flex-1 px-6">
          <Ionicons name="heart-outline" size={80} color="#666" />
          <Text className="mt-4 text-xl font-semibold text-text-primary">
            Your wishlist is empty
          </Text>
          <Text className="mt-2 text-center text-text-secondary">
            Start adding products you love!
          </Text>
          <TouchableOpacity
            className="px-8 py-4 mt-6 bg-primary rounded-2xl"
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)")}
          >
            <Text className="text-base font-bold text-background">
              Browse Products
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="px-6 py-4">
            {wishlist.map((item) => (
              <TouchableOpacity
                key={item._id}
                className="mb-3 overflow-hidden bg-surface rounded-3xl"
                activeOpacity={0.8}
                // onPress={() => router.push(`/product/${item._id}`)}
              >
                <View className="flex-row p-4">
                  <Image
                    source={item.images[0]}
                    className="rounded-2xl bg-background-lighter"
                    style={{ width: 96, height: 96, borderRadius: 8 }}
                  />

                  <View className="flex-1 ml-4">
                    <Text
                      className="mb-2 text-base font-bold text-text-primary"
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>
                    <Text className="mb-2 text-xl font-bold text-primary">
                      ${item.price.toFixed(2)}
                    </Text>

                    {item.stock > 0 ? (
                      <View className="flex-row items-center">
                        <View className="w-2 h-2 mr-2 bg-green-500 rounded-full" />
                        <Text className="text-sm font-semibold text-green-500">
                          {item.stock} in stock
                        </Text>
                      </View>
                    ) : (
                      <View className="flex-row items-center">
                        <View className="w-2 h-2 mr-2 bg-red-500 rounded-full" />
                        <Text className="text-sm font-semibold text-red-500">
                          Out of Stock
                        </Text>
                      </View>
                    )}
                  </View>

                  <TouchableOpacity
                    className="self-start p-2 rounded-full bg-red-500/20"
                    activeOpacity={0.7}
                    onPress={() =>
                      handleRemoveFromWishlist(item._id, item.name)
                    }
                    disabled={isRemovingFromWishlist}
                  >
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
                {item.stock > 0 && (
                  <View className="px-4 pb-4">
                    <TouchableOpacity
                      className="items-center py-3 bg-primary rounded-xl"
                      activeOpacity={0.8}
                      onPress={() => handleAddToCart(item._id, item.name)}
                      disabled={isAddingToCart}
                    >
                      {isAddingToCart ? (
                        <ActivityIndicator size="small" color="#121212" />
                      ) : (
                        <Text className="font-bold text-background">
                          Add to Cart
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeScreen>
  );
}
export default WishlistScreen;

function LoadingUI() {
  return (
    <SafeScreen>
      <View className="flex-row items-center px-6 pb-5 border-b border-surface">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-text-primary">Wishlist</Text>
      </View>
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#00D9FF" />
        <Text className="mt-4 text-text-secondary">Loading wishlist...</Text>
      </View>
    </SafeScreen>
  );
}

function ErrorUI() {
  return (
    <SafeScreen>
      <View className="flex-row items-center px-6 pb-5 border-b border-surface">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-text-primary">Wishlist</Text>
      </View>
      <View className="items-center justify-center flex-1 px-6">
        <Ionicons name="alert-circle-outline" size={64} color="#FF6B6B" />
        <Text className="mt-4 text-xl font-semibold text-text-primary">
          Failed to load wishlist
        </Text>
        <Text className="mt-2 text-center text-text-secondary">
          Please check your connection and try again
        </Text>
      </View>
    </SafeScreen>
  );
}
