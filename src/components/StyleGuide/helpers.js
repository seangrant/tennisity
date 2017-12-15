export const media = selector => (width, styles) => ({
  [`@media(${selector}: ${width}px)`]: styles
});

export const mediaMinWidth = media('min-width');

export const border = ({ size = 1, color, type = 'solid' }) =>
  `${size}px ${type} ${color}`;

export const margin = ({ top = 0, bottom = 0, left = 0, right = 0 }) =>
  `${top}px ${right}px ${bottom}px ${left}px`;
