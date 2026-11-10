import { redirect } from "next/navigation";

export default function CarsNewPage() {
  redirect("/cars?condition=new");
}
