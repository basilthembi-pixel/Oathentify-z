import Link from 'next/link';

const CustomLogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m11 17 2 2a1 1 0 1 0 1.4-1.4l-2-2" />
    <path d="m5.8 11.2 2.8 2.8" />
    <path d="M14 10.5c.3-.3.3-.8 0-1.1l-2.5-2.5c-.3-.3-.8-.3-1.1 0l-2.5 2.5c-.3.3-.3.8 0 1.1l2.5 2.5c.3.3.8.3 1.1 0Z" />
    <path d="M18 16.5c.3-.3.3-.8 0-1.1l-2.5-2.5c-.3-.3-.8-.3-1.1 0l-2.5 2.5c-.3.3-.3.8 0 1.1l2.5 2.5c.3.3.8.3 1.1 0Z" />
    <path d="m21 13-2-2" />
    <path d="m14 3-2.5 2.5" />
    <path d="M3 21l2.5-2.5" />
  </svg>
);


export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center transition-colors group-hover:bg-accent">
        <CustomLogoIcon className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold font-headline text-primary group-hover:text-accent transition-colors">
        Oathentify
      </span>
    </Link>
  );
}
