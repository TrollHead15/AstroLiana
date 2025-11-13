import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Хлебные крошки" className="breadcrumbs">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} aria-current={isLast ? "page" : undefined}>
              {item.href && !isLast ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
