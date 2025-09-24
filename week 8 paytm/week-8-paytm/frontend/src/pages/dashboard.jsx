import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { UsersComponent } from "../components/UsersComponent";
import axios from "axios";
import { useEffect, useState } from "react";

export function Dashboard() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBalance(response.data.balance); // adjust key name if your API differs
      })
      .catch((err) => {
        console.error("Error fetching balance:", err);
      });
  }, []);

  return (
    <div className="">
      <div>
        <AppBar></AppBar>
        <Balance balance={balance}></Balance>
        <UsersComponent></UsersComponent>
      </div>
    </div>
  );
}
