import Link from 'next/link';

export default function LinkButton({
  href,
  icon,
  text,
  className,
}: {
  href: string;
  icon: React.ReactNode;
  text?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      passHref
      className={
        className
          ? `${className}`
          : 'flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
      }
    >
      {text && <span className="hidden md:block">{text}</span>} {icon}
    </Link>
  );
}
