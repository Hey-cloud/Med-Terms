export function sm2(card, quality) {
  // quality: integer 0..5
  let interval = Number(card.interval || 0);
  let ef = Number(card.ef || 2.5);
  let repetitions = Number(card.repetitions || 0);

  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 6;
    else interval = Math.round(interval * ef);
  }

  ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ef < 1.3) ef = 1.3;

  const due = new Date();
  due.setDate(due.getDate() + interval);

  return {
    ...card,
    interval,
    ef,
    repetitions,
    due: due.toISOString(),
    lastReviewed: new Date().toISOString()
  };
}
