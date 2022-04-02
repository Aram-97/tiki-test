import { useCallback } from "react";
import { useVirtual, Options } from "react-virtual";

interface UseVirtualGridOptions<T> extends Options<T> {
    itemSize: number;
}

export interface UseVirtualGrid {
    rowVirtualizer: ReturnType<typeof useVirtual>;
    colVirtualizer: ReturnType<typeof useVirtual>;
}

export function useVirtualGrid<T>({
    itemSize,
    ...props
}: UseVirtualGridOptions<T>): UseVirtualGrid {
    const rowVirtualizer = useVirtual<T>({
        estimateSize: useCallback(() => itemSize, [itemSize]),
        ...props,
    });

    const colVirtualizer = useVirtual<T>({
        estimateSize: useCallback(() => itemSize, [itemSize]),
        ...props,
        horizontal: true,
    });

    return {
        rowVirtualizer,
        colVirtualizer,
    };
}
