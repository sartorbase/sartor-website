import React, { useEffect, useMemo } from 'react';
import { Home, ChevronRight } from 'lucide-react';
import {
  BreadcrumbTrailItem,
  buildPrimaryBreadcrumbSchema,
  getPrimaryBreadcrumbItems,
} from '../../seo/geoSchemas';
import { navigateTo } from '../../utils/navigation';

export const PRIMARY_BREADCRUMB_SCHEMA_ID = 'primary-breadcrumb-structured-data';

export interface BreadcrumbSchemaProps {
  pageUrl: string;
  items?: BreadcrumbTrailItem[];
  className?: string;
}

export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({
  pageUrl,
  items,
  className = '',
}) => {
  const trail = useMemo(
    () => (items && items.length > 0 ? items : getPrimaryBreadcrumbItems(pageUrl)),
    [items, pageUrl]
  );

  // Sync BreadcrumbList JSON-LD in document.head with visible breadcrumb trail
  useEffect(() => {
    if (typeof document === 'undefined' || trail.length === 0) return;

    const schemaObj = items?.length
      ? {
          ...buildPrimaryBreadcrumbSchema(pageUrl),
          itemListElement: items.map(({ position, name, item }) => ({
            '@type': 'ListItem',
            position,
            name,
            item,
          })),
        }
      : buildPrimaryBreadcrumbSchema(pageUrl);

    const payload = JSON.stringify(schemaObj);
    let scriptEl = document.getElementById(PRIMARY_BREADCRUMB_SCHEMA_ID) as HTMLScriptElement | null;

    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = PRIMARY_BREADCRUMB_SCHEMA_ID;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    if (scriptEl.textContent !== payload) {
      scriptEl.textContent = payload;
    }
  }, [items, pageUrl, trail.length]);

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-xs text-stone-400 ${className}`}
    >
      <ol className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
        {trail.map((crumb, idx) => {
          const isLast = idx === trail.length - 1;
          const isFirst = idx === 0;

          return (
            <li key={crumb.item} className="inline-flex items-center gap-1.5">
              {idx > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-stone-600 shrink-0" />
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-amber-300 font-semibold"
                >
                  {crumb.name}
                </span>
              ) : (
                <a
                  href={crumb.path}
                  onClick={(e) => navigateTo(crumb.path, e)}
                  className="inline-flex items-center gap-1 text-stone-400 hover:text-amber-300 transition-colors"
                >
                  {isFirst && <Home className="w-3 h-3 text-amber-400 shrink-0" />}
                  <span>{crumb.name}</span>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbSchema;
