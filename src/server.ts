import express from 'express';
import { getRepository } from 'typeorm';

import './database/connection';

import Orphanage from './models/Orphanages';

const app = express();

app.use(express.json());

app.post('/orphanages', async (request, response) => {
  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    open_on_weekends,
    opening_hours
  } = request.body;

  const orphanagesRepository = getRepository(Orphanage);

  const orphanage = await orphanagesRepository.create({
    name,
    latitude,
    longitude,
    about,
    instructions,
    open_on_weekends,
    opening_hours
  });

  await orphanagesRepository.save(orphanage);
  
  return response.json(orphanage);
})

app.listen(3333);