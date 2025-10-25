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
    <path d="M14 2a2 2 0 0 1 2 2v2h-2V4h-2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2" />
    <path d="M12 11h-1a2 2 0 0 0-2 2v6" />
    <path d="M12 22v-6" />
    <path d="M22 10a2.5 2.5 0 0 0-5 0 2.5 2.5 0 0 0-5 0" />
    <path d="M17 10v10" />
    <path d="m14 2-8.5 8.5a2.828 2.828 0 1 0 4 4L18 6" />
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
