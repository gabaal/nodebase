import { Button } from "@/components/ui/button";
import {caller} from '@/trpc/server';

export default async function Home() {
const users = await caller.getUsers();
console.log(users);
  return (
    <div>
      <h1 className="text-5xl">Gerald</h1>
      <Button className="bg-red-600">Button</Button>
    </div>
  );
}
