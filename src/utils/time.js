// @flow

export type TimeOfDay = {
  hour: number,
  minute: number,
}

/*
 * Create TimeOfDay from string of format "HH:mm"
 */
export function fromString(date: string): TimeOfDay {
  const match = /(\d{2}):(\d{2})/.exec(date);
  if (!match) {
    throw new Error(`Cannot parse date from ${date}`);
  }

  const [hour, minute] = match.slice(1, 3).map(parseDecimal);

  return {
    hour,
    minute,
  };
}

export function addMinutes(time: TimeOfDay, minutes: number): TimeOfDay {
  const copy = {...time};
  for (let i = 0; i < minutes; i++) {
    copy.minute++;
    if (copy.minute >= 60) {
      copy.hour++;
      copy.minute = modulo(copy.minute, 60);
    }
    copy.hour = modulo(copy.hour, 24);
  }
  return copy;
}

export function subtractMinutes(time: TimeOfDay, minutes: number): TimeOfDay {
  const copy = Object.assign({}, time);
  for (let i = 0; i < minutes; i++) {
    copy.minute--;
    if (copy.minute < 0) {
      copy.hour--;
      copy.minute = modulo(copy.minute, 60);
    }
    copy.hour = modulo(copy.hour, 24);
  }
  return copy;
}

const parseDecimal = (val: number) => parseInt(val, 10);
const modulo = (val: number, modulus: number) => {
  let result = val % modulus;
  if (result < 0) {
    result += modulus;
  }
  return result;
};
