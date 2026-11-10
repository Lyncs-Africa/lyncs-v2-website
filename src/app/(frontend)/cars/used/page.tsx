import { redirect } from "next/navigation";

export default function CarsUsedPage() {
  redirect("/cars?condition=used");
}
