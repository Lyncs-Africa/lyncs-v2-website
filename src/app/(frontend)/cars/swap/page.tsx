import { redirect } from "next/navigation";

export default function CarsSwapPage() {
  redirect("/cars/list?action=swap");
}
