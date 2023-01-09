import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import styles from "./Home.module.css";
import Transaction from "./Transaction";
import TransactionList from "./TransactionList";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "transactions",
    ["uid","==",user.uid],//use this model for .where in which we can check if the uid is equal with the user that login
    ["createdAt","desc"]//order by the date in descending
    );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <Transaction uid={user.uid} />
      </div>
    </div>
  );
}
