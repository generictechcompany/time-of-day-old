// @flow

import {addMinutes, fromString, subtractMinutes} from "../../src/utils/time";

import test from "ava";

test("Can parse time from string", async t => {
  const date = fromString("02:32");
  const expected = {
    hour: 2,
    minute: 32,
  };

  t.deepEqual(date, expected);
});

test("Can add minutes", async t => {
  const date = addMinutes(fromString("00:00"), 30);
  const expected = {
    hour: 0,
    minute: 30,
  };

  t.deepEqual(date, expected);
});

test("Can add minutes with hour rollover", async t => {
  const date = addMinutes(fromString("00:00"), 60 + 30);
  const expected = {
    hour: 1,
    minute: 30,
  };

  t.deepEqual(date, expected);
});

test("Can add minutes with day rollover", async t => {
  const date = addMinutes(fromString("14:00"), 12 * 60 + 30);
  const expected = {
    hour: 2,
    minute: 30,
  };

  t.deepEqual(date, expected);
});

test("Can subtract minutes", async t => {
  const date = subtractMinutes(fromString("00:40"), 30);
  const expected = {
    hour: 0,
    minute: 10,
  };

  t.deepEqual(date, expected);
});
