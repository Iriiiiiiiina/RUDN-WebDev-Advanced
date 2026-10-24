import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCard } from "../../api/cards";
import styles from "./BoardCard.module.css";

type BoardCardProps = {
  id: string;
  title: string;
  isDone: boolean;
};

export function BoardCard({ id, title, isDone }: BoardCardProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCard,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cards"] }),
  });

  const handleDelete = () => {
    if (mutation.isPending || !window.confirm(`Удалить карточку «${title}»?`)) {
      return;
    }

    mutation.mutate(id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <span className={isDone ? styles.isDone : styles.title}>{title}</span>
        <button
          className={styles.deleteButton}
          type="button"
          aria-label={`Удалить карточку «${title}»`}
          onClick={handleDelete}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Удаление…" : "Удалить"}
        </button>
      </div>
      {mutation.isError && (
        <p className={styles.error} role="alert">
          Не удалось удалить карточку. Попробуйте ещё раз.
        </p>
      )}
    </div>
  );
}
