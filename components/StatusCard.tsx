import { db } from "@/firebase/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { Alert } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export interface Status{
    id: string;
    title: string;
    image: string;
    nextIs: string
    nextIn: number;
    userId: string;
}

interface Props {
    status: Status;
}

export function StatusCard({status}: Props) {
    const [loading, setLoading] = useState(false);
    const handleRemove = async () => {
        try {
            setLoading(true);
            await deleteDoc(doc(db, "Status-Warframe", status.id))
        } catch (error) {
            Alert.alert("Erro!", "Falha ao remover a memória");
        } finally{
            setLoading(false);
        }
    };

    return (
        <Card>
            <Card.Title title={status.title}/>
            <Card.Cover source= {{ uri: status.image}}/>
            <Card.Content>
                <Text variant="bodyMedium">{status.nextIn}</Text>
            </Card.Content>
            <Card.Actions>
                <Button loading={loading} onPress={handleRemove}>Remover</Button>
            </Card.Actions>
        </Card>
    )

}