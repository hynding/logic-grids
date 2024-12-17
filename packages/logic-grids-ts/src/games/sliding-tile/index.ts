import { BasicDisplayDriver } from "./BasicDisplayDriver";
import { ControlDriver } from "./ControlDriver";
import { DisplayDriver } from "./DisplayDriver";
import { KeyboardDriver } from "./KeyboardDriver";

export { SlidingTileGame } from "./SlidingTileGame";

export const SlidingTileGameDrivers = {
    BasicDisplay: BasicDisplayDriver,
    Control: ControlDriver,
    Display: DisplayDriver,
    Keyboard: KeyboardDriver
}