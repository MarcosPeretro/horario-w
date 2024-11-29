import { Loader } from "@/components/Loader";
import { StatusCard } from "@/components/StatusCard";
import { useUser } from "@/hooks/useUser";
import { router, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";


export default function Home() {
  const router = useRouter();
  const user = useUser();

  if(!user){
    return <Loader />
  }
  return (
    <View
      style={styles.container}>
      <StatusCard status={{
        id: "2",
        title: "Day",
        image: "https://png.pngtree.com/png-clipart/20230111/original/pngtree-sun-vector-png-image_8901658.png",
        nextIs: "Night",
        nextIn: 30,
        userId: "20",
      }}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/add-edit-hora")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 16,
    zIndex: 1,
  },
});
