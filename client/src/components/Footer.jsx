// Footer.jsx
// Site footer with brand name, nav links, and copyright

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Support", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline pb-[80px]">
      <div className="flex flex-col justify-between items-center px-margin py-xl gap-md w-full max-w-[1280px] mx-auto text-center">
        <span className="font-headline-md text-headline-md text-primary">Trackr</span>

        <div className="flex gap-md font-body-md text-body-md text-on-surface-variant">
          {footerLinks.map(({ label, href }) => (
            <a key={label} href={href} className="hover:text-primary transition-colors">
              {label}
            </a>
          ))}
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant">
          © 2024 Trackr Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
