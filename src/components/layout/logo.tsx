import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      width={32}
      height={32}
      className="size-8 shrink-0"
      alt="Balance Pay logo"
    />
  );
}
