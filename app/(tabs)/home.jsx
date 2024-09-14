import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, Text, View, TouchableOpacity } from "react-native";

import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts } from "../../lib/appwrite";
import { EmptyState, VideoCard } from "../../components";
import { Ionicons } from "@expo/vector-icons"; // Power icon (Ionicons provides the power icon)

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const [refreshing, setRefreshing] = useState(false);
  const [powerOn, setPowerOn] = useState(false); // Power button state

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Function to toggle power state
  const togglePower = () => {
    setPowerOn(!powerOn);
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6 items-center">
            {/* Power Button */}
            <TouchableOpacity
              className={`w-24 h-24 rounded-full bg-white justify-center items-center border-4 ${
                powerOn ? "border-green" : "border-red"
              }`}
              onPress={togglePower}
            >
              {/* Power Icon */}
              <Ionicons name="power" size={50} color={powerOn ? "green" : "red"} />
            </TouchableOpacity>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
