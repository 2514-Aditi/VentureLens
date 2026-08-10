import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

interface SourceBadgeProps {
  sourceName?: string;
  sourceUrl?: string;
  publishedDate?: string;
  isUnavailable?: boolean;
  className?: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({
  sourceName,
  sourceUrl,
  publishedDate,
  isUnavailable = false,
  className = ''
}) => {
  if (isUnavailable || (!sourceName && !sourceUrl)) {
    return (
      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-[#E5E2DC]/50 dark:bg-[#333333]/50 text-[#666666] dark:text-[#B7B7B7] font-medium ${className}`}>
        Not Publicly Available
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs text-[#666666] dark:text-[#B7B7B7] ${className}`}>
      <span className="inline-flex items-center gap-1 font-medium text-[#222222] dark:text-[#F7F7F5]">
        <CheckCircle2 className="w-3 h-3 text-[#E98B50]" />
        {sourceName}
      </span>
      {publishedDate && <span className="opacity-75">({publishedDate})</span>}
      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-[#E98B50] hover:text-[#BC4F4F] transition-colors underline underline-offset-2"
          title={`View primary source at ${sourceName}`}
        >
          <span>Source</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      )}
    </div>
  );
};
