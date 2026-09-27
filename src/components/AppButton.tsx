import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";
export function AppButton({className="",...props}:ComponentProps<typeof Button>){return <Button className={`min-h-11 rounded-md font-semibold ${className}`} {...props}/>}
