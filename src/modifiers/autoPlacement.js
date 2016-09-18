/**
 * Converts `auto` placement to the placement with more available space on the four directions.
 * @method
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */

export default function autoPlacement(data) {
    const placement = data.placement.split('-')[0];
    const variation = data.placement.split('-')[1];

    // if placement is auto, we need to convert it to the placement with more
    // space available
    if (placement === 'auto') {
        const reference = data.offsets.reference;
        const boundaries = data.boundaries;

        // get the available space in the four directions
        const directions = [
            { direction: 'top', value: reference.top - boundaries.top },
            { direction: 'right', value: boundaries.right - reference.right },
            { direction: 'bottom', value: boundaries.bottom - reference.bottom },
            { direction: 'left', value: reference.left - boundaries.left }
        ];

        // sort the directions by their available space, the bigger one
        // will be the first of the array
        const orderedDirections = directions.sort((a, b) => {
            if (a.value > b.value) {
                return -1;
            } else if (a.value < b.value) {
                return 1;
            } else {
                return 0;
            }
        });
        console.log(orderedDirections);

        // get the direction name
        const newPlacement = orderedDirections[0].direction;

        // replace `auto` with the direction we have found
        data.placement = newPlacement + (variation ? '-' + variation : '');

        // may be needed by other modifiers if they want to know the computed
        // original placement
        data.originalComputedPlacement = data.placement;
    }

    return data;
}