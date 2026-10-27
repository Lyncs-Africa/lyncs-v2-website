import { redirect } from "next/navigation";

export default function CarsUsedPage() {
  redirect("/cars/list?tab=used-cars");
}
