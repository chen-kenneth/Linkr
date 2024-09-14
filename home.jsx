import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";

import { VideoCard } from "../../components"; // Assuming VideoCard is used for preview
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts } from "../../lib/appwrite";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [powerOn, setPowerOn] = useState(false); // State for power button

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const togglePower = () => {
    setPowerOn(!powerOn);
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="flex-1 justify-center items-center">
        {/* Power Button */}
        <TouchableOpacity
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: powerOn ? "green" : "red",
          }}
          onPress={togglePower}
        >
          <Text className="text-white font-pbold">
            {powerOn ? "Power On" : "Power Off"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Preview at the bottom */}
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
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white font-pregular">No Videos Found</Text>
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
