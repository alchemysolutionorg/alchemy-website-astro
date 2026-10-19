import { AlchemyLogo } from "@/components/AlchemyLogo";
import { cn } from "@/lib/utils";

/* Stacked "alchemy / SOLUTION" lockup — docs/design/logo/logo.html, option A.
   Shared by navbar, mobile menu and footer. Hover rotates only the spark (CSS). */
export function AlchemyLockup({
  markSize = 38,
  className,
}: {
  markSize?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <AlchemyLogo size={markSize} className="shrink-0" />
      <span className="inline-flex flex-col items-start leading-none max-[359px]:hidden">
        <span className="font-display text-[26px] font-semibold tracking-[-0.02em] text-foreground">
          alchemy
        </span>
        <span className="mt-[5px] mr-[-0.66em] font-display text-[10px] font-medium uppercase tracking-[0.66em] text-muted-foreground">
          solution
        </span>
      </span>
    </span>
  );
}
