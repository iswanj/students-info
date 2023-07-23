import { Request, Response } from "express";

import db from "../../db";
import { handleError } from "../../utils";
import { ERROR_CODES } from "../../constants";

export async function getExamResults(req: Request, res: Response) {
  try {
    const { year, subjectId } = req.query;

    let whereCondition = {};

    if (year && !isNaN(parseInt(year as string, 10))) {
      whereCondition = { ...whereCondition, year: parseInt(year as string, 10) };
    }

    if (subjectId && !isNaN(parseInt(subjectId as string, 10))) {
      whereCondition = { ...whereCondition, subjectId: parseInt(subjectId as string, 10) };
    }

    const examResults = await db.exam.findMany({
      where: whereCondition,
      include: {
        subject: true,
        Result: {
          include: {
            // @ts-ignore
            student: true,
            GradeRange: true,
          },
        },
      },
    });

    return res.status(200).send({ error: false, data: examResults });
  } catch (error) {
    return handleError(res, { code: ERROR_CODES.common, message: "Data Fetching error" });
  }
}
