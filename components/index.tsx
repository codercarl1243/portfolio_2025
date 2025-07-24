
import HeaderComponent from '@/components/layout/Header'
import FooterComponent from '@/components/layout/Footer'
import LogoComponent from '@/components/logo'

import { TImageProps } from '@/components/image/image.type';
import ImageComponent from '@/components/image';
import { LinkProps } from '@/components/link/link.type';
import LinkComponent from '@/components//link';
import clsx from 'clsx';


// Blocks
export const H1 = ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className={clsx("font-accent font-weight-bold font-2xl", className)}>{children}</h1>;
export const H2 = ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className={clsx("font-accent font-weight-bold font-xl", className)}>{children}</h2>;
export const H3 = ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className={clsx("font-accent font-weight-bold font-lg", className)}>{children}</h3>;
export const H4 = ({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) => <h4 className={clsx("font-accent font-weight-bold font-base", className)}>{children}</h4>;
export const P = ({ children, className }: React.HTMLAttributes<HTMLParagraphElement>) => <p className={clsx("font-main text-base", className)}>{children}</p>;
export const Blockquote = ({ children, className }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => <blockquote className={clsx("border-l-4 pl-4 font-main italic", className)}>{children}</blockquote>;
// Marks
export const Bold = ({ children }: { children: React.ReactNode }) => <span className="font-weight-bold">{children}</span>;
export const Italic = ({ children }: { children: React.ReactNode }) => <span className="italic">{children}</span>;
export const Underline = ({ children }: { children: React.ReactNode }) => <span className="underline">{children}</span>;

// Types
// export const Code = ({ language, code, highlightedLines, filename }: TCodeProps) => <CodeBlock language={language} code={code} highlightedLines={highlightedLines} filename={filename}/>
export const Image = (props: TImageProps) => <ImageComponent {...props}/>

// Lists
export const BulletList = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc pl-5">{children}</ul>
);
export const NumberedList = ({ children }: { children: React.ReactNode }) => (
  <ol className="list-decimal pl-5">{children}</ol>
);

export const Link = (props: LinkProps) => <LinkComponent {...props} />;
// export const Link = (props) => <CustomLink props={props}>{props.children}</CustomLink>;


// Layout Components

export const Header = () => <HeaderComponent />

export const Footer = () => <FooterComponent />

export const Logo = () => <LogoComponent />