import { Request, Response } from 'express';
import db from '../../database/connection';
import hourToMinute from '../../utils/convertHourToMinutes';

class ClassesController {
  async index(req: Request, res: Response) {
    const filters = req.query;

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    try {
      if (!week_day || !subject || !time) {
        return res.status(400).json({
          error: 'Missing filters to search classes',
        });
      }

      const timeInMinutes = hourToMinute(time);

      const classes = await db('classes')
        .whereExists(function () {
          this.select('*')
            .from('class_schedule')
            .whereRaw('class_schedule.class_id = classes.id')
            .whereRaw('class_schedule.week_day = ??', [Number(week_day)])
            .whereRaw('class_schedule.from <= ??', [timeInMinutes])
            .whereRaw('class_schedule.to > ??', [timeInMinutes]);
        })
        .where('subject', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(
          'users.id',
          'users.avatar',
          'users.name',
          'classes.subject',
          'users.bio',
          'classes.cost',
          'users.whatsapp',
        );

      return res.json({ classes });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async create(req: Request, res: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

    interface ScheduleItem {
      week_day: number;
      from: string;
      to: string;
    }

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx('users')
        .insert({
          name,
          avatar,
          whatsapp,
          bio,
        })
        .returning('id');

      const user_id = insertedUsersIds[0];

      const insertedClassesIds = await trx('classes')
        .insert({
          subject,
          cost,
          user_id,
        })
        .returning('id');

      const class_id = insertedClassesIds[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: hourToMinute(scheduleItem.from),
          to: hourToMinute(scheduleItem.to),
          class_id,
        };
      });

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      res.status(201).send();
    } catch (err) {
      trx.rollback();
      res.status(400).json({ error: err.message });
    }
  }
}

export default new ClassesController();
