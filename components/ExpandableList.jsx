import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";

const ExpandableListItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress={toggleExpand}
                style={styles.itemTouchable}
            >
                <Text style={styles.itemTitle}>
                    {item.title}
                </Text>
            </TouchableOpacity>
            {expanded && (
                <Text style={styles.itemContent}>
                    {item.content}
                </Text>
            )}
        </View>
    );
};

const ExpandableList = ({ data }) => {
    const renderItem = ({ item }) => (
        <ExpandableListItem item={item} />
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    itemTouchable: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemContent: {
        marginTop: 10,
        fontSize: 14,
        color: '#333',
    },
});

export default ExpandableList;
