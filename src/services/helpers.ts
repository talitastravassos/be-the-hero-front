import numeral from 'numeral';

export const toNumber = (value: string): number => {
  return numeral(value.replace(/\./g, '').replace(',', '.')).value()
}