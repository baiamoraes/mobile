import { useSQLiteContext } from "expo-sqlite";

export type ParticipantDatabase = {
    id: number;
    name: string;
};

export function useParticipantDatabase() {
    const database = useSQLiteContext();

    
    async function create(data: Omit<ParticipantDatabase, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO participants (name) VALUES ($name)"
        );

        try {
            await statement.executeAsync({ $name: data.name });
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }


    async function listAll(): Promise<ParticipantDatabase[]> {
        try {
            const query = "SELECT * FROM participants ORDER BY id DESC";
            const response = await database.getAllAsync<ParticipantDatabase>(query);
            return response;
        } catch (error) {
            throw error;
        }
    }


    async function remove(id: number) {
        try {
            const statement = await database.prepareAsync(
                "DELETE FROM participants WHERE id = $id"
            );
            await statement.executeAsync({ $id: id });
        } catch (error) {
            throw error;
        }
    }

    return { create, listAll, remove };
}
