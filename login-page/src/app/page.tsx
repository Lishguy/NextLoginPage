import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen grid bg-orange-300/20">
      <h1 className="text-2xl text-gray-800 text-center mt-5 ">New To Our Product? <Link href="/register" className="text-orange-300 underline">Register Here</Link> </h1>
    </div>
  );
}
