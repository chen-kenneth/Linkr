import React, { useState, useRef } from "react";
import {
 View,
 Text,
 FlatList,
 Animated,
 PanResponder,
 StyleSheet,
 TouchableOpacity
} from "react-native";


// This component handles individual list items with expandable content
const ExpandableListItem = ({ item }) => {
 const [expanded, setExpanded] = useState(false);


 const toggleExpand = () => {
   setExpanded(!expanded);
 };


 return (
   <View className="my-2 py-2 border border-gray-100 rounded-lg bg-primary">
     <TouchableOpacity onPress={toggleExpand} className="py-2 bg-gray-100 rounded-lg">
       <Text className="text-lg font-psemibold">{item.title}</Text>
     </TouchableOpacity>
     {expanded && <Text className="mt-2 text-sm text-black-200">{item.content}</Text>}
   </View>
 );
};


// This component handles the draggable pill
const DraggablePill = ({ dragY }) => {
 return (
   <Animated.View
     style={{
       transform: [{ translateY: dragY }],
     }}
     className="justify-center items-center p-2 bg-primary"
   >
     <View className="w-10 h-1.5 bg-gray-100 rounded-lg" />
   </Animated.View>
 );
};


// This component shows the notification to turn the toggle on, with a minimum height
const ExpandableListNotification = () => {
 return (
   <View style={styles.notificationContainer}>
     <Text className="text-center text-primary-200 text-2xl font-psemibold">
       Turn toggle ON to see nearby people
     </Text>
   </View>
 );
};


// This component handles the entire expandable list
const ExpandableList = ({ data, toggleOn }) => {
 const [maxVisibleItems, setMaxVisibleItems] = useState(2); // Start by showing only 2 items
 const dragY = useRef(new Animated.Value(0)).current; // For tracking drag position


 // Calculate the number of items to show based on drag distance
 const calculateVisibleItems = (dy) => {
   const maxItems = data.length;
   const minItems = 2;
   const threshold = 100; // Drag threshold to start showing more items
   const additionalItems = Math.floor(Math.abs(dy) / threshold);


   // Calculate the number of items to display based on drag distance, capped at the maximum number of items
   return Math.min(maxItems, minItems + additionalItems);
 };


 // PanResponder to handle drag gestures
 const panResponder = useRef(
   PanResponder.create({
     onMoveShouldSetPanResponder: () => true,
     onPanResponderMove: (evt, gestureState) => {
       // As the pill is dragged, increase the number of visible items
       setMaxVisibleItems(calculateVisibleItems(gestureState.dy));
       Animated.event([null, { dy: dragY }], {
         useNativeDriver: false,
       })(evt, gestureState);
     },
     onPanResponderRelease: () => {
       // Animate the pill back to its original position after the drag is released
       Animated.spring(dragY, {
         toValue: 0,
         useNativeDriver: true,
       }).start();
     },
   })
 ).current;


 const renderItem = ({ item }) => <ExpandableListItem item={item} />;


 return (
   <View>
     {toggleOn ? (
       <View
         style={styles.expandableListContainer} // Add minimum height here
         className="overflow-hidden bg-primary border border-gray-100"
       >
         {/* Grey pill with dragging functionality */}
         <DraggablePill dragY={dragY} {...panResponder.panHandlers} />


         <FlatList
           data={data.slice(0, maxVisibleItems)} // Dynamically show more items based on the drag distance
           renderItem={renderItem}
           keyExtractor={(item) => item.id.toString()}
           ListEmptyComponent={() => (
             <View style={styles.emptyContainer}>
               <Text className="text-center text-primary-200 font-psemibold">
                 No data available
               </Text>
             </View>
           )}
         />
       </View>
     ) : (
       <ExpandableListNotification /> // Use the new notification component here
     )}
   </View>
 );
};


// Add styles for minimum height and empty container
const styles = StyleSheet.create({
 expandableListContainer: {
   minHeight: 150, // Set a minimum height equivalent to two items
   borderRadius: 15, // Rounded corners for the container
   overflow: "hidden", // Ensure children respect the border radius
 },
 emptyContainer: {
   flex: 1,
   justifyContent: "center",
   alignItems: "center",
   height: 150, // Ensure the empty container also takes up minimum space
 },
 notificationContainer: {
   justifyContent: "center",
   alignItems: "center",
   backgroundColor: "#fff", // Ensure the notification background is styled
   minHeight: 150, // Set a minimum height of 150
   borderColor: "#ccc",
   borderWidth: 1,
   borderRadius: 15, // Rounded corners for the notification
   padding: 16,
 },
});


export default ExpandableList;
