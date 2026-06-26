import { useAppearance } from "@/hooks/use-appearance"
import { useFlashGooey } from "@/hooks/use-flash-gooey"
import { GooeyToaster as GooeyToasterPrimitive, gooeyToast } from "goey-toast"
import type { GooeyToasterProps } from "goey-toast"
import "goey-toast/styles.css"

export { gooeyToast }
export type { GooeyToasterProps }
export type {
	GooeyToastOptions,
	GooeyPromiseData,
	GooeyToastAction,
	GooeyToastClassNames,
	GooeyToastTimings,
} from "goey-toast"

function GooeyToaster(props: GooeyToasterProps) {
	const { resolvedAppearance } = useAppearance();
	useFlashGooey();
	return <GooeyToasterPrimitive theme={resolvedAppearance} position="bottom-right" {...props} preset="smooth" />
}

export { GooeyToaster }
