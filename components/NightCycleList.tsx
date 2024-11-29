import { useStatus } from "../hooks/useStatus";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Loader } from "./Loader";
import { StatusCard } from "./StatusCard";

interface Props {
  userId: string;
}

export function MemoryList({ userId }: Props) {
  const { status, loading } = useStatus(userId);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : status.length ? (
        <FlatList
          data={status}
          renderItem={({ item }) => <StatusCard status={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.emptyListText} variant="bodyMedium">
          Nenhuma memória cadastrada
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyListText: {
    textAlign: "center",
  },
});
