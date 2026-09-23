import { useQuery } from "@tanstack/react-query";
import { BoardHeader } from "./components/BoardHeader/BoardHeader";
import { BoardColumn } from "./components/BoardColumn/BoardColumn";
import { NewCardForm } from "./components/NewCardForm/NewCardForm";
import styles from "./App.module.css";
import { fetchCards } from "./api/cards";

function App() {
  const { data: cards, isLoading } = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });

  if (isLoading) {
    return <div>Загрузка…</div>;
  }

  return (
    <div className={styles.app}>
      <BoardHeader />

      <main className={styles.board}>
        <NewCardForm />

        <div className={styles.columns}>
          <BoardColumn cards={cards ?? []} />
        </div>
      </main>
    </div>
  );
}

export default App;