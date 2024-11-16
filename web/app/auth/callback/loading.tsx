import { Spinner } from "@/components/global/loader/spinner";

export default function Loading() {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <Spinner />
    </div>
  );
}
