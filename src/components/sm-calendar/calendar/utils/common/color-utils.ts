import Color from 'color';

export function fade(color: string, amount: number) {
  return Color(color).fade(amount);
}

export function negate(color) {
  return Color(color).negate();
}

export function darken(color, amount) {
  return Color(color).darken(amount);
}
