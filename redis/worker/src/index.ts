import { createClient } from "redis";
const client = createClient();

async function main() {
  await client.connect();
  while (1) {
    const res = await client.brPop("submissions", 0);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (res) {
      console.log(res);
    }
  }
}

main();
