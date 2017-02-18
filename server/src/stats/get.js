import {
  asyncRequest,
  startEndDaysWeek, startEndDaysMonth,
  startEndDaysYear, isDateBetween,
  transformTimeDuration, toSeconds,
  toTimeObject,
} from '../util';
import {User, SportSession} from '../db';

export default (app) => {
  app.post('/api/stats/sport', asyncRequest(async (req, res) => {
    try {
      const user = await User.get(req.body.userId)
        .without(['password'])
        .execute();

      const statsData = {
        week: {
          numberSessions: 0,
          distanceDone: 0,
          velocity: 0,
          time: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          objective: 0,
          objectiveDone: 0,
        },
        month: {
          numberSessions: 0,
          distanceDone: 0,
          velocity: 0,
          time: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          objective: 0,
          objectiveDone: 0,
        },
        year: {
          numberSessions: 0,
          distanceDone: 0,
          velocity: 0,
          time: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          objective: 0,
          objectiveDone: 0,
        },
      };
      const actualDate = new Date(req.body.actualDate);
      const sport = req.body.type;
      const objectives = user.objectives || {};

      if (sport === 'Running' && objectives.weekRunningKm && objectives.weekRunningKm !== '') {
        statsData.week.objective = Number(objectives.weekRunningKm) * 1000;
        statsData.month.objective = Number(objectives.weekRunningKm) * 4330;
        statsData.year.objective = Number(objectives.weekRunningKm) * 52000;
      }
      if (sport === 'Cycling' && objectives.weekCyclingKm && objectives.weekCyclingKm !== '') {
        statsData.week.objective = Number(objectives.weekCyclingKm) * 1000;
        statsData.month.objective = Number(objectives.weekCyclingKm) * 4330;
        statsData.year.objective = Number(objectives.weekCyclingKm) * 52000;
      }
      if (sport === 'Walking' && objectives.weekWalkingKm && objectives.weekWalkingKm !== '') {
        statsData.week.objective = Number(objectives.weekWalkingKm) * 1000;
        statsData.month.objective = Number(objectives.weekWalkingKm) * 4330;
        statsData.year.objective = Number(objectives.weekWalkingKm) * 52000;
      }

      const sessions = await SportSession.filter({user: user.login});
      if (sessions.length <= 0) {
        res.send(statsData);
        return;
      }

      const validSessions = sessions.filter(s => Object.getOwnPropertyNames(s.duration).length > 0);
      if (validSessions.length <= 0) {
        res.send(statsData);
        return;
      }

      const startEndYear = startEndDaysYear(actualDate);
      const yearSessions = validSessions.filter(s => isDateBetween(s.endTime, startEndYear[0], startEndYear[1]));
      if (yearSessions.length <= 0) {
        res.send(statsData);
        return;
      } else {
        const yearSessionsRunning = yearSessions.filter(s => s.sport === sport);
        if (yearSessionsRunning.length <= 0) {
          res.send(statsData);
          return;
        } else {
          statsData.year.numberSessions = yearSessionsRunning.length;
          statsData.year.distanceDone = yearSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance})).distance;
          statsData.year.velocity = yearSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / statsData.year.numberSessions;
          statsData.year.time = yearSessionsRunning.reduce(
            (a, b) => ({
              duration: {
                hours: a.duration.hours + b.duration.hours,
                minutes: a.duration.minutes + b.duration.minutes,
                seconds: a.duration.seconds + b.duration.seconds,
              },
            })).duration;
          statsData.year.time = transformTimeDuration(statsData.year.time);
          if (statsData.year.objective !== 0) {
            statsData.year.objectiveDone = statsData.year.distanceDone / statsData.year.objective * 100;
          }
        }
      }
      const startEndMonth = startEndDaysMonth(actualDate);
      const monthSessions = validSessions.filter(s => isDateBetween(s.endTime, startEndMonth[0], startEndMonth[1]));
      if (monthSessions.length <= 0) {
        res.send(statsData);
        return;
      } else {
        const monthSessionsRunning = monthSessions.filter(s => s.sport === sport);
        if (monthSessionsRunning.length <= 0) {
          res.send(statsData);
          return;
        } else {
          statsData.month.numberSessions = monthSessionsRunning.length;
          statsData.month.distanceDone = monthSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance})).distance;
          statsData.month.velocity = monthSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / statsData.month.numberSessions;
          statsData.month.time = monthSessionsRunning.reduce(
            (a, b) => ({
              duration: {
                hours: a.duration.hours + b.duration.hours,
                minutes: a.duration.minutes + b.duration.minutes,
                seconds: a.duration.seconds + b.duration.seconds,
              },
            })).duration;
          statsData.month.time = transformTimeDuration(statsData.month.time);
          if (statsData.month.objective !== 0) {
            statsData.month.objectiveDone = statsData.month.distanceDone / statsData.month.objective * 100;
          }
        }
      }

      const startEndWeek = startEndDaysWeek(actualDate);
      const weekSessions = validSessions.filter(s => isDateBetween(s.endTime, startEndWeek[0], startEndWeek[1]));
      if (weekSessions.length <= 0) {
        res.send(statsData);
        return;
      } else {
        const weekSessionsRunning = weekSessions.filter(s => s.sport === sport);
        if (weekSessionsRunning.length <= 0) {
          res.send(statsData);
          return;
        } else {
          statsData.week.numberSessions = weekSessionsRunning.length;
          statsData.week.distanceDone = weekSessionsRunning.reduce((a, b) => ({distance: a.distance + b.distance})).distance;
          statsData.week.velocity = weekSessionsRunning.reduce((a, b) => ({velocity: a.velocity + b.velocity})).velocity / statsData.week.numberSessions;
          statsData.week.time = weekSessionsRunning.reduce(
            (a, b) => ({
              duration: {
                hours: a.duration.hours + b.duration.hours,
                minutes: a.duration.minutes + b.duration.minutes,
                seconds: a.duration.seconds + b.duration.seconds,
              },
            })).duration;
            statsData.week.time = transformTimeDuration(statsData.week.time);
          if (statsData.week.objective !== 0) {
            statsData.week.objectiveDone = statsData.week.distanceDone / statsData.week.objective * 100;
          }
        }
      }
      res.send(statsData);
    } catch (e) {
      res.status(400).send({error: 'User not exists'});
    }
  }));

  app.post('/api/stats/routine', asyncRequest(async (req, res) => {
    try {
      const user = await User.get(req.body.userId)
        .without(['password'])
        .execute();

      const statsData = {
        week: {
          numberRoutines: 0,
          numberExercises: 0,
          time: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          exercises: {
            cardio: 0,
            strength: 0,
            endurance: 0,
            agility: 0,
            power: 0,
            stretching: 0,
          },
          objective: 0,
          objectiveDone: 0,
          objectiveVariance: {
            hours: 0,
            minutes: 0,
            seconds: 0,
            surplus: true,
          },
        },
        month: {
          numberRoutines: 0,
          numberExercises: 0,
          time: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          exercises: {
            cardio: 0,
            strength: 0,
            endurance: 0,
            agility: 0,
            power: 0,
            stretching: 0,
          },
          objective: 0,
          objectiveDone: 0,
          objectiveVariance: {
            hours: 0,
            minutes: 0,
            seconds: 0,
            surplus: true,
          },
        },
        year: {
          numberRoutines: 0,
          numberExercises: 0,
          time: {
            hours: 0,
            minutes: 0,
            seconds: 0,
          },
          exercises: {
            cardio: 0,
            strength: 0,
            endurance: 0,
            agility: 0,
            power: 0,
            stretching: 0,
          },
          objective: 0,
          objectiveDone: 0,
          objectiveVariance: {
            hours: 0,
            minutes: 0,
            seconds: 0,
            surplus: true,
          },
        },
      };
      const actualDate = new Date(req.body.actualDate);
      const objectives = user.objectives || {};

      if (objectives.weekTimeExercises && objectives.weekTimeExercises !== '') {
        statsData.week.objective = Number(objectives.weekTimeExercises);
        statsData.month.objective = Math.round(Number(objectives.weekTimeExercises) * 4.33);
        statsData.year.objective = Number(objectives.weekTimeExercises) * 52;
      }

      const sessions = await SportSession.filter({user: user.login});
      if (sessions.length <= 0) {
        res.send(statsData);
        return;
      }
      const routineSessions = sessions.filter(s => s.sport === 'Routine');
      if (routineSessions.length <= 0) {
        res.send(statsData);
        return;
      }

      const startEndYear = startEndDaysYear(actualDate);
      const yearSessions = routineSessions.filter(s => isDateBetween(s.endTime, startEndYear[0], startEndYear[1]));
      if (yearSessions.length <= 0) {
        res.send(statsData);
        return;
      } else {
        statsData.year.numberRoutines = yearSessions.length;
        statsData.year.numberExercises = yearSessions.map(s => s.exercises.length * s.rounds).reduce((a, b) => a + b);
        statsData.year.time = yearSessions.reduce(
            (a, b) => ({
              duration: {
                hours: a.duration.hours + b.duration.hours,
                minutes: a.duration.minutes + b.duration.minutes,
                seconds: a.duration.seconds + b.duration.seconds,
              },
            })).duration;
        statsData.year.time = transformTimeDuration(statsData.year.time);
        if (statsData.year.objective !== 0) {
          statsData.year.objectiveVariance = toTimeObject(statsData.year.objective - toSeconds(statsData.year.time));
          statsData.year.objectiveVariance.surplus = statsData.year.objective - toSeconds(statsData.year.time) < 0;
          statsData.year.objectiveDone = toSeconds(statsData.year.time) / statsData.year.objective * 100;
        }
        for (const routine of yearSessions) {
          for (const exercise of routine.exercises) {
            switch (exercise.kind) {
              case 'cardio':
                statsData.year.exercises.cardio += exercise.time * routine.rounds;
                break;
              case 'strength':
                statsData.year.exercises.strength += exercise.time * routine.rounds;
                break;
              case 'endurance':
                statsData.year.exercises.endurance += exercise.time * routine.rounds;
                break;
              case 'agility':
                statsData.year.exercises.agility += exercise.time * routine.rounds;
                break;
              case 'power':
                statsData.year.exercises.power += exercise.time * routine.rounds;
                break;
              case 'stretching':
                statsData.year.exercises.stretching += exercise.time * routine.rounds;
                break;
              default:
            }
          }
        }
      }

      const startEndMonth = startEndDaysMonth(actualDate);
      const monthSessions = routineSessions.filter(s => isDateBetween(s.endTime, startEndMonth[0], startEndMonth[1]));
      if (monthSessions.length <= 0) {
        res.send(statsData);
        return;
      } else {
        statsData.month.numberRoutines = monthSessions.length;
        statsData.month.numberExercises = monthSessions.map(s => s.exercises.length * s.rounds).reduce((a, b) => a + b);
        statsData.month.time = monthSessions.reduce(
            (a, b) => ({
              duration: {
                hours: a.duration.hours + b.duration.hours,
                minutes: a.duration.minutes + b.duration.minutes,
                seconds: a.duration.seconds + b.duration.seconds,
              },
            })).duration;
        statsData.month.time = transformTimeDuration(statsData.month.time);
        if (statsData.month.objective !== 0) {
          statsData.month.objectiveVariance = toTimeObject(statsData.month.objective - toSeconds(statsData.month.time));
          statsData.month.objectiveVariance.surplus = statsData.month.objective - toSeconds(statsData.month.time) < 0;
          statsData.month.objectiveDone = toSeconds(statsData.month.time) / statsData.month.objective * 100;
        }
        for (const routine of yearSessions) {
          for (const exercise of routine.exercises) {
            switch (exercise.kind) {
              case 'cardio':
                statsData.month.exercises.cardio += exercise.time * routine.rounds;
                break;
              case 'strength':
                statsData.month.exercises.strength += exercise.time * routine.rounds;
                break;
              case 'endurance':
                statsData.month.exercises.endurance += exercise.time * routine.rounds;
                break;
              case 'agility':
                statsData.month.exercises.agility += exercise.time * routine.rounds;
                break;
              case 'power':
                statsData.month.exercises.power += exercise.time * routine.rounds;
                break;
              case 'stretching':
                statsData.month.exercises.stretching += exercise.time * routine.rounds;
                break;
              default:
            }
          }
        }
      }

      const startEndWeek = startEndDaysWeek(actualDate);
      const weekSessions = routineSessions.filter(s => isDateBetween(s.endTime, startEndWeek[0], startEndWeek[1]));
      if (weekSessions.length <= 0) {
        res.send(statsData);
        return;
      } else {
        statsData.week.numberRoutines = weekSessions.length;
        statsData.week.numberExercises = weekSessions.map(s => s.exercises.length * s.rounds).reduce((a, b) => a + b);
        statsData.week.time = weekSessions.reduce(
            (a, b) => ({
              duration: {
                hours: a.duration.hours + b.duration.hours,
                minutes: a.duration.minutes + b.duration.minutes,
                seconds: a.duration.seconds + b.duration.seconds,
              },
            })).duration;
        statsData.week.time = transformTimeDuration(statsData.week.time);
        if (statsData.week.objective !== 0) {
          statsData.week.objectiveVariance = toTimeObject(statsData.week.objective - toSeconds(statsData.week.time));
          statsData.week.objectiveVariance.surplus = statsData.week.objective - toSeconds(statsData.week.time) < 0;
          statsData.week.objectiveDone = toSeconds(statsData.week.time) / statsData.week.objective * 100;
        }
        for (const routine of yearSessions) {
          for (const exercise of routine.exercises) {
            switch (exercise.kind) {
              case 'cardio':
                statsData.week.exercises.cardio += exercise.time * routine.rounds;
                break;
              case 'strength':
                statsData.week.exercises.strength += exercise.time * routine.rounds;
                break;
              case 'endurance':
                statsData.week.exercises.endurance += exercise.time * routine.rounds;
                break;
              case 'agility':
                statsData.week.exercises.agility += exercise.time * routine.rounds;
                break;
              case 'power':
                statsData.week.exercises.power += exercise.time * routine.rounds;
                break;
              case 'stretching':
                statsData.week.exercises.stretching += exercise.time * routine.rounds;
                break;
              default:
            }
          }
        }
      }
      res.send(statsData);

    } catch (e) {
      res.status(400).send({error: 'User not exists'});
    }
  }));
};
