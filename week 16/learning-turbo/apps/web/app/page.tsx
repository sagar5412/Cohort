"use client"
import { Button } from "@repo/ui/button";
import { logout } from "./actions/user";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Button appName="web dev" children="Hello"></Button>
      <button
        onClick={async () => {
          const res = await logout();
          if (res.status == 200) {
            router.push("/signin");
          }
        }}
      >
        Logout
      </button>
    </div>
  );
}
``;
