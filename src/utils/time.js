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

export function moveMinutes(time: TimeOfDay, minutes: number, action: "add" | "subtract") {
  const copy = {...time};

  const actions = {
    add: {
      checkEdgeCase: (tod: TimeOfDay) => tod.minute >= 60,
      changeMinute: (tod: TimeOfDay) => tod.minute++,
      changeHour: (tod: TimeOfDay) => tod.hour++,
    },
    subtract: {
      checkEdgeCase: (tod: TimeOfDay) => tod.minute < 0,
      changeMinute: (tod: TimeOfDay) => tod.minute--,
      changeHour: (tod: TimeOfDay) => tod.hour--,
    },
  };

  for (let i = 0; i < minutes; i++) {
    actions[action].changeMinute(copy);
    if (actions[action].checkEdgeCase(copy)) {
      actions[action].changeHour(copy);
      copy.minute = modulo(copy.minute, 60);
    }
    copy.hour = modulo(copy.hour, 24);
  }
  return copy;
}

export function addMinutes(time: TimeOfDay, minutes: number): TimeOfDay {
  return moveMinutes(time, minutes, "add");
}

export function subtractMinutes(time: TimeOfDay, minutes: number): TimeOfDay {
  return moveMinutes(time, minutes, "subtract");
}

const parseDecimal = (val: number) => parseInt(val, 10);
const modulo = (val: number, modulus: number) => {
  let result = val % modulus;
  if (result < 0) {
    result += modulus;
  }
  return result;
};
