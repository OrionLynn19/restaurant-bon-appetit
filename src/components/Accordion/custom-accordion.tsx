"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemData {
  id: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  type?: "single" | "multiple";
  className?: string;
}

interface AccordionItemState {
  [key: string]: boolean;
}

export function CustomAccordion({
  items,
  type = "multiple",
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<AccordionItemState>({});

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      // For single mode, open only one at a time nah
      if (type === "single") {
        const newState: AccordionItemState = {};
        if (!prev[itemId]) {
          newState[itemId] = true;
        }
        return newState;
      } else {
        // For multiple mode
        return {
          ...prev,
          [itemId]: !prev[itemId],
        };
      }
    });
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          trigger={item.trigger}
          content={item.content}
          isOpen={openItems[item.id] || false}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
}

interface AccordionItemProps {
  id: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({
  trigger,
  content,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number>(0);

  React.useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(isOpen ? scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className="w-[343px] md:w-full max-w-[343px] md:max-w-[646px] mb-[10px] last:mb-0 bg-white rounded-lg border border-gray-200 p-4"
      style={{ boxShadow: "0px 2px 8px 0px #00000010" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-4 text-left text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
      >
        <span className="flex-1 break-words whitespace-normal text-left overflow-hidden">
          {trigger}
        </span>
        <ChevronDown
          className={cn(
            "pointer-events-none shrink-0 transition-transform duration-300 ease-in-out w-[22.4px] h-[22.4px] md:w-[32px] md:h-[32px]",
            isOpen ? "scale-y-[-1]" : "scale-y-[1]"
          )}
          style={{
            color: "#EF9748",
          }}
        />
      </button>

      <div
        style={{
          height: `${height}px`,
          transition:
            "height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
        }}
      >
        <div
          ref={contentRef}
          className="pt-0 pb-4 cursor-pointer"
          onClick={isOpen ? onToggle : undefined}
          title={isOpen ? "Click to close" : undefined}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
